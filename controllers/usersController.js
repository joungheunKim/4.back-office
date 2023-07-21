const UsersService = require('../services/usersService');

class UsersController {
  usersService = new UsersService();

  signupUser = async (req, res) => {
    try {
      const { login_id, nickname, password, confirm, pet_name } = req.body;
      console.log('req.body', req.body);
      const { code, message } = await this.usersService.signup(
        login_id,
        nickname,
        password,
        confirm,
        pet_name
      );
      return res.status(code).json(message);
    } catch (error) {
      if (error.code)
        return res.status(error.code).json({ errorMessage: error.message });
      console.error(error);
      res.status(500).send('회원가입에 실패했습니다.');
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
      if (error.code)
        return res.status(error.code).json({ message: error.message });
      console.error(error);
      res.status(500).send('로그인에 실패했습니다.');
    }
  };

  doLogout = (req, res) => {
    try {
      const { Authorization } = req.cookies;
      const { code, message } = this.usersService.logout(Authorization);
      res.clearCookie('Authorization');
      return res.status(code).json(message);
    } catch (error) {
      if (error.code)
        return res.status(error.code).json({ message: error.message });
      console.error(error);
      res.status(500).send('잘못된 요청입니다.');
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
      if (error.code)
        return res.status(error.code).json({ message: error.message });
      console.error(error);
      res.status(500).send('잘못된 요청입니다.');
    }
  };
}

module.exports = UsersController;
