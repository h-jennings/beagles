import barba from '@barba/core';
import '../scss/main.scss';
import config from './config';
import isMobile from './modules/browserCheck';
import Sidebar from './modules/sidebar';
import fadeIn from './modules/transitions/fadeIn';
import fadeOut from './modules/transitions/fadeOut';
import closeMenuAnimation from './modules/animation/closeMenuAnimation';
import closeMobileMenuAnimation from './modules/animation/closeMobileMenuAnimation';

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

    barba.hooks.before(() => {
      barba.wrapper.classList.add('is-animating');
    });

    barba.hooks.after(() => {
      barba.wrapper.classList.remove('is-animating');
    });

    barba.init({
      transitions: [{
        name: 'fade',
        sync: false,

        /* These animations are activating properly
        but I need to alter the mobile menu animation
        in order for it to work properly with the page
        transition animations */

        beforeLeave() {
          if (!mobile) {
            closeMenuAnimation();
          } else {
            closeMobileMenuAnimation();
          }
        },
        leave: ({ current }) => fadeOut(current.container),
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
