const PostsService = require('../services/postsService');

class PostsController {
  constructor() {
    this.postsService = new PostsService();
  }

  createPost = async (req, res) => {
    try {
      const { user_id } = res.locals.user;
      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).json({
          errorMessage: '모집글의 정보가 입력되지 않았습니다.',
        });
      }

      await this.postsService.createPost(user_id, title, content);

      return res.status(201).json({ message: '모집글을 생성하였습니다.' });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ errorMessage: '모집글 작성에 실패하였습니다.' });
    }
  };

  getPosts = async (req, res) => {
    try {
      const posts = await this.postsService.getPosts();

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
  };

  getPostById = async (req, res) => {
    try {
      const { post_id } = req.params;
      const post = await this.postsService.getPostById(post_id);

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
  };

  updatePost = async (req, res) => {
    const { post_id } = req.params;
    const { user_id } = res.locals.user;
    const { title, content } = req.body;

    try {
      await this.postsService.updatePost(post_id, user_id, title, content);

      return res.status(200).json({ message: '수정이 완료되었습니다.' });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ errorMessage: '모집글 수정에 실패했습니다.' });
    }
  };

  deletePost = async (req, res) => {
    const { post_id } = req.params;
    const { user_id } = res.locals.user;

    try {
      await this.postsService.deletePost(post_id, user_id);

      return res.status(200).json({ message: '모집글이 삭제되었습니다.' });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ errorMessage: '모집글 삭제에 실패했습니다.' });
    }
  };
}

module.exports = PostsController;
