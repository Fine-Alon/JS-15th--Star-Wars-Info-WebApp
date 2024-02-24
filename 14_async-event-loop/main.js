import { lazyLoadById } from './js_modules/helpers.js';

window.addEventListener('popstate',()=>{
  lazyLoadById();
  // history.pushState(null, '', url);
})

lazyLoadById();
