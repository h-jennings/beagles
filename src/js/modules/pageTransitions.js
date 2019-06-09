import barba from '@barba/core';

export default class PageTransitions {
  constructor() {
    this.initTransitions();
  }

  initTransitions() {
    barba.hooks.before(() => {
      barba.wrapper.classList.add('is-animating');
    });

    barba.hooks.after(() => {
      barba.wrapper.classList.remove('is-animating');
    });

    barba.init({
      transitions: [{
        name: 'default',
        leave: ({ current }) => console.log(current.container),
        enter: ({ next }) => console.log(current.contaner),
      }],
    });
  }
}
