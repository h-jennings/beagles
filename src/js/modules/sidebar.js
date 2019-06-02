import { TimelineMax, Power3 } from 'gsap';


export default class Sidebar {
  constructor() {
    this.sidebar = document.querySelector('aside.sidebar');
    this.transitionBlock = document.querySelector('.transition-block');
    this.menuBtn = document.querySelector('button.menu--btn');
    this.menuBtnTxt = document.querySelector('.menu--txt');
    this.mobileMenuBtn = document.querySelector('button.m-menu-btn');
    this.hamburger = document.querySelector('.hamburger');
    this.hamburgerBars = document.querySelectorAll('.bar');
    this.bookTxt = document.querySelector('.book--txt');
    this.sideBarLinks = document.querySelector('nav.sidebar-links');
    this.closeMenuBtn = document.querySelector('button[data-button-type="close"]');

    // Animation Values
    this.defaultEase = Power3.easeInOut;
    this.defaultDuration = 0.3;
    this.defaultStagger = 0.1;
    this.defaultDelay = 0.1;
    this.durationLonger = 0.5;

    // Calling the init function
    this.init();

    // Calling the browser check method
    this.isMobile = false;
    this.hasMobileMenuBeenSet = false;
    this.browserCheck();
  }

  // Initializes object
  init() {
    // setting sidebar state
    this.sidebar.dataset.state = 'closed';

    // Handles clicks for desktop menu
    const clickHandler = (e) => {
      const buttonDataset = e.currentTarget.dataset.buttonType;
      if (buttonDataset === 'hamburger') {
        e.stopPropagation();
      }

      const eventOptions = {
        menu: {
          functions: [
            this.openMenuAnimation.bind(this),
            this.changeButtonState.bind(this),
          ],
        },
        book: {
          functions: [
            this.closeMenuAnimation.bind(this),
            this.changeButtonState.bind(this),
          ],
        },
        hamburger: {
          functions: [
            this.openMenuAnimation.bind(this),
            this.changeButtonState.bind(this),
          ],
        },
        close: {
          functions: [
            this.closeMenuAnimation.bind(this),
            this.changeButtonState.bind(this),
          ],
        },
        mobileMenu: {
          functions: [],
        },
      };

      /*

      ! MAGIC HAPPENING HERE

      This runs the corresponding functions into the 'eventOptions' object
      based on the event target's data- attribute (which represents the button's functionality)

      */

      if (!this.isMobile) {
        eventOptions[buttonDataset].functions.forEach(fn => fn(buttonDataset));
      } else {
        // run mobile specific animations here

        // Setting
      }
    };

    // Adding event listeners
    [this.menuBtn, this.hamburger, this.closeMenuBtn].forEach(elm => elm.addEventListener('click', clickHandler));

    // Running the browser check on resize to reset the isMobile variable
    window.addEventListener('resize', this.browserCheck.bind(this));
  }

  // checking browser width and setting the 'isMobile' boolean accordingly
  browserCheck() {
    document.body.getBoundingClientRect().width <= 900
      ? this.isMobile = true
      : this.isMobile = false;

    // If it's not a mobile device then return early
    if (!this.isMobile) return;

    // If it's not a mobile device then return early
    if (this.isMobile && this.hasMobileMenuBeenSet) return;

    this.setMobileMenu();
  }

  changeButtonState(state) {
    const menuButtonStates = ['menu', 'hamburger'];
    let btnState = state;

    menuButtonStates.includes(state) ? btnState = 'book' : btnState = 'menu';

    if (btnState === 'book') {
      this.setBookFn();
    } else {
      this.setMenuFn();
    }
  }

  setBookFn() {
    // ! Need to add this functionality back in once the page transition logic is needed
    // this.menuBtn.setAttribute('onclick', 'location.href=\'/contact.html\'');
    this.menuBtn.dataset.buttonType = 'book';
  }

  setMenuFn() {
    // ! Need to add this functionality back in once the page transition logic is needed
    // this.menuBtn.removeAttribute('onclick');
    this.menuBtn.dataset.buttonType = 'menu';
  }

  setMobileMenu() {
    this.hasMobileMenuBeenSet = true;
    this.menuBtnTxt.style.opacity = 0;
    this.hamburger.style.opacity = 0;
    this.hamburger.style.display = 'none';
    this.hamburgerBars.forEach(bar => bar.setAttribute('style', 'transform: translateX(-100%)'));
    this.sideBarLinks.style.display = 'flex';
    [this.bookTxt, this.closeMenuBtn]
      .forEach(elm => elm.setAttribute('style', 'opacity: 1; display: inline-block;'));
    this.transitionBlock.style.transform = 'translate(0, 100%)';
  }

  openMenuAnimation() {
    const openMenuMasterTl = new TimelineMax();

    // Animating the content within the hamburger menu (desktop)
    const hamburgerContentAnimation = () => {
      const hamburgerContentTl = new TimelineMax();
      hamburgerContentTl
        .to(this.menuBtnTxt, this.defaultDuration, {
          opacity: 0,
          ease: this.defaultEase,
        })
        .staggerTo(this.hamburgerBars, this.defaultDuration,
          {
            delay: this.defaultDelay,
            x: '-100%',
            ease: this.defaultEase,
          }, this.defaultStagger, `-=${this.defaultDuration}`)
        .to(this.hamburger, 0, {
          display: 'none',
        });

      return hamburgerContentTl;
    };

    // Animating transition block that runs over the sidebar
    const sideBarTransitionAnimation = () => {
      const sideBarTransitionTl = new TimelineMax();

      sideBarTransitionTl
        .to(this.transitionBlock, this.durationLonger, {
          y: '0%',
          ease: this.defaultEase,
        })
        .to(this.sideBarLinks, 0, {
          display: 'flex',
        })
        .to([this.bookTxt, this.closeMenuBtn], 0, {
          display: 'inline-block',
        })
        .to(this.transitionBlock, this.durationLonger, {
          y: '100%',
          ease: this.defaultEase,
          delay: this.defaultDelay,
        })
        .to([this.bookTxt, this.closeMenuBtn], this.defaultDuration, {
          opacity: 1,
          ease: this.defaultEase,
          delay: this.defaultDelay,
        });


      return sideBarTransitionTl;
    };

    openMenuMasterTl
      .add(hamburgerContentAnimation())
      .add(sideBarTransitionAnimation());
  }

  closeMenuAnimation() {
    const closeMenuMasterTl = new TimelineMax();

    const closeMenuTransition = () => {
      const closeMenuTransitionTl = new TimelineMax();
      closeMenuTransitionTl
        .to([this.bookTxt, this.closeMenuBtn], this.defaultDuration, {
          opacity: 0,
          ease: this.defaultEase,
        })
        .to(this.transitionBlock, this.durationLonger, {
          y: '0%',
          ease: this.defaultEase,
          delay: this.defaultDelay,
        })
        .to(this.hamburger, 0, {
          display: 'unset',
        })
        .to(this.hamburgerBars, 0, {
          x: '100%',
        })
        .to(this.sideBarLinks, 0, {
          display: 'none',
        })
        .to([this.bookTxt, this.closeMenuBtn], 0, {
          display: 'none',
        })
        .to(this.transitionBlock, this.durationLonger, {
          y: '-100%',
          ease: this.defaultEase,
          delay: this.defaultDelay,
        });

      return closeMenuTransitionTl;
    };

    const menuAppearAnimation = () => {
      const menuAppearAnimationTl = new TimelineMax();

      menuAppearAnimationTl
        .to(this.menuBtnTxt, this.defaultDuration, {
          opacity: 1,
        })
        .staggerTo(this.hamburgerBars, this.defaultDuration, {
          x: '0%',
        }, this.defaultStagger);


      return menuAppearAnimationTl;
    };

    closeMenuMasterTl
      .add(closeMenuTransition())
      .add(menuAppearAnimation());
  }
}
