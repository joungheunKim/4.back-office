const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { Users } = require('../models');
const authMiddleware = require('../middlewares/auth');
require('dotenv').config();
const env = process.env;

// 회원가입
router.post('/signup', async (req, res) => {
  try {
    const { login_id, nickname, password, confirm, pet_name } = req.body;

    const login_idRegex = /^[a-zA-Z0-9]{6,}$/;
    if (!login_idRegex.test(login_id)) {
      return res
        .status(412)
        .json({ errorMessage: 'ID의 형식이 일치하지 않습니다.' });
    }

    const nicknameRegex = /^[a-zA-Z0-9]{3,}$/;
    if (!nicknameRegex.test(nickname)) {
      return res
        .status(412)
        .json({ errorMessage: '닉네임의 형식이 일치하지 않습니다.' });
    }

    const passwordRegex = /^[a-zA-Z0-9]{4,}$/;
    if (!passwordRegex.test(password)) {
      return res
        .status(412)
        .json({ errorMessage: '패스워드의 형식이 일치하지 않습니다.' });
    }

    if (password !== confirm) {
      return res
        .status(412)
        .json({ errorMessage: '패스워드가 일치하지 않습니다.' });
    }

    if (password.includes(login_id)) {
      return res
        .status(412)
        .json({ errorMessage: '패스워드에 ID가 포함되어 있습니다.' });
    }

    if (password.includes(nickname)) {
      return res
        .status(412)
        .json({ errorMessage: '패스워드에 닉네임이 포함되어 있습니다.' });
    }

    const user = await Users.findOne({
      where: { [Op.or]: [{ login_id }, { nickname }] },
    });

    if (!user) {
      await Users.create({ login_id, nickname, password, pet_name });

      return res.status(201).json({ message: '회원 가입에 성공하였습니다.' });
    }

    if (user.login_id === login_id) {
      return res.status(412).json({ errorMessage: '중복된 ID입니다.' });
    } else if (user.nickname === nickname) {
      return res.status(412).json({ errorMessage: '중복된 닉네임입니다.' });
    }
  } catch (error) {
    res.status(400).json({ errorMessage: '회원 가입에 실패했습니다.' });
    console.error(error);
  }
});

// 로그인
router.post('/login', async (req, res) => {
  try {
    const { login_id, password } = req.body;

    const user = await Users.findOne({ where: { login_id } });

    if (!user || user.password !== password) {
      return res
        .status(412)
        .json({ errorMessage: '닉네임 또는 패스워드를 확인해주세요.' });
    }

    const token = jwt.sign({ user_id: user.user_id }, env.JWT_SECRET_KET, {
      expiresIn: '2h',
    });

    res.cookie('Authorization', `Bearer ${token}`);

    res.status(200).json({ message: '로그인에 성공했습니다.' });
  } catch (error) {
    res.status(400).json({ errorMessage: '로그인에 실패했습니다.' });
    console.error(error);
  }
});

// 로그 아웃
router.delete('/logout', (req, res) => {
  const { Authorization } = req.cookies;
  try {
    if (!Authorization) {
      return res
        .status(401)
        .json({ errorMessage: '로그인 되어있지 않습니다.' });
    }
    res.clearCookie('Authorization');
    res.status(200).json({ message: '로그아웃 되었습니다.' });
  } catch (error) {
    res.status(400).json({ errorMessage: '잘못된 요청입니다.' });
    console.error(error);
  }
});

// 회원 탈퇴
router.delete('/signout', authMiddleware, async (req, res) => {
  const { Authorization } = req.cookies;
  const { password } = req.body;
  const { user_id } = res.locals.user;

  try {
    if (!Authorization) {
      return res
        .status(401)
        .json({ errorMessage: '로그인 되어있지 않습니다.' });
    }

    const user = await Users.findByPk(user_id);

    if (user.password !== password) {
      return res
        .status(401)
        .json({ errorMessage: '비밀번호가 일치하지 않습니다.' });
    }

    user.destroy({ where: { user_id } });
    res.status(200).json({ message: '회원탈퇴가 완료되었습니다.' });
  } catch (error) {
    res.status(400).json({ errorMessage: '잘못된 요청입니다.' });
    console.error(error);
  }
});

module.exports = router;
