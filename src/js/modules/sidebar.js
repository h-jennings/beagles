import { TimelineMax, Power3, TimelineLite } from 'gsap';
import openMenuAnimation from './openMenuAnimation';
import openMobileMenuAnimation from './openMobileMenuAnimation';
import closeMenuAnimation from './closeMenuAnimation';
import closeMobileMenuAnimation from './closeMobileMenuAnimation';
import changeButtonState from './changeButtonState';

export default class Sidebar {
  constructor(config) {
    this.config = config;

    // Calling the init function
    this.initSidebar();

    // Calling the browser check method
    this.isMobile = false;
    this.hasMobileMenuBeenSet = false;
    this.browserCheck();
  }

  // Initializes object
  initSidebar() {
    // Handles clicks for desktop menu
    const clickHandler = (e) => {
      const buttonDataset = e.currentTarget.dataset.buttonType;
      if (buttonDataset === 'hamburger') {
        e.stopPropagation();
      }

      const desktopEventOptions = {
        menu: {
          functions: [
            openMenuAnimation.bind(this),
            changeButtonState.bind(this, buttonDataset),
          ],
        },
        book: {
          functions: [
            closeMenuAnimation.bind(this),
            changeButtonState.bind(this, buttonDataset),
          ],
        },
        hamburger: {
          functions: [
            openMenuAnimation.bind(this),
            changeButtonState.bind(this, buttonDataset),
          ],
        },
        close: {
          functions: [
            closeMenuAnimation.bind(this),
            changeButtonState.bind(this, buttonDataset),
          ],
        },
      };

      const mobileEventOptions = {
        mobileMenu: {
          functions: [
            openMobileMenuAnimation.bind(this),
            changeButtonState.bind(this, buttonDataset),
          ],
        },
        close: {
          functions: [
            closeMobileMenuAnimation.bind(this),
            changeButtonState.bind(this, buttonDataset),
          ],
        },
        book: {
          functions: [
            closeMobileMenuAnimation.bind(this),
            changeButtonState.bind(this, buttonDataset),
          ],
        },
      };

      /*

      ! MAGIC HAPPENING HERE

      This runs the corresponding functions into the 'eventOptions' object
      based on the event target's data- attribute (which represents the button's functionality)

      */
      if (!this.isMobile) {
        desktopEventOptions[buttonDataset].functions.forEach(fn => fn());
      } else {
        // run mobile specific animations here
        // Evaluating and running the mobile specific functions based on their data attributes
        mobileEventOptions[buttonDataset].functions.forEach(fn => fn());
      }
    };

    // Adding event listeners
    [this.config.elm.menuBtn, this.config.elm.hamburger, this.config.elm.closeMenuBtn, this.config.elm.mobileMenuBtn].forEach(elm => elm.addEventListener('click', clickHandler));

    // Running the browser check on resize to reset the isMobile variable
    window.addEventListener('resize', this.browserCheck.bind(this));
  }

  // * Created module
  // checking browser width and setting the 'isMobile' boolean accordingly
  browserCheck() {
    document.body.getBoundingClientRect().width <= 900
      ? this.isMobile = true
      : this.isMobile = false;

    // ! There's a bug where if a user resizes to mobile
    // ! then to desktop, then opens the hamburger menu, switches to mobile and hits
    // ! the menu again, the button state is still 'book', which leads to the wrong
    // ! animation running.

    // If it's not a mobile device then return early
    if (!this.isMobile) return;

    // If it's not a mobile device then return early
    if (this.isMobile && this.hasMobileMenuBeenSet) return;

    // Resetting the styles of the menu to be in the 'open state'  if it's a mobile device
    // this.setMobileMenu();
  }

  // Resets mobile menu styles once the mobile device is detected
  // * Created module
  setMobileMenu() {
    this.hasMobileMenuBeenSet = true;
    this.menuBtnTxt.style.opacity = 0;
    this.hamburger.style.opacity = 0;
    this.hamburger.style.display = 'none';
    this.hamburgerBars.forEach(bar => bar.setAttribute('style', 'transform: translateX(-100%)'));
    this.sideBarLinkWrapper.style.display = 'flex';
    [this.bookTxt, this.closeMenuBtn]
      .forEach(elm => elm.setAttribute('style', 'opacity: 1; display: inline-block;'));
  }
}
