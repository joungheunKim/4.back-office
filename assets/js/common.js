// 공통 사항

// 모달
const modal = document.querySelector('.modal');
const loginPopup = document.querySelector('.login-btn');
const quitBtn = document.querySelector('.quit-btn');
const body = document.body;

loginPopup.addEventListener('click', () => {
  modal.style.display = 'block';
  body.style.overflow = 'hidden';
});

quitBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  body.style.overflow = 'auto';
});
