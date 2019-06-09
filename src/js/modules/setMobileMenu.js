

export default function setMobileMenu(config) {
  const globalVars = config;

  // eslint-disable-next-line no-param-reassign
  // config.state.hasMobileMenuBeenSet = true;
  globalVars.elm.menuBtnTxt.style.opacity = 0;
  globalVars.elm.hamburger.style.opacity = 0;
  globalVars.elm.hamburger.style.display = 'none';
  globalVars.elm.hamburgerBars.forEach(bar => bar.setAttribute('style', 'transform: translateX(-100%)'));
  globalVars.elm.sideBarLinkWrapper.style.display = 'flex';
  [globalVars.elm.bookTxt, globalVars.elm.closeMenuBtn]
    .forEach(elm => elm.setAttribute('style', 'opacity: 1; display: inline-block;'));
}
