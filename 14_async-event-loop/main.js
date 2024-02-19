import { lazyLoad } from './js_modules/helpers.js';

const appContainer = document.getElementById('app');

const searchParams = new URLSearchParams(window.location.search);

const episodeID = searchParams.get('id');

if (episodeID) {
  lazyLoad(
    './components.js',
    `films/${episodeID}`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    'createDetailPage',appContainer
  );
} else {
  lazyLoad(
    './components.js',
    'films',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    'createMainPage',appContainer
  );
}




