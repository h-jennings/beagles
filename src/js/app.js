import '../scss/main.scss';
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
      .then(this.init.bind(this))
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

  static init() {
    const images = require.context('../assets/images/', true, /\.jpg|.svg$/);
    images.keys().map(images);

    App.showPage();
    App.initSidebarLogic();
  }
}

App.start();
