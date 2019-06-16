import { TimelineMax, TimelineLite } from 'gsap';
import openMenuAnimation from './animation/openMenuAnimation';
import openMobileMenuAnimation from './animation/openMobileMenuAnimation';
import closeMenuAnimation from './animation/closeMenuAnimation';
import closeMobileMenuAnimation from './animation/closeMobileMenuAnimation';
// import changeButtonState from './changeButtonState';
import browserCheck from './browserCheck';

export default class Sidebar {
  constructor(config) {
    this.config = config;
    this.isMobile = false;

    // Calling the init function
    this.initSidebar();
  }

  // Initializes object
  initSidebar() {
    // Checking whether user is on a mobile, or desktop device
    this.isMobile = browserCheck();

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
            // changeButtonState.bind(this, buttonDataset),
          ],
        },
        book: {
          functions: [
            closeMenuAnimation.bind(this),
            // changeButtonState.bind(this, buttonDataset),
          ],
        },
        hamburger: {
          functions: [
            openMenuAnimation.bind(this),
            // changeButtonState.bind(this, buttonDataset),
          ],
        },
        close: {
          functions: [
            closeMenuAnimation.bind(this),
            // changeButtonState.bind(this, buttonDataset),
          ],
        },
      };

      const mobileEventOptions = {
        mobileMenu: {
          functions: [
            openMobileMenuAnimation.bind(this),
            // changeButtonState.bind(this, buttonDataset),
          ],
        },
        close: {
          functions: [
            closeMobileMenuAnimation.bind(this),
            // changeButtonState.bind(this, buttonDataset),
          ],
        },
        book: {
          functions: [
            closeMobileMenuAnimation.bind(this),
            // changeButtonState.bind(this, buttonDataset),
          ],
        },
      };
        // Evaluating and running the desktop specific functions based on their data attributes
      if (!this.isMobile) {
        desktopEventOptions[buttonDataset].functions.forEach(fn => fn());
      } else {
        // run mobile specific animations here
        // Evaluating and running the mobile specific functions based on their data attributes
        mobileEventOptions[buttonDataset].functions.forEach(fn => fn());
      }
    };

    const handleResize = () => {
      this.isMobile = browserCheck();
    };

    // Adding event listeners
    [this.config.elm.menuBtn,
      this.config.elm.hamburger,
      this.config.elm.closeMenuBtnDesktop,
      this.config.elm.closeMenuBtnMobile,
      this.config.elm.mobileMenuBtn,
      this.config.elm.desktopBookBtn,
      this.config.elm.mobileBookBtn]
      .forEach(elm => elm.addEventListener('click', clickHandler));

    // Running the browser check on resize to reset the isMobile variable
    window.addEventListener('resize', handleResize);
  }
}
