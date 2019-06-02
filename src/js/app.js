import '../scss/main.scss';
import Sidebar from './modules/sidebar';

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
    const sidebar = new Sidebar();
  });
