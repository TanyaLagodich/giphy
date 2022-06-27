document.addEventListener('DOMContentLoaded', () => {

  const API_KEY = 'hklAv9L2KE8cxy1IuDjWtD05bheryIJs';
  const PROTOCOL = 'https://'
  const ROUTE = 'api.giphy.com/';
  const VERSION = 'v1/';
  const GIFS = 'gifs/';

  // Endpoints
  const TRENDING = 'trending';
  const SEACRH = 'search';

  // PAGINATION
  const LIMIT = 25;
  let offset = 0;

  // Actual Route
  let lastRoute = '';


  const searchBtn = document.querySelector('#search-btn');
  const searchInput = document.querySelector('#search-input');
  const showMoreBtn = document.querySelector('#show-more-btn');

  searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      searchGifs();
    }
  })

  searchBtn.addEventListener('click', searchGifs);
  showMoreBtn.addEventListener('click', showMore);


  getTrendingGifs();

  function getTrendingGifs() {
    const trendingRoute = new URL(`${PROTOCOL}${ROUTE}${VERSION}${GIFS}${TRENDING}?api_key=${API_KEY}&limit=${LIMIT}&offset=${offset}`);
    lastRoute = trendingRoute;
    loadData(trendingRoute);
  }

  function appendHTML(gifs) {
    let html = '';

    if (!gifs.length) {
      html = '<p>Ooops.. Nothing found</p>';
    } else {
      gifs.forEach((gif) => {
        html += `
          <div class="giffs-wrap__img">
            <img src="${gif.images.original.url}" alt="${gif.title}">
          </div>`;
      })
    }
    const gifsWrapper = document.querySelector('.giffs-wrap');
    gifsWrapper.innerHTML = html;
  }

  function searchGifs() {
    const searchValue = searchInput.value;
    if (!searchValue) {
      return;
    }

    const seacrhRoute = new URL(`${PROTOCOL}${ROUTE}${VERSION}${GIFS}${SEACRH}?api_key=${API_KEY}&q=${searchValue}&limit=${LIMIT}&offset=${offset}`);
    lastRoute = seacrhRoute;
    loadData(seacrhRoute);
  }

  function showMore() {
    const newOffset = +lastRoute.searchParams.get('offset') + LIMIT;
    lastRoute.searchParams.set('offset', newOffset);
    loadData(lastRoute);
  }

  function loadData(route) {
    fetch(route)
      .then(response => response.json())
      .then(response => {
        const gifs = response.data; // gifs[]
        appendHTML(gifs);
      })
      .catch(err => console.error(err));
  }

})