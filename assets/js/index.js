// 모달
const signupPopup = document.querySelector('.signup-modal');
const loninPopup = document.querySelector('.login-modal');
const signupBtn = document.querySelector('.signup-btn');
const loginBtn = document.querySelector('.login-btn');
const signupQuitBtn = document.querySelector('.signup-quit-btn');
const loginQuitBtn = document.querySelector('.login-quit-btn');
const body = document.body;

signupModal = () => {
  signupBtn.addEventListener('click', () => {
    signupPopup.style.display = 'block';
    body.style.overflow = 'hidden';
  });

  signupQuitBtn.addEventListener('click', () => {
    signupPopup.style.display = 'none';
    body.style.overflow = 'auto';
  });
};
signupModal();

loginModal = () => {
  loginBtn.addEventListener('click', () => {
    loninPopup.style.display = 'block';
    body.style.overflow = 'hidden';
  });

  loginQuitBtn.addEventListener('click', () => {
    loninPopup.style.display = 'none';
    body.style.overflow = 'auto';
  });
};
loginModal();
