const jwt = require('jsonwebtoken');
require('dotenv').config();
const env = process.env;

const UsersRepository = require('../repositories/usersRepository');

class UsersService {
  usersRepository = new UsersRepository();

  // 유저 회원 가입
  signup = async (login_id, nickname, password, confirm, pet_name) => {
    const login_idRegex = /^[a-zA-Z0-9]{6,}$/;
    if (!login_idRegex.test(login_id))
      throw { code: 412, message: 'ID 형식이 일치하지 않습니다.' };

    const nicknameRegex = /^[a-zA-Z0-9]{3,}$/;
    if (!nicknameRegex.test(nickname))
      throw { code: 412, message: '닉네임의 형식이 일치하지 않습니다.' };

    const passwordRegex = /^[a-zA-Z0-9]{4,}$/;
    if (!passwordRegex.test(password))
      throw { code: 412, message: '패스워드의 형식이 일치하지 않습니다.' };

    if (password !== confirm)
      throw { code: 412, message: '패스워드가 일치하지 않습니다.' };

    if (password.includes(login_id))
      throw { code: 412, message: '패스워드에 ID가 포함되어 있습니다.' };

    if (password.includes(nickname))
      throw { code: 412, message: '패스워드에 닉네임이 포함되어 있습니다.' };

    const findUserByOrOption = await this.usersRepository.findUserByOrOption(
      login_id,
      nickname
    );

    if (!findUserByOrOption) {
      await this.usersRepository.createUser(
        login_id,
        nickname,
        password,
        pet_name
      );

      return { code: 201, message: '회원 가입에 성공하였습니다.' };
    }

    if (findUserByOrOption.login_id === login_id) {
      throw { code: 409, message: '중복된 ID입니다.' };
    } else if (findUserByOrOption.nickname === nickname) {
      throw { code: 409, message: '중복된 닉네임입니다.' };
    }
  };

  // 로그인
  login = async (login_id, password) => {
    const user = await this.usersRepository.findUserByLogin_id(login_id);

    if (!user || user.password !== password)
      throw { code: 412, message: '닉네임 또는 패스워드를 확인해주세요.' };

    const token = jwt.sign({ user_id: user.user_id }, env.DB_SECRETKEY, {
      expiresIn: '2h',
    });

    return { code: 200, message: '로그인에 성공하였습니다.', token };
  };

  // 로그아웃
  logout = (Authorization) => {
    if (!Authorization)
      throw { code: 401, message: '로그인 되어있지 않습니다.' };

    return { code: 200, message: '로그아웃 되었습니다.' };
  };

  // 회원 탈퇴
  signout = async (Authorization, password, user_id) => {
    if (!Authorization)
      throw { code: 401, message: '로그인 되어있지 않습니다.' };

    const user = await this.usersRepository.findUserByPk(user_id);

    if (user.password !== password)
      throw { code: 401, message: '비밀번호가 일치하지 않습니다.' };

    await this.usersRepository.deleteUser(user_id);

    return { code: 200, message: '회원 탈퇴에 성공하였습니다.' };
  };
}

module.exports = UsersService;
