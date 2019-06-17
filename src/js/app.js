import '../scss/main.scss';
import barba from '@barba/core';
import homeTransition from './modules/transitions/homeTransition';
import contactTransition from './modules/transitions/contactTransition';
import config from './config';
import Sidebar from './modules/sidebar';

class App {
  static start() {
    return new App();
  }

  constructor() {
    Promise.all([
      App.domReady(),
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

  static initSidebarLogic() {
    return new Sidebar(config);
  }

  static initPageTransitions() {
    barba.hooks.before(() => {
      barba.wrapper.classList.add('is-animating');
    });

    barba.hooks.after(() => {
      barba.wrapper.classList.remove('is-animating');
    });

    barba.init({
      transitions: [{
        name: 'home-to-contact',
        sync: false,
        from: {
          route: 'home',
        },
        to: {
          namespace: 'contact',
        },
        leave: ({ current }) => homeTransition(current.container),
        enter: ({ next }) => contactTransition(next.container),
      }],
    });
  }

  static init() {
    const images = require.context('../assets/images/', true, /\.jpg|.svg$/);
    images.keys().map(images);

    App.showPage();
    App.initSidebarLogic();
    App.initPageTransitions();
  }
}

App.start();
