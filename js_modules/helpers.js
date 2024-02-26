import {SWApi} from './serverApi.js';


const spinner = document.querySelector('.spinner')
// const app = document.getElementById('app')
let cssPromises = {};

// app.length < 1
//   ? spinner.style.display = 'block'
//   : spinner.style.display = 'none'

// can be load dynamically CSS or JS or API
const loadResource = async (src) => {
  //CSS
  if (src.endsWith('.css')) {
    if (cssPromises[src]) return;
    if (!cssPromises[src]) {

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
}


const lazyLoad = (js, api, css, renderFncName, box) => {
  spinner.style.display = 'block'

  Promise.all([js, api, css]
    .map(src => loadResource(src)))
    .then(async ([moduleJS, moduleApi]) => {
        box.innerHTML = '';
        box.append(await moduleJS[renderFncName](moduleApi)
        );
      }
    ).finally(() => {
      spinner.style.display = 'none'
    }
  )
}

const lazyLoadById = () => {
  const appContainer = document.getElementById('app');

  const searchParams = new URLSearchParams(window.location.search);

  const episodeID = searchParams.get('id');


  lazyLoad(
    './components.js',
    `films/${episodeID ? episodeID : ''}`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    episodeID ? 'createDetailPage' : 'createMainPage',
    appContainer
  );
};

const getHomeURL = () => {

  const homeHref = new URL(window.location.href);

  return homeHref.origin + homeHref.pathname;
};

export {loadResource, lazyLoad, getHomeURL, lazyLoadById};
