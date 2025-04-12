document.addEventListener('DOMContentLoaded', function () {
  const PER_PAGE = 8;
  let movies = [];
  let currentPage = 1;
  let selectedGenres = [];

  const movieGrid = document.getElementById('movieGrid');
  const pagination = document.getElementById('pagination');
  const genreForm = document.getElementById('genreForm');

  // 더미 데이터를 fetch형태로 받아오는 함수.
  async function fetchMovies() {
    // 실제 API 요청 대신 더미 데이터 생성합니다. 실제 연동시 지워주세요.
    const dummyMovies = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `영화 더미데이터${i + 1}`,
      overview: `내용 더미${i + 1} - 더미데이터 ${i + 1}번째`,
      release_date: `2024-04-${(i % 30 + 1).toString().padStart(2, '0')}`,
      vote_average: i % 11,
      genres: ['액션', '드라마', 'SF', '로맨스', '애니메이션'][i % 5] + ',' +
              ['판타지', '스릴러', '코미디', '가족', '뮤지컬'][i % 5],
    }));

    return dummyMovies;
  }

  // 장르 필터 체크박스 렌더링
  function renderGenreCheckboxes(allGenres) {
    genreForm.innerHTML = '';
    allGenres.forEach(genre => {
      const id = `genre-${genre.replace(/\s+/g, '-')}`;
      genreForm.innerHTML += `
        <label>
          <input type="checkbox" value="${genre}" id="${id}">
          ${genre}
        </label>
      `;
    });

    genreForm.querySelectorAll('input[type="checkbox"]').forEach(input => {  // 게시글 이동까지로 js로 처리합니다.
      input.addEventListener('change', () => {
        selectedGenres = Array.from(genreForm.querySelectorAll('input:checked')).map(cb => cb.value);
        currentPage = 1;
        renderMovies();
      });
    });
  }

  // 필터된 영화 반환
  function getFilteredMovies() {
    if (selectedGenres.length === 0) return movies;
    return movies.filter(m => selectedGenres.some(g => m.genres.includes(g)));
  }

  // 영화 렌더링
  function renderMovies() {
    const filtered = getFilteredMovies();
    const start = (currentPage - 1) * PER_PAGE;
    const current = filtered.slice(start, start + PER_PAGE);

    movieGrid.innerHTML = '';
    current.forEach(movie => {
      const card = document.createElement('div');
      card.className = 'post-card';
      card.innerHTML = `
        <div class="post-info">
          <h3>${movie.title}</h3>
          <p>${movie.overview}</p>
          <div class="post-meta">
            <span>개봉일: ${movie.release_date}</span>
            <span>평점: ${movie.vote_average}</span>
          </div>
          <div class="movie-genres">장르: ${movie.genres}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        window.location.href = `/movies/${movie.id}/`;
      });

      movieGrid.appendChild(card);
    });

    renderPagination(filtered);
  }

  // 페이지네이션 렌더링
  function renderPagination(data) {
    pagination.innerHTML = '';
    const totalPages = Math.ceil(data.length / PER_PAGE);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.className = i === currentPage ? 'current' : '';
      btn.addEventListener('click', () => {
        currentPage = i;
        renderMovies();
      });
      pagination.appendChild(btn);
    }
  }

  // 초기 실행
  fetchMovies().then(data => {
    movies = data;
    const allGenres = Array.from(new Set(
      movies.flatMap(m => m.genres.split(',').map(g => g.trim()))
    ));
    renderGenreCheckboxes(allGenres);
    renderMovies();
  });
});

  
