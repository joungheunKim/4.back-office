const UsersService = require('../services/usersService');

class UsersController {
  usersService = new UsersService();

  signupUser = async (req, res) => {
    try {
      const { login_id, nickname, password, confirm, pet_name } = req.body;
      const { code, message } = await this.usersService.signup(
        login_id,
        nickname,
        password,
        confirm,
        pet_name
      );
      return res.status(code).json(message);
    } catch (error) {
      console.error(error);
      if (error.code)
        return res.status(error.code).json({ message: error.message });
      res.status(500).send({ message: '회원 가입에 실패했습니다.' });
    }
  };

  doLogin = async (req, res) => {
    try {
      const { login_id, password } = req.body;
      const { code, message, token } = await this.usersService.login(
        login_id,
        password
      );
      res.cookie('Authorization', `Bearer ${token}`, { httpOnly: true });
      return res.status(code).json(message);
    } catch (error) {
      console.error(error);
      if (error.code)
        return res.status(error.code).json({ message: error.message });
      res.status(500).send({ message: '로그인에 실패했습니다.' });
    }
  };

  doLogout = (req, res) => {
    try {
      const { Authorization } = req.cookies;
      const { code, message } = this.usersService.logout(Authorization);
      res.clearCookie('Authorization');
      return res.status(code).json(message);
    } catch (error) {
      console.error(error);
      if (error.code)
        return res.status(error.code).json({ message: error.message });
      res.status(500).send({ message: '잘못된 요청입니다.' });
    }
  };

  doSignout = async (req, res) => {
    try {
      const { Authorization } = req.cookies;
      const { password } = req.body;
      const { user_id } = res.locals.user;
      const { code, message } = await this.usersService.signout(
        Authorization,
        password,
        user_id
      );
      return res.status(code).json(message);
    } catch (error) {
      console.error(error);
      if (error.code)
        return res.status(error.code).json({ message: error.message });
      res.status(500).send({ message: '잘못된 요청입니다.' });
    }
  };
}

module.exports = UsersController;
