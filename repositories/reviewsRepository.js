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

  post = async (review_id, user_id, sitter_id, nickname, comment, rate) => {
    return await Reviews.create({
      review_id,
      user_id,
      sitter_id,
      nickname,
      comment,
      rate,
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
