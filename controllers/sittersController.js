const SittersService = require('../services/sittersService');

class SittersController {
  sittersService = new SittersService();

  signupSitter = async (req, res) => {
    try {
        const { login_id, nickname, password, confirmPassword, career, category } = req.body
        const { code, message } = await this.sittersService.signup( login_id, nickname, password, confirmPassword, career, category );        
        return res.status(code).json({message});
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send('회원가입에 실패했습니다.');
    }
    
  };
}

module.exports = SittersController;
