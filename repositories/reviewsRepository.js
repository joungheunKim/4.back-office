const { Reviews } = require('../models');

class ReviewsRepository {
  get = async (sitter_id) => {
    return await Reviews.findById({
      where: { sitter_id },
      attributes: [
        'review_id',
        'sitter_id',
        'nickname',
        'content',
        'rate',
        'createdAt',
      ],
    });
  };

  post = async (nickname, user_id, sitter_id, content, rate, review_id) => {
    return await Reviews.create({
      Nickname: nickname,
      User_id: user_id,
      Sitter_id: sitter_id,
      content,
      rate,
      review_id,
    });
  };

  put = async (content, rate, review_id) => {
    return await Reviews.updateOne({ content, rate }, { where: review_id });
  };

  delete = async (review_id) => {
    return await Reviews.destroy({
      where: review_id,
    });
  };
}

module.exports = ReviewsRepository;
