function insert() {
  const nickname = document.querySelector('#pokemon-nick').value;
  const pokemonLevel = document.querySelector('#pokemon-level').value;
  const pokemonSelect = document.querySelector('#pokemon-select');
  const speciesId = pokemonSelect.value;
  const trainerSelect = document.querySelector('#trainer-select');
  const trainerId = trainerSelect.value;

  if (!nickname || !pokemonLevel || !speciesId || !trainerId) {
    alert('입력하지 않은 정보가 있습니다. 다시 확인해 주세요.');
    return;
  }

  const vo = {
    nickname,
    pokemonLevel,
    speciesId,
    trainerId,
  };

  console.log(vo);

  const url = 'http://127.0.0.1:8080/api/pokemon';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vo),
  };

  fetch(url, option)
    .then((resp) => resp.json())
    .then(() => {
      alert('등록 성공!');
      location.reload();
    });
}

function loadPokemonList() {
  fetch('http://127.0.0.1:8080/api/pokemon')
    .then((resp) => resp.json())
    .then((list) => {
      const tbody = document.querySelector('#pokemon-list');
      if (!list || list.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5">게시글이 없습니다.</td></tr>`;
        return;
      }

      tbody.innerHTML = list
        .map(
          (vo) => `
          <tr onclick="viewPokemonDetail(${vo.pokemonId})">
            <td>${vo.pokemonId}</td>
            <td>${vo.nickname}</td>
            <td>${vo.pokemonLevel}</td>
            <td>${vo.speciesId}</td>
            <td>${vo.name}</td>
            <td>${vo.type}</td>
            <td>${vo.trainerId}</td>
            <td>${vo.trainerName}</td>
            <td>${vo.caughtAt || ''}</td>
            <td>${vo.modifiedAt || ''}</td>
          </tr>
        `
        )
        .join('');
    });
}

window.onload = loadPokemonList;

function viewPokemonDetail(pokemonId) {
  fetch(`http://127.0.0.1:8080/api/pokemon/detail/${pokemonId}`)
    .then((resp) => resp.json())
    .then((vo) => {
      const detail = document.querySelector('#pokemon-detail');
      detail.innerHTML = `
      <h3>상세 보기</h3>
      <div><b>포켓몬 ID : </b> ${vo.pokemonId}</div>
      <div><b>닉네임 : </b> ${vo.nickname}</div>
      <div><b>LV : </b> ${vo.pokemonLevel}</div>
      <div><b>개체번호 : </b> ${vo.speciesId}</div>
      <div><b>개체명 : </b> ${vo.name}</div>
      <div><b>타입 : </b> ${vo.type}</div>
      <div><b>트레이너 ID : </b> ${vo.trainerId}</div>
      <div><b>트레이너명 : </b> ${vo.trainerName}</div>
      <div><b>등록일 : </b> ${vo.caughtAt || ''}</div>
      <div><b>수정일 : </b> ${vo.modifiedAt || ''}</div>

      <div id="pokemon-detail-btns">
        <button type="button" class="btn btn-outline-warning" onclick="openUpdateModal(${
          vo.pokemonId
        })">수정</button>
        <button type="button" class="btn btn-outline-danger" onclick="deletePokemon(${
          vo.pokemonId
        })">삭제</button>
      </div>
            `;
    });
}

function openUpdateModal(pokemonId) {
  // GET 요청으로 상세정보 받아오기
  fetch(`http://127.0.0.1:8080/api/pokemon/detail/${pokemonId}`)
    .then((resp) => resp.json())
    .then((vo) => {
      document.querySelector('#update-pokemon-id').value = vo.pokemonId;
      document.querySelector('#update-nick').value = vo.nickname;
      document.querySelector('#update-level').value = vo.pokemonLevel;
      document.querySelector('#update-species').value = vo.speciesId;
      document.querySelector('#update-trainer').value = vo.trainerId;
      // 부트스트랩 모달 오픈
      const modal = new bootstrap.Modal(document.querySelector('#updateModal'));
      modal.show();
    });
}

document.querySelector('#update-form').onsubmit = function (e) {
  e.preventDefault();

  const pokemonId = document.querySelector('#update-pokemon-id').value;
  const nickname = document.querySelector('#update-nick').value;
  const pokemonLevel = document.querySelector('#update-level').value;
  const speciesId = document.querySelector('#update-species').value;
  const trainerId = document.querySelector('#update-trainer').value;

  if (!nickname || !pokemonLevel || !speciesId || !trainerId) {
    alert('모든 값을 입력하세요.');
    return;
  }

  const vo = { nickname, pokemonLevel, speciesId, trainerId };

  fetch(`http://127.0.0.1:8080/api/pokemon/${pokemonId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vo),
  })
    .then((resp) => resp.json())
    .then((result) => {
      alert('수정 완료!');
      bootstrap.Modal.getInstance(
        document.querySelector('#updateModal')
      ).hide();
      loadPokemonList();
    });
};

function deletePokemon() {
  const no = prompt('삭제할 등록 번호를 입력하세요');

  const url = `http://127.0.0.1:8080/api/pokemon/${no}`;
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
