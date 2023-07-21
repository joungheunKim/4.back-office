const SittersRepository = require('../repositories/sittersRepository');

class SittersService {
  sittersRepository = new SittersRepository();

  signup = async (
    login_id,
    nickname,
    password,
    confirmPassword,
    career,
    category
  ) => {
    const findOne = await this.sittersRepository.findOne([
      { login_id: login_id },
    ]);
    // // 유효성 검사
    // const nicknameRegExr = /[a-zA-z0-9].{3,15}$/;
    // // ? 있을수도 없을 수도있다, * 여러개 가능
    // const passwordRegExr =
    //   /^(?=.*[a-zA-z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,30}$/;

      if (findOne) throw { code: 412, message:" 중복된 ID입니다." }
      
      // if (nicknameRegExr.test(login_id)) throw { code:412, message:"ID는 특수문자가 포함되지 않은 4~15자리여야합니다." }

      // if  (!passwordRegExr.test(password)) throw {
      //     code: 412,
      //     message:
      //       '비밀번호는 영문자로 시작하여 영문자+숫자+특수문자 6~30자리여야합니다'
      //   };

        if (password !== confirmPassword)
      throw { code: 412, message: '비밀번호가 일치하지 않습니다.' };

      await this.sittersRepository.create(login_id,
        nickname,
        password,
        career,
        category);
        return { code: 210, message: '회원가입 성공' };

  };
}

module.exports = SittersService;
