import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import '../scss/main.scss';
import config from './config';
import isMobile from './modules/browserCheck';
import Sidebar from './modules/sidebar';
import fadeIn from './modules/transitions/fadeIn';
import fadeOut from './modules/transitions/fadeOut';
import fadeOutMobileFn from './modules/transitions/fadeOutMobile';
import desktopMenuAnimationFn from './modules/animation/desktopMenuAnimation';

class App {
  static start() {
    return new App();
  }

  constructor() {
    Promise.all([
      App.domReady(),
      App.initSiteAssets(),
    ])
      .then(App.init.bind(this))
      .catch(err => console.error(err));
  }

  static showPage() {
    document.documentElement.classList.add('ready');
  }

  static domReady() {
    return new Promise((resolve) => {
      document.addEventListener('DOMContentLoaded', resolve);
    });
  }

  static initSiteAssets() {
    return new Promise((resolve, reject) => {
      // Importing the images into the project
      const images = require.context('../assets/images/', true, /\.jpg|.svg|.jpeg$/);
      images.keys().map(images);

      if (images) {
        resolve();
      } else {
        reject(console.error('rejected!'));
      }
    });
  }

  static initSidebarLogic() {
    return new Sidebar(config);
  }

  static initPageTransitions() {
    // Check browser
    const mobile = isMobile();

    // Adding a class to the wrapper that's animating
    barba.hooks.before(() => {
      barba.wrapper.classList.add('is-animating');
    });

    // Removing class once it's complete
    barba.hooks.after(() => {
      barba.wrapper.classList.remove('is-animating');
    });

    // Initializing barba object
    barba.init({
      transitions: [{
        name: 'fade',
        sync: false,

        beforeLeave: () => (!mobile ? desktopMenuAnimationFn() : ''),
        leave: ({ current }) => (!mobile
          ? fadeOut(current.container)
          : fadeOutMobileFn()),
        enter: ({ next }) => fadeIn(next.container),
      }],
    });
  }

  static init() {
    App.showPage();
    App.initSidebarLogic();
    App.initPageTransitions();
  }
}

App.start();
