import { imgArrSW, SWApi } from './serverApi.js';
import { getHomeURL, lazyLoadById } from './helpers.js';

const createEpisodeCard = (obj) => {

  const card = document.createElement('div');
  const img = document.createElement('img');
  const cardBody = document.createElement('div');
  const cardTitle = document.createElement('h5');
  const link = document.createElement('a');

  card.classList.add('card', 'mb-5');
  card.style.width = '26%';

  img.classList.add('card-img-top');
  img.style.maxWidth = '100%';

  img.src = imgArrSW[obj.episode_id - 1];
  img.alt = `Star Wars: ${obj.title}`;

  cardBody.classList.add('card-body');

  cardTitle.classList.add('card-title');
  cardTitle.textContent = `film ${obj.episode_id}: ${obj.title}`;

  link.classList.add('btn', 'btn-dark');
  link.href = `?id=${obj.url[obj.url.length - 2]}`;
  link.textContent = `More info about episode ${obj.episode_id}`;

  link.addEventListener('click', (e) => {
    e.preventDefault();

    let url = e.target.getAttribute('href');

    console.log(url);

    history.pushState(null, '', url);

    lazyLoadById();
  });

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

  for (const episode of arr) {
    const card = createEpisodeCard(episode);
    page.append(card);
  }

  return page;
};

const createDetailPage = async (obj) => {
  const сontainer = document.createElement('div');
  const card = document.createElement('div');
  const description = document.createElement('div');
  const img = document.createElement('img');
  const cardBody = document.createElement('div');
  const cardTitle = document.createElement('h1');
  const link = document.createElement('a');
  const p = document.createElement('p');

  сontainer.classList.add('container', 'd-flex', 'justify-content-around');
  description.classList.add('d-flex', 'flex-column', 'flex-wrap', 'justify-content-around');
  description.style.maxHeight = '100vh';

  card.classList.add('card');
  card.style.maxWidth = '50%';

  img.classList.add('card-img-top');
  img.style.maxWidth = '100%';
  img.style.maxHeight = '70%';
  img.src = imgArrSW[obj.episode_id - 1];
  img.alt = `Star Wars: ${obj.title}`;

  cardBody.classList.add('card-body');
  cardBody.style.maxHeight = '30%';

  cardTitle.classList.add('card-title');
  cardTitle.textContent = `film ${obj.episode_id}: ${obj.title}`;

  p.classList.add('card-text');
  p.textContent = obj.opening_crawl;

  link.addEventListener('click', (e) => {
    e.preventDefault();

    let url = e.target.getAttribute('href');

    console.log(url);

    history.pushState(null, '', url);

    lazyLoadById();
  });

  link.classList.add('btn', 'btn-dark');
  link.href = getHomeURL();
  link.textContent = `Back to episodes`;

  description.append(
    await createDescrList(obj, 'planets'),
    await createDescrList(obj, 'species'),
    await createDescrList(obj, 'characters'),
    await createDescrList(obj, 'starships'),
    await createDescrList(obj, 'vehicles')
  );
  cardBody.append(cardTitle, p, link);
  card.append(img, cardBody);
  сontainer.append(card, description);

  return сontainer;
};

const createDescrList = async (obj, type) => {
  let descrArr = [];

  const box = document.createElement('div');
  const list = document.createElement('ul');
  const header = document.createElement('h2');
  /*
  const rotation_period = document.createElement('p');
  const orbital_period = document.createElement('p');
  const diameter = document.createElement('p');
  const climate = document.createElement('p');
  const gravity = document.createElement('p');
  const terrain = document.createElement('p');
  const surface_water = document.createElement('p');
  const population = document.createElement('p'); */
  box.style.padding = '15px';
  header.textContent = type.toUpperCase();

  for (const el of obj[type]) {
    descrArr.push(await SWApi(el));
  }

  descrArr.forEach(item => {
    const name = document.createElement('li');
    name.textContent = item.name;
    list.append(name);
  });

  box.append(header, list);

  return box;
};

export { createMainPage, createEpisodeCard, createDetailPage, createDescrList };
