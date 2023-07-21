// 시터 리뷰 작성, 조회, 수정, 삭제

//리뷰 작성
const createbtn = document.querySelector('#create-btn');
if (createbtn !== null) {
  createbtn.addEventListener('click', async () => {
    const reviewrate = document.querySelector('#rate').value;
    const reviewcontent = document.querySelector('#content').value;

    const formData = new FormData();
    formData.append('rate', reviewrate);
    formData.append('content', reviewcontent);

    try {
      const response = await fetch(`/reviews/${sitter_id}`, {
        method: 'POST',
        body: formData,
        //작성자의 유저아이디와 url의 시터아이디를 body에 넣어주고 싶은데 어떻게?
      });
      await response.json();
      alert('리뷰를 작성했습니다.');
      window.location.href = '/';
    } catch (error) {
      alert('리뷰 작성에 실패했습니다.');
    }
  });
}

//리뷰 조회
async function getreviews() {
  fetchData(`/reviews/${sitter_id}`, { method: 'GET' }).then((response) => {
    const { data } = response;
    const reviews = document.querySelector('.card-list');
    reviews.innerHTML = '';
  });
  const reviews = document.querySelector('.card-list');
  reviews.innerHTML = '';

  data.forEach((content) => {
    const contenthtml = `
    <div class="card-item">
    <a href="reviews/${content.sitter_id}">
      <div class="text-wrap">
        <p>시터: ${content.sitter_nickname}</p>
        <p>글쓴이: ${content.user_nickname}</p>
        <p>${content.content}</p>
      </div>
    </a>
  </div>
    `;
    reviews.innerHTML += contenthtml;
  });
}

//리뷰 수정
document.querySelector('#edit-btn').addEventListener('click', async () => {
  const rate = document.querySelector('#edit-rate').value;
  const content = document.querySelector('#edit-content').value;

  const formData = new FormData();
  formData.append('rate', rate);
  formData.append('content', content);

  try {
    const response = await fetch(
      `/reviews/${content.sitter_id}/${content.review_id}`,
      {
        method: 'PUT',
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert('리뷰를 수정했습니다');
      window.location.href = `/reviews/${content.sitter_id}/${content.review_id}`;
    } else {
      const { errorMessage } = data;
      alert(errorMessage);
    }
  } catch (error) {
    alert('리뷰 수정에 실패했습니다.');
  }
});

//리뷰 삭제
document.querySelector('#delete-btn').addEventListener('click', async () => {
  try {
    const response = await fetch(
      `/reviews/${content.sitter_id}/${content.review_id}`,
      { method: 'DELETE' }
    );

    const data = await response.json();

    if (response.ok) {
      alert('리뷰를 삭제했습니다');
      window.location.href = '/';
    } else {
      const { errorMessage } = data;
      alert(errorMessage);
    }
  } catch (error) {
    alert('리뷰 삭제에 실패했습니다.');
  }
});
