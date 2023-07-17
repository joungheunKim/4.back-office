const express = require('express');
const router = express.Router();
// const authMiddleware = require("../middlewares/auth-middleware");
const { Reviews } = require('../models');
const { Op } = require('sequelize');

//리뷰 보여주기
router.route('/reviews/:sitter_id').get(async (req, res) => {
  try {
    const { sitter_id } = req.params;
    await Reviews.findById({
      where: { sitter_id },
      attributes: [
        'review_id',
        'sitter_id',
        'nickname',
        'content',
        'createdAt',
      ],
      order: [['createdAt', 'DESC']],
    });
    if (!sitter_id) {
      return res
        .status(411)
        .send({ errormessage: '조건에 맞는 시터가 없습니다.' });
    } else {
      res.status(201).json({ message: '리뷰 검색에 성공했습니다.' });
    }
  } catch {
    res
      .status(400)
      .send({ errormessage: '요청한 데이터 형식이 올바르지 않습니다.' });
  }
});

//리뷰 등록
router.route('/reviews/:sitter_id').post(async (req, res) => {
  try {
    const { user_id } = res.locals.user;
    const { sitter_id } = res.params;
    const { content } = req.body;
    if (!sitter_id) {
      return res
        .status(411)
        .send({ errormessage: '조건에 맞는 시터가 없습니다.' });
    } else {
      await Reviews.create({
        Nickname: nickname,
        User_id: user_id,
        Sitter_id: sitter_id,
        content,
        review_id,
      });
      return res.status(201).json({ message: '리뷰를 생성했습니다.' });
    }
  } catch {
    return res
      .status(400)
      .json({ message: '요청한 데이터 형식이 올바르지 않습니다.' });
  }
});

//리뷰 수정
router.route('reviews/:sitter_id/:review_id').put(async (req, res) => {
  try {
    const { user_id } = res.locals.user;
    const { sitter_id, review_id } = req.params;
    const { content } = req.body;
    const Review = await Reviews.findById({
      where: { review_id },
    });

    if (Review.User_id !== user_id) {
      return res.status(404).json({
        message: '작성자가 일치하지 않습니다.',
      });
    }
    if (!review_id) {
      return res
        .status(411)
        .json({ errormessage: '조건에 맞는 리뷰가 없습니다.' });
    }
    await Reviews.updateOne(
      { content },
      { where: { [Op.and]: [{ sitter_id }, { review_id }] } }
    );
    return res.status(201).json({ message: '리뷰를 수정했습니다.' });
  } catch {
    res.status(400).json({ errormessage: '데이터 형식이 올바르지 않습니다.' });
  }
});

//리뷰 삭제
router.route('reviews/:sitter_id/:review_id').delete(async (req, res) => {
  try {
    const { user_id } = res.locals.user;
    const { sitter_id, review_id } = req.params;
    const { content } = req.body;
    const Review = await Reviews.findById({
      where: { review_id },
    });

    if (Review.User_id !== user_id) {
      return res.status(404).json({
        message: '작성자가 일치하지 않습니다.',
      });
    }
    if (!review_id) {
      return res
        .status(411)
        .json({ errormessage: '조건에 맞는 리뷰가 없습니다.' });
    }
    await Reviews.destroy(
      { content },
      { where: { [Op.and]: [{ sitter_id }, { review_id }] } }
    );
    return res.status(201).json({ message: '리뷰를 삭제했습니다.' });
  } catch {
    res.status(400).json({ errormessage: '데이터 형식이 올바르지 않습니다.' });
  }
});

module.exports = router;
