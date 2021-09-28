const elSearchForm = document.querySelector('.js-news-search-form');
const elInput = document.querySelector('.search-input');
const elNewsList = document.querySelector('.news-list');

elSearchForm.addEventListener('submit', onNewsSearchSubmit)

function onNewsSearchSubmit(evt) {

  if (elInput.value == '') {
    alert('Biror narsani qidiruvga yozing!')
    return
  }
  elNewsList.innerHTML = '';
  evt.preventDefault();

  const apiKey = 'bfc1f9b2dc384d1081e6f5a137b7288f'
  let topic = elInput.value;

  let url = `https://newsapi.org/v2/everything?q=${topic}&from=2021-09-27&to=2021-09-27&sortBy=popularity&apiKey=${apiKey}&language=ru`;

  fetch(url).then((res) => {
    return res.json()
  }).then((data) => {
    data.articles.forEach(article => {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.setAttribute('href', article.url);
      a.setAttribute('target', '_blank');
      a.textContent = article.title;
      li.appendChild(a);
      elNewsList.appendChild(li);
    })
  }).catch((error) => {
    console.log(error)
  })

}
