import { SWApi } from './serverApi.js';

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

const lazyLoad = (js, api, css, renderFncName, box) => {

  Promise.all([js, api, css]
    .map(src => loadResource(src)))
    .then(async ([moduleJS, moduleApi]) => {
        // moduleApi._backToHomePage = homeHref;
        box.innerHTML = '';
        box.append(await moduleJS[renderFncName](moduleApi)
        );
      }
    );
};

const getHomeURL = () => {

  const homeHref = new URL(window.location.href);

  return homeHref.origin + homeHref.pathname;
};

export { loadResource, lazyLoad, getHomeURL };
