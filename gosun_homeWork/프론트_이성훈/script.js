// 네비게이션 Home은 새로고침, 나머진 alert + active 처리
const navLinks = document.querySelectorAll('nav#nav-menu a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    if (link.id === 'home-link') {
      e.preventDefault();
      location.reload();
    } else {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      alert(`"${link.textContent}" 메뉴가 선택되었습니다.`);
    }
  });
});

let isLoggedIn = false;
let loggedUser = "";

// 로컬스토리지에서 유저목록 가져오기
function getUserDB() {
  return JSON.parse(localStorage.getItem("cinemate-users") || "{}");
}

// 저장
function setUserDB(users) {
  localStorage.setItem("cinemate-users", JSON.stringify(users));
}

// 로그인/회원가입 팝업 HTML (모드: 'login'|'register')
function getAuthPopupHtml(mode) {
  return `
    <html>
      <head>
        <title>${mode === "login" ? "로그인" : "회원가입"} | CINEMATE</title>
        <style>
          body { font-family: Arial; background:#232323; color:#fff; margin:0; }
          .container { padding:38px 26px; text-align:center; }
          h2 { margin-top:0; color:#b52020; }
          input { display:block; margin:18px auto; padding:12px 9px; font-size:17px; width:80%; border-radius:6px; border:1.3px solid #bbb; }
          button { background:#b52020; color:#fff; padding:12px 35px; border-radius:6px; border:none; font-weight:bold; font-size:18px; cursor:pointer; }
          button:hover { background:#a01717; }
          .alt { margin-top:18px; color:#aaa; font-size:15px; }
          .alt a { color:#fff; text-decoration:underline; cursor:pointer; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>${mode === "login" ? "SIGN IN" : "SIGN UP"}</h2>
          <input type="text" id="user-id" placeholder="아이디">
          <input type="password" id="user-pw" placeholder="비밀번호">
          ${mode === "register" ? `<input type="password" id="user-pw2" placeholder="비밀번호 확인">` : ""}
          <button id="auth-btn">${mode === "login" ? "SIGN IN" : "SIGN UP"}</button>
          <div class="alt">
            ${mode === "login"
              ? `아직 회원이 아니라면? <a id="goto-register">회원가입</a>`
              : `이미 계정이 있다면? <a id="goto-login">로그인</a>`}
          </div>
        </div>
        <script>
          function sendResult(type, data) {
            window.opener.postMessage({type, ...data}, "*");
            window.close();
          }
          document.getElementById('auth-btn').onclick = function() {
            const id = document.getElementById('user-id').value.trim();
            const pw = document.getElementById('user-pw').value.trim();
            ${
              mode === "register"
                ? `const pw2 = document.getElementById('user-pw2').value.trim();`
                : ""
            }
            if(!id || !pw ${mode === "register" ? "|| !pw2" : ""}) {
              alert('모든 정보를 입력하세요.');
              return;
            }
            if(id.length < 3) {
              alert('아이디는 3자 이상이어야 합니다.');
              return;
            }
            ${
              mode === "register"
                ? `
            if(pw.length < 3) {
              alert('비밀번호는 3자 이상이어야 합니다.');
              return;
            }
            if(pw !== pw2) {
              alert('비밀번호가 일치하지 않습니다.');
              return;
            }
            `
                : ""
            }
            // parent에 메시지: {type: "login"/"register", user, pw}
            sendResult("${mode}", {user: id, pw: pw ${mode === "register" ? "" : ""}});
          };
          document.getElementById('${mode === "login" ? "goto-register" : "goto-login"}').onclick = function() {
            window.opener.postMessage({type: "goto-${mode === "login" ? "register" : "login"}"}, "*");
            window.close();
          }
        <\/script>
      </body>
    </html>
  `;
}

// 로그인 버튼 클릭: 팝업
document.getElementById('login-btn').addEventListener('click', function(e) {
  e.preventDefault();
  if (!isLoggedIn) {
    // 로그인 창 오픈 (login)
    openAuthPopup("login");
  } else {
    // 로그아웃 처리
    isLoggedIn = false;
    loggedUser = "";
    document.getElementById('login-btn').textContent = "SIGN IN";
    alert("로그아웃 되었습니다.");
  }
});

let popupWin = null;
function openAuthPopup(mode) {
  popupWin = window.open("", "authpopup", "width=380,height=400,scrollbars=no");
  popupWin.document.write(getAuthPopupHtml(mode));
  popupWin.document.close();
}

// 팝업창에서 로그인/회원가입 성공 시 메인으로 메시지 전달
window.addEventListener("message", function(e) {
  if (!e.data || !e.data.type) return;

  // 로그인 시도
  if (e.data.type === "login") {
    const users = getUserDB();
    if (e.data.user in users && users[e.data.user] === e.data.pw) {
      isLoggedIn = true;
      loggedUser = e.data.user;
      document.getElementById('login-btn').textContent = "LOGOUT";
      alert(`${e.data.user}님 환영합니다!`);
    } else {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.');
      setTimeout(() => openAuthPopup("login"), 350); // 다시 로그인창 오픈
    }
  }
  // 회원가입 시도
  else if (e.data.type === "register") {
    let users = getUserDB();
    if (e.data.user in users) {
      alert('이미 존재하는 아이디입니다.');
      setTimeout(() => openAuthPopup("register"), 350);
      return;
    }
    users[e.data.user] = e.data.pw;
    setUserDB(users);
    alert('회원가입 성공! 이제 로그인하세요.');
    setTimeout(() => openAuthPopup("login"), 350);
  }
  // 회원가입/로그인 전환
  else if (e.data.type === "goto-register") {
    setTimeout(() => openAuthPopup("register"), 100);
  } else if (e.data.type === "goto-login") {
    setTimeout(() => openAuthPopup("login"), 100);
  }
});

// 검색 버튼 alert
document.getElementById('search-btn').addEventListener('click', () => {
  const query = document.getElementById('search-input').value.trim();
  const genre = document.getElementById('genre-select').value;
  alert(`검색어: ${query || '없음'}, 장르: ${genre || '전체'}`);
});

// GoSoon's Pick 상세 모달
document.querySelectorAll('.gosoon-card').forEach(card => {
  card.addEventListener('click', function() {
    const title = card.querySelector('.title').textContent;
    const year = card.querySelector('.year').textContent;
    const info = card.querySelector('.info').textContent;
    const link = card.querySelector('.more').getAttribute('href');
    const img = card.querySelector('img').src;

    // 모달 내용 동적 생성
    const modalBody = document.getElementById('gosoon-modal-body');
    modalBody.innerHTML = `
      <img src="${img}" alt="${title}">
      <h1>${title} <span style="font-size:16px;">${year}</span></h1>
      <p>${info}</p>
      <a href="${link}" target="_blank">more</a>
    `;
    // 모달 show
    document.getElementById('gosoon-modal').style.display = 'flex';
  });
});

// 모달 닫기
document.getElementById('gosoon-modal-close').onclick = function() {
  document.getElementById('gosoon-modal').style.display = 'none';
};
// 배경 클릭 시도 닫기
document.querySelector('#gosoon-modal .modal-bg').onclick = function() {
  document.getElementById('gosoon-modal').style.display = 'none';
};
