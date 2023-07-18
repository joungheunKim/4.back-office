const express = require('express');
const { Users, Posts } = require('../models');
const { Op } = require('sequelize');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

// 모집글 등록
router.post('/posts', authMiddleware, async (req, res) => {
  try {
    const { user_id } = res.locals.user;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        errorMessage: '모집글의 정보가 입력되지 않았습니다.',
      });
    }

    const post = await Posts.create({
      User_id: user_id,
      title,
      content,
    });

    return res.status(201).json({ message: '모집글을 생성하였습니다.' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ errorMessage: '모집글 작성에 실패하였습니다.' });
  }
});

// 모집글 전체 조회
router.get('/posts', async (req, res) => {
  try {
    const posts = await Posts.findAll({
      attributes: ['post_id', 'User_id', 'title', 'content', 'createdAt'],
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Users,
          attributes: ['user_id', 'nickname'],
        },
      ],
    });

    if (!posts.length) {
      return res
        .status(404)
        .json({ errorMessage: '작성된 모집글이 없습니다.' });
    }

    return res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ errorMessage: '모집글 조회에 실패했습니다.' });
  }
});

// 모집글 상세 조회
router.get('/posts/:post_id', async (req, res) => {
  try {
    const { post_id } = req.params;
    const post = await Posts.findOne({
      attributes: ['post_id', 'User_id', 'title', 'content', 'createdAt'],
      where: { post_id },
      include: [
        {
          model: Users,
          attributes: ['user_id', 'nickname'],
        },
      ],
    });
    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: '해당 모집글을 찾을 수 없습니다.' });
    }

    return res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ errorMessage: '모집글 조회에 실패했습니다.' });
  }
});

// 모집글 수정
router.put('/posts/:post_id', authMiddleware, async (req, res) => {
  const { post_id } = req.params;
  const { user_id } = res.locals.user;
  const { title, content } = req.body;

  try {
    // 모집글을 조회합니다.
    const post = await Posts.findOne({
      where: {
        post_id,
        User_id: user_id,
      },
    });

    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: '해당 모집글을 찾을 수 없습니다.' });
    }

    // title이나 content 형식이 비정상적인 경우
    if (!title || !content) {
      return res.status(400).json({
        errorMessage: '모집글 제목이나 내용이 빈 내용인지 확인해 주세요.',
      });
    }

    // 모집글을 수정합니다.
    await Posts.update(
      { title, content },
      {
        where: {
          post_id,
          User_id: user_id,
        },
      }
    );

    return res.status(200).json({ message: '수정이 완료되었습니다.' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ errorMessage: '모집글 수정에 실패했습니다.' });
  }
});

// 모집글 삭제
router.delete('/posts/:post_id', authMiddleware, async (req, res) => {
  const { post_id } = req.params;
  const { user_id } = res.locals.user;

  try {
    // 모집글을 조회합니다.
    const post = await Posts.findOne({
      where: {
        post_id,
        User_id: user_id,
      },
    });

    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: '해당 모집글을 찾을 수 없습니다.' });
    }

    // 모집글을 삭제합니다.
    await Posts.destroy({
      where: {
        post_id,
        User_id: user_id,
      },
    });

    return res.status(200).json({ message: '모집글이 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ errorMessage: '모집글 삭제에 실패했습니다.' });
  }
});

module.exports = router;
