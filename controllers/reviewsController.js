const ReviewsService = require('../services/reviewsService');

class ReviewsController {
  reviewsService = new ReviewsService();

  delete = async (req, res) => {
    try {
      const { user_id } = res.locals.user;
      const { sitter_id, review_id } = req.params;
      const { code, message } = await this.reviewsService.delete(
        user_id,
        sitter_id,
        review_id
      );
      return res.status(code).json(message);
    } catch {
      res
        .status(400)
        .send({ errormessage: '요청한 데이터 형식이 올바르지 않습니다.' });
    }
  };

  get = async (req, res) => {
    try {
      const { sitter_id } = req.params;
      const { code, message } = await this.reviewsService.get(sitter_id);
      return res.status(code).json(message);
    } catch {
      res
        .status(400)
        .send({ errormessage: '요청한 데이터 형식이 올바르지 않습니다.' });
    }
  };

  post = async (req, res) => {
    try {
      const { user_id } = res.locals.user;
      const { sitter_id } = res.params;
      const { content, rate } = req.body;
      const { code, message } = await this.reviewsService.post(
        user_id,
        sitter_id,
        rate,
        content
      );
      return res.status(code).json(message);
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .send({ errormessage: '요청한 데이터 형식이 올바르지 않습니다.' });
    }
  };

  put = async (req, res) => {
    try {
      const { user_id } = res.locals.user;
      const { sitter_id, review_id } = req.params;
      const { content, rate } = req.body;
      const { code, message } = await this.reviewsService.put(
        user_id,
        sitter_id,
        review_id,
        content,
        rate
      );
      return res.status(code).json(message);
    } catch {
      res
        .status(400)
        .send({ errormessage: '요청한 데이터 형식이 올바르지 않습니다.' });
    }
  };
}
module.exports = ReviewsController;
