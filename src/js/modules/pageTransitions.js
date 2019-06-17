import barba from '@barba/core';
// import barbaRouter from '@barba/router';
import homeTransition from './transitions/homeTransition';

export default class PageTransitions {
  constructor(config) {
    this.config = config;
    PageTransitions.initTransitions();
  }

  static initTransitions() {
    barba.hooks.before(() => {
      barba.wrapper.classList.add('is-animating');
    });

    barba.hooks.after(() => {
      barba.wrapper.classList.remove('is-animating');
    });

    barba.init({
      transitions: [{
        name: 'home',
        leave: ({ current }) => {
          console.log(current);
          homeTransition(current.container);
        },
        enter: ({ next }) => console.log(next.contaner),
      }],
    });
  }
}
