import barba from '@barba/core';
import ScrollOut from 'scroll-out';
import '../scss/main.scss';
import config from './config';
import isMobile from './modules/browserCheck';
import getMobileVhFn from './modules/getMobileVh';
// import loadingAnimationFn from './modules/animation/loadingAnimation';
import Sidebar from './modules/sidebar';
import fadeIn from './modules/transitions/fadeIn';
import fadeOut from './modules/transitions/fadeOut';
import fadeOutMobileFn from './modules/transitions/fadeOutMobile';
import desktopMenuAnimationFn from './modules/animation/desktopMenuAnimation';
import beaglesNameAnimationFn from './modules/animation/beaglesNameAnimation';

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

  /*   static loadingAnimation() {
    return new Promise((resolve) => {
      loadingAnimationFn()
        .then(resolve());
    });
  } */


  static getVhValue() {
    getMobileVhFn();
  }

  static initSiteAssets() {
    return new Promise((resolve) => {
      // Importing the images into the project
      const images = require.context('../assets/images/', true, /\.jpg|.svg|.jpeg|.png$/);
      images.keys().map(images);

      if (images) {
        resolve();
      }
    });
  }

  static initSidebarLogic() {
    return new Sidebar(config);
  }

  static initScrollLogic() {
    // init scroll out object
    const initScrollOut = ScrollOut({
      cssProps: {
        scrollPercentY: true,
      },
      once: true,
      threshold: 0.5,
    });

    /* Calling function that handles the scroll
      animation of the 'Beagles' text in the sidebar */
    beaglesNameAnimationFn(config);

    return initScrollOut;
  }

  static initPageTransitions() {
    // Check browser
    const mobile = isMobile();

    // Initializing barba object
    barba.init({

      debug: true,
      transitions: [{
        name: 'fade',
        sync: false,
        // Before container leaves, if desktop, run the desktopMenuAnimationFn function.
        // If mobile, return nothing.
        beforeLeave: ({ trigger }) => {
          if (trigger === 'popstate') return;
          !mobile && desktopMenuAnimationFn();
        },
        /*
          On barba container leave, run fadeOut functions
          depending on whether user is on a mobile phone or desktop device.
        */
        leave: ({ current, trigger }) => {
          if (trigger === 'popstate') return;

          !mobile
            ? fadeOut(current.container)
            : fadeOutMobileFn();
        },
        // Quick reset to make sure the window scroll resets to the top
        beforeEnter: () => {
          window.scroll(0, 0);
        },
        // Main content fades in the same way, regardless of device size.
        enter: ({ next, trigger }) => trigger !== 'popstate' && fadeIn(next.container, config, mobile),
        after: () => App.initScrollLogic().update(),
      }],
    });
  }

  static init() {
    Promise.all([
      App.showPage(),
      App.initSidebarLogic(),
      App.initPageTransitions(),
      App.initScrollLogic(),
      App.getVhValue(),
    ]);
  }
}

App.start();
