import { imgArrSW, starWarsURL } from './serverApi.js';

const createEpisodeCard = (obj, pic) => {

  const card = document.createElement('div');
  const img = document.createElement('img');
  const cardBody = document.createElement('div');
  const cardTitle = document.createElement('h5');
  const link = document.createElement('a');

  card.classList.add('card', 'mb-5');
  card.style.width = '26%';

  img.classList.add('card-img-top');
  img.style.maxWidth = '100%';

  img.src = pic;
  img.alt = `Star Wars: ${obj.title}`;

  cardBody.classList.add('card-body');

  cardTitle.classList.add('card-title');
  cardTitle.textContent = `film ${obj.episode_id}: ${obj.title}`;

  link.classList.add('btn', 'btn-dark');
  link.href = `${starWarsURL}films/${obj.episode_id}`;
  link.textContent = `More info about episode ${obj.episode_id}`;

  cardBody.append(cardTitle, link);
  card.append(img, cardBody);

  return card;
};

const createMainPage = (arr) => {

  const page = document.createElement('div');
  const wrapper = document.createElement('div');
  const title = document.createElement('h1');

  page.classList.add('d-flex', 'flex-wrap', 'justify-content-around');
  title.textContent = 'Welcome to Star Wars World';
  wrapper.style.width = '100%';
  title.classList.add('fs-1', 'fst-italic', 'p-5');

  wrapper.append(title);
  page.append(wrapper);
  for (let episode = 0; episode < arr.length; episode++) {

    const card = createEpisodeCard(arr[episode], imgArrSW[episode]);
    page.append(card);
  }

  return page;
};

const createDetailPage = (obj,pic) => {

  const card = document.createElement('div');
  const img = document.createElement('img');
  const cardBody = document.createElement('div');
  const cardTitle = document.createElement('h1');
  const link = document.createElement('button');
  const p = document.createElement('p');

  card.classList.add('card', 'mb-5');
  card.style.width = '26%';

  img.classList.add('card-img-top');
  img.style.maxWidth = '100%';

  img.src = pic
  img.alt = `Star Wars: ${obj.title}`;

  cardBody.classList.add('card-body');

  cardTitle.classList.add('card-title');
  cardTitle.textContent = `film ${obj.episode_id}: ${obj.title}`;

  p.classList.add('card-text');
  p.textContent = obj.opening_crawl;

  link.classList.add('btn', 'btn-dark');
  link.href = `${starWarsURL}films/${obj.episode_id}`;
  link.textContent = `Back to episodes`;

  cardBody.append(cardTitle, link);
  card.append(img, cardBody);

  return card;
};

export { createMainPage, createEpisodeCard, createDetailPage };
