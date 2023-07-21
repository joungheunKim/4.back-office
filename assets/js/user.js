// 유저 회원가입, 로그인, 로그아웃, 회원탈퇴

// 회원가입
const btnSignup = document.querySelector('#btn-signup');
if (btnSignup !== null) {
  btnSignup.addEventListener('click', async () => {
    const login_id = document.querySelector('#input-signup-id').value;
    const nickname = document.querySelector('#input-signup-nickname').value;
    const password = document.querySelector('#input-signup-password').value;
    const confirm = document.querySelector('#input-signup-confirm').value;
    const pet_name = document.querySelector('#input-signup-petname').value;

    const formData = new URLSearchParams();
    formData.append('login_id', login_id);
    formData.append('nickname', nickname);
    formData.append('password', password);
    formData.append('confirm', confirm);
    formData.append('pet_name', pet_name);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      const data = await response.json();

      if (response.ok) {
        alert('회원 가입에 성공하였습니다.');
        window.location.href = '/';
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('회원 가입에 실패하였습니다.');
      console.error(error);
    }
  });
}

// 로그인
const btnLogin = document.querySelector('#btn-login');
if (btnLogin !== null) {
  btnLogin.addEventListener('click', async () => {
    const login_id = document.querySelector('#input-login-id').value;
    const password = document.querySelector('#input-login-password').value;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login_id: login_id,
          password: password,
        }),
      });

      const token = await response.json();
      if (response.ok) {
        console.log(token.user_id);
        alert('로그인에 성공하였습니다.');
        window.location.href = '/';
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('로그인에 실패했습니다.');
      console.error('2', error);
    }
  });
}

// 로그인 확인 텍스트
if (document.cookie.includes('Authorization')) {
  const loginId = document.cookie;
  console.log(loginId);
  const btnBox = document.querySelector('#btn-box');
  const loginIdText = document.createElement('p');
  loginIdText.innerHTML = loginId;
  btnBox.appendChild(loginIdText);
}
