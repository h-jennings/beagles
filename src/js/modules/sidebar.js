import { TimelineMax, Power3 } from 'gsap';


export default class Sidebar {
  constructor() {
    this.sidebar = document.querySelector('aside.sidebar');
    this.transitionBlock = document.querySelector('.transition-block');
    this.menuBtn = document.querySelector('button.menu--btn');
    this.menuBtnTxt = document.querySelector('.menu--txt');
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
    this.browserCheck();
  }

  // Initializes object
  init() {
    // setting sidebar state
    this.sidebar.dataset.state = 'closed';

    // Handles clicks for desktop menu
    const menuClickHandler = (e) => {
      const buttonDataset = e.target.dataset.buttonType;

      const eventOptions = {
        menu: {
          functions: [this.openMenuAnimation.bind(this), this.changeButtonState.bind(this)],
        },
        book: {
          functions: [this.closeMenuAnimation.bind(this), this.changeButtonState.bind(this)],
        },
      };

      if (!this.isMobile) {
        /*

        ! MAGIC HAPPENING HERE

        This runs the corresponding functions int the 'eventOptions' object
        based on the event target's data- attribute (which represents the button's functionality)

        */

        eventOptions[buttonDataset].functions.forEach(fn => fn(buttonDataset));
      }
    };

    const hamburgerClickHandler = (e) => {
      if (!this.isMobile) {
        e.stopPropagation();
        this.openMenuAnimation();
        this.changeButtonState('book');
      }
    };

    const closeClickHandler = (e) => {
      const buttonDataset = e.target.dataset;

      if (!this.isMobile) {
        this.closeMenuAnimation();
        this.changeButtonState(buttonDataset.buttonType);
      }
    };

    // Adding event listeners
    this.menuBtn.addEventListener('click', menuClickHandler);
    this.hamburger.addEventListener('click', hamburgerClickHandler);
    this.closeMenuBtn.addEventListener('click', closeClickHandler);

    // Running the browser check on resize to reset the isMobile variable
    window.addEventListener('resize', this.browserCheck);
  }

  // checking browser width and setting the 'isMobile' boolean accordingly
  browserCheck() {
    // debugger;
    document.body.getBoundingClientRect().width <= 900
      ? this.isMobile = true
      : this.isMobile = false;
  }

  changeButtonState(state) {
    let btnState = state;
    btnState === 'menu' ? btnState = 'book' : btnState = 'menu';

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
