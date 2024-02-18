import { SWApi } from './js_modules/serverApi.js';

let cssPromises = {};
// can be load dynamically CSS or JS or API
const loadResource = async (src) => {

  //CSS
  if (!cssPromises[src]) {
    if (src.endsWith('.css')) {

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.integrity = 'sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN';
      link.crossOrigin = 'anonymous';
      link.href = src;
      document.head.append(link);

      const promise = new Promise((resolve) => {
        link.addEventListener('load', () => {
          resolve();
        });
      });

      cssPromises[src] = promise;

      return cssPromises[src];
    }
  }

  //JS
  if (src.endsWith('.js')) {
    return import(src);
  }

  //Api
  return SWApi(src);
};

const appContainer = document.getElementById('app');

const searchParams = new URLSearchParams(window.location.search);

const episodeID = searchParams.get('id');

if (episodeID) {
  Promise.all([
    './js_modules/components.js',
    `films/${episodeID}`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
  ]
    .map(src => loadResource(src)))
    .then(([moduleJS, moduleApi, moduleCSS]) => {
        appContainer.innerHTML = '';
        appContainer.append(moduleJS.createDetailPage(moduleApi,episodeID)
        );
      }
    );
} else {
  Promise.all([
    './js_modules/components.js',
    'films',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
  ]
    .map(src => loadResource(src)))
    .then(([moduleJS, moduleApi, moduleCSS]) => {
        appContainer.innerHTML = '';
        appContainer.append(moduleJS.createMainPage(moduleApi)
        );
      }
    );
}



