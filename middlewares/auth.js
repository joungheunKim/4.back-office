const jwt = require('jsonwebtoken');
const { Users, Sitters } = require('../models');
require('dotenv').config();
const env = process.env;

module.exports = async (req, res, next) => {
  try {
    const { Authorization } = req.cookies;

    if (!Authorization) {
      return res
        .status(403)
        .json({ errorMessage: '로그인이 필요한 기능입니다.' });
    }

    const [tokenType, token] = Authorization.split(' ');
    if (tokenType !== 'Bearer') {
      return res
        .status(401)
        .json({ message: '토큰 타입이 일치하지 않습니다.' });
    }

    const decodedToken = jwt.verify(token, env.JWT_SECRET_KET);
    const user_id = decodedToken.user_id;
    const user = await Users.findOne({ where: { user_id } });
    // const sitter = await Sitters.findOne({ where: { sitter_id } });

    if (!user) {
      res.clearCookie('Authorization');
      return res
        .status(401)
        .json({ message: '토큰 사용자가 존재하지 않습니다.' });
    }
    res.locals.user = user;

    next();
  } catch (error) {
    res.clearCookie('Authorization');
    console.error(error);
    return res.status(401).json({
      message: '비정상적인 요청입니다.',
    });
  }
};
