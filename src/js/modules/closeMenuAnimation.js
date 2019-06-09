/* global TimelineMax */

export default function closeMenuAnimation() {
  const { elm, animation } = this.config;

  const closeMenuMasterTl = new TimelineMax();

  const closeMenuTransition = () => {
    const closeMenuTransitionTl = new TimelineMax();
    closeMenuTransitionTl
      .to([elm.bookTxt, elm.closeMenuBtn], animation.defaultDuration, {
        opacity: 0,
        ease: animation.defaultEase,
      })
      .fromTo(elm.desktopTransitionBlock, animation.durationLonger, {
        y: '100%',
      }, {
        y: '0%',
        ease: animation.defaultEase,
        delay: animation.defaultDelay,
      })
      .to(elm.hamburger, 0, {
        display: 'unset',
        opacity: 1,
      })
      .to(elm.hamburgerBars, 0, {
        x: '100%',
      })
      .to(elm.sideBarLinkWrapper, 0, {
        display: 'none',
      })
      .to([elm.bookTxt, elm.closeMenuBtn], 0, {
        display: 'none',
      })
      .to(elm.desktopTransitionBlock, animation.durationLonger, {
        y: '-100%',
        ease: animation.defaultEase,
        delay: animation.defaultDelay,
      });

    return closeMenuTransitionTl;
  };

  const menuAppearAnimation = () => {
    const menuAppearAnimationTl = new TimelineMax();

    menuAppearAnimationTl
      .to(elm.menuBtnTxt, animation.defaultDuration, {
        opacity: 1,
      })
      .staggerTo(elm.hamburgerBars, animation.defaultDuration, {
        x: '0%',
      }, animation.defaultStagger);


    return menuAppearAnimationTl;
  };

  closeMenuMasterTl
    .add(closeMenuTransition())
    .add(menuAppearAnimation());
}
