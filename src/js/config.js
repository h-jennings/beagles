/* global Power3 */

const config = {
  animation: {
    defaultEase: Power3.easeInOut,
    defaultDuration: 0.3,
    defaultStagger: 0.1,
    defaultDelay: 0.1,
    longerDelay: 0.4,
    durationLonger: 0.5,
  },
  elm: {
    body: document.body,
    sidebar: document.querySelector('aside.sidebar'),
    mobileSidebarWrapper: document.querySelector('.m-sidebar--wrapper'),
    contentWrapper: document.querySelector('.content-wrapper'),
    desktopTransitionBlock: document.querySelector('.desktop-sidebar-transition-block'),
    mobileTransitionBlock: document.querySelector('.mobile-menu-transition-block'),
    menuBtn: document.querySelector('button.menu--btn'),
    menuBtnTxt: document.querySelector('.menu--txt'),
    mobileMenuBtn: document.querySelector('button.m-menu-btn'),
    hamburger: document.querySelector('.hamburger'),
    hamburgerBars: document.querySelectorAll('.bar'),
    bookTxt: document.querySelector('.book--txt'),
    sideBarLinkWrapper: document.querySelector('nav.sidebar-links'),
    sideBarLinks: document.querySelectorAll('nav.sidebar-links li'),
    closeMenuBtn: document.querySelector('button[data-button-type="close"]'),
    mainFooter: document.querySelector('footer.primary'),
  },
};

export default config;
