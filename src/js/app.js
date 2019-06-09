import '../scss/main.scss';
import PageTransitions from './modules/pageTransitions';
import Sidebar from './modules/sidebar';
import config from './config';

const images = require.context('../assets/images/', true, /\.jpg|.svg$/);
images.keys().map(images);

const initApp = new Promise((resolve, reject) => {
  const checkBrowserLoadingState = () => {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      resolve();
    } else {
      requestAnimationFrame(checkBrowserLoadingState);
    }
  };

  requestAnimationFrame(checkBrowserLoadingState);
});

initApp
  .then(() => {
    const sidebar = new Sidebar(config);
  });
