function insertBoard() {
  const title = document.querySelector('#board-title').value;
  const content = document.querySelector('#board-content').value;
  const vo = {
    title,
    content,
  };

  const url = 'http://127.0.0.1:8080/api/board';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vo),
  };

  fetch(url, option)
    .then((resp) => resp.json())
    .then((result) => {
      alert('등록 완료!');
      location.reload();
    });
}

function updateBoard() {
  const no = prompt('수정할 게시글 번호를 입력하세요');
  const title = document.querySelector('#board-title').value;
  const content = document.querySelector('#board-content').value;
  const vo = { title, content };

  const url = `http://127.0.0.1:8080/api/board/${no}`;
  const option = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vo),
  };

  fetch(url, option)
    .then((resp) => resp.json())
    .then((updatedVo) => {
      alert('수정 완료!');
      location.reload();
    });
}

function deleteBoard() {
  const no = prompt('삭제할 게시글 번호를 입력하세요');

  const url = `http://127.0.0.1:8080/api/board/${no}`;
  const option = {
    method: 'DELETE',
  };

  fetch(url, option).then((resp) => {
    if (resp.ok) {
      alert('삭제 완료!');
      location.reload();
    } else {
      alert('삭제 실패!');
    }
  });
}

function loadBoardList() {
  fetch('http://127.0.0.1:8080/api/board')
    .then((resp) => resp.json())
    .then((list) => {
      const tbody = document.getElementById('board-list');
      if (!list || list.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5">게시글이 없습니다.</td></tr>`;
        return;
      }

      tbody.innerHTML = list
        .map(
          (vo) => `
          <tr onclick="viewBoardDetail(${vo.no})">
            <td>${vo.no}</td>
            <td>${vo.title}</td>
            <td>${vo.content}</td>
            <td>${vo.createdAt || ''}</td>
          </tr>
        `
        )
        .join('');
    });
}

window.onload = loadBoardList;

function viewBoardDetail(no) {
  fetch(`http://127.0.0.1:8080/api/board/detail/${no}`)
    .then((resp) => resp.json())
    .then((vo) => {
      const detail = document.getElementById('board-detail');
      detail.innerHTML = `
      <h3>상세 보기</h3>
      <div><b>No:</b> ${vo.no}</div>
      <div><b>제목:</b> ${vo.title}</div>
      <div><b>내용:</b> ${vo.content}</div>
      <div><b>작성일:</b> ${vo.createdAt || ''}</div>
            `;
    });
}
