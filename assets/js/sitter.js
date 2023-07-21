// 시터 회원가입, 리스트, 예약 페이지
document
  .getElementById('signupSubmit')
  .addEventListener('click', async function () {
    const login_id = document.getElementById('login_id').value;
    const nickname = document.getElementById('nickname').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const career = document.getElementById('career').value;
    const category = document.getElementById('category').value;

    try {
      const response = await fetch('/api/signup/sitter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login_id,
          nickname,
          password,
          confirmPassword,
          career,
          category,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // 회원가입성공
        alert(data.message); // 알림 창 띄우기
        window.location.href = '/'; // 메인페이지로 이동

        location.reload(); // 페이지 새로고침
        // 회원가입 후 필요한 동작 수행
      } else {
        // 회원가입 실패
        alert(data.message);
        // 실패 처리 로직 수행
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
