const NEWS_API_KEY = 'bfc1f9b2dc384d1081e6f5a137b7288f';
const TOP_HEADLINES_URL = `https://newsapi.org/v2/top-headlines?country=ru&apiKey=${NEWS_API_KEY}`;
const NEWS_SEARCH_URL = `https://newsapi.org/v2/everything?apiKey=${NEWS_API_KEY}`;


const elSearchForm = document.querySelector('.js-search-form');
const elSearchInput = document.querySelector('.js-search-input');

const elNewsList = document.querySelector('.news-list');
const elNewsItemTemplate = document.querySelector('#news-item-template').content;

function showNews (articles) {
  elNewsList.innerHTML = '';

  const elNewsListFragment = document.createDocumentFragment();
  articles.forEach(article => {
    const elNewsItem = elNewsItemTemplate.cloneNode(true);
    elNewsItem.querySelector('a').href = article.url;
    elNewsItem.querySelector('.news-img').src = article.urlToImage;
    elNewsItem.querySelector('h3').textContent = article.title;
    elNewsItem.querySelector('p').textContent = article.source.name;
    // elNewsItem.querySelector('.news-author').textContent = article.author;

    elNewsListFragment.appendChild(elNewsItem);
  });

  elNewsList.appendChild(elNewsListFragment);
}

function getNewsJSON (url, callbackFn) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data.status === 'ok') {
      callbackFn(data.articles);
    }
  });
}

function onSearchFormSubmit (evt) {
  evt.preventDefault();

  const urlForSearch = `${NEWS_SEARCH_URL}&q=${elSearchInput.value.trim()}`;

  getNewsJSON(urlForSearch, showNews);
}

if (elSearchForm) {
  elSearchForm.addEventListener('submit', onSearchFormSubmit);
}

getNewsJSON(TOP_HEADLINES_URL, showNews);