// 유저 회원가입, 로그인, 로그아웃, 회원탈퇴

// 회원가입
const btnSignup = document.querySelector('#btn-signup');
if (btnSignup !== null) {
  btnSignup.addEventListener('click', async () => {
    const user_id = document.querySelector('#input-signup-id').value;
    const nickname = document.querySelector('#input-signup-nickname').value;
    const password = document.querySelector('#input-signup-password').value;
    const confirm = document.querySelector('#input-signup-confirm').value;
    const pet_name = document.querySelector('#input-signup-petname').value;
    const formData = new FormData();

    formData.append('user_id', user_id);
    formData.append('nickname', nickname);
    formData.append('password', password);
    formData.append('confirm', confirm);
    formData.append('petname', pet_name);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('data', data);

      if (response.ok) {
        alert('회원 가입에 성공하였습니다.');
        window.location.href = '/';
      } else {
        const { errorMessage } = data;
        alert(errorMessage);
        throw new Error(response.statusText);
      }
    } catch (error) {
      alert('회원 가입에 실패하였습니다.');
    }
  });
}
