const { Posts } = require('../models');

class PostsRepository {
  createPost = async (userId, title, content) => {
    await Posts.create({
      User_id: userId,
      title,
      content,
    });
  };

  getPosts = async () => {
    return await Posts.findAll({
      attributes: ['post_id', 'User_id', 'title', 'content', 'createdAt'],
      order: [['createdAt', 'DESC']],
    });
  };

  getPostById = async (postId) => {
    return await Posts.findOne({
      attributes: ['post_id', 'User_id', 'title', 'content', 'createdAt'],
      where: { post_id: postId },
    });
  };

  updatePost = async (postId, userId, title, content) => {
    await Posts.update(
      { title, content },
      {
        where: {
          post_id: postId,
          User_id: userId,
        },
      }
    );
  };

  deletePost = async (postId, userId) => {
    await Posts.destroy({
      where: {
        post_id: postId,
        User_id: userId,
      },
    });
  };
}

module.exports = PostsRepository;
