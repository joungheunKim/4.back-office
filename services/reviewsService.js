require('dotenv').config();
const env = process.env;

const ReviewsRepository = require('../repositories/reviewsRepository');

class ReviewsService {
  reviewsRepository = new ReviewsRepository();

  get = async (sitter_id) => {
    const sitter = await this.reviewsRepository.findById([
      { sitter_id: sitter_id },
    ]);

    if (!sitter) throw { code: 411, message: '조건에 맞는 시터가 없습니다.' };

    await this.reviewsRepository.findById({
      where: { sitter_id },
      attributes: [
        'review_id',
        'sitter_id',
        'user_nickname',
        'sitter_nickname',
        'content',
        'rate',
        'createdAt',
      ],
      order: [['createdAt', 'DESC']],
    });
    return { code: 201, message: '리뷰 검색에 성공하였습니다.' };
  };

  post = async (
    user_nickname,
    sitter_nickname,
    user_id,
    sitter_id,
    content,
    rate,
    review_id
  ) => {
    const sitter = await this.reviewsRepository.findById([
      { sitter_id: sitter_id },
    ]);

    if (!sitter) throw { code: 411, message: '조건에 맞는 시터가 없습니다.' };

    const rateRegex = /^[1-5]$/g;
    if (!rateRegex.test(rate))
      throw {
        code: 412,
        errorMessage: '평점은 1점에서 5점까지 부여할 수 있습니다.',
      };

    await this.reviewsRepository.create({
      User_nickname: user_nickname,
      Sitter_nickname: sitter_nickname,
      User_id: user_id,
      Sitter_id: sitter_id,
      content,
      rate,
      review_id,
    });
    return { code: 201, message: '리뷰를 생성하였습니다.' };
  };

  put = async (user_id, content, rate, review_id) => {
    const review = await this.reviewsRepository.findById([
      { review_id: review_id },
    ]);

    const user = await this.reviewsRepository.findById([{ user_id: user_id }]);

    if (!user) throw { code: 404, errorMessage: '작성자가 일치하지 않습니다.' };

    if (!review)
      throw { code: 411, errorMessage: '조건에 맞는 리뷰가 없습니다.' };

    await this.reviewsRepository.updateOne({ content, rate });
    return { code: 201, message: '리뷰를 수정하였습니다.' };
  };

  delete = async (user_id, review_id) => {
    const review = await this.reviewsRepository.findById([
      { review_id: review_id },
    ]);

    const user = await this.reviewsRepository.findById([{ user_id: user_id }]);

    if (!user) throw { code: 404, errorMessage: '작성자가 일치하지 않습니다.' };

    if (!review)
      throw { code: 411, errorMessage: '조건에 맞는 리뷰가 없습니다.' };

    await this.reviewsRepository.destroy();
    return { code: 201, message: '리뷰를 삭제하였습니다.' };
  };
}

module.exports = ReviewsService;
