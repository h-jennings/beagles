/* global TimelineMax */

export default function openMenuAnimation() {
  const { elm, animation } = this.config;

  const openMenuMasterTl = new TimelineMax();

  // Animating the content within the hamburger menu (desktop)
  const hamburgerContentAnimation = () => {
    const hamburgerContentTl = new TimelineMax();
    hamburgerContentTl
      .to(elm.menuBtnTxt, animation.defaultDuration, {
        opacity: 0,
        ease: animation.defaultEase,
      })
      .staggerTo(elm.hamburgerBars, animation.defaultDuration,
        {
          delay: animation.defaultDelay,
          x: '-100%',
          ease: animation.defaultEase,
        }, animation.defaultStagger, `-=${animation.defaultDuration}`)
      .to(elm.hamburger, 0, {
        display: 'none',
      });

    return hamburgerContentTl;
  };

  // Animating transition block that runs over the sidebar
  const sideBarTransitionAnimation = () => {
    const sideBarTransitionTl = new TimelineMax();

    sideBarTransitionTl
      .to(elm.desktopTransitionBlock, animation.durationLonger, {
        y: '0%',
        ease: animation.defaultEase,
      })
      .set(elm.desktopSideBarLinkWrapper, {
        display: 'flex',
      })
      .set(elm.menuBtn, {
        display: 'none',
      })
      .set(elm.desktopBookBtn, {
        display: 'unset',
      })
      .to([elm.desktopBookTxt, elm.closeMenuBtnDesktop], 0, {
        display: 'inline-block',
      })
      .to(elm.desktopTransitionBlock, animation.durationLonger, {
        y: '100%',
        ease: animation.defaultEase,
        delay: animation.defaultDelay,
      })
      .to([elm.desktopBookTxt, elm.closeMenuBtnDesktop], animation.defaultDuration, {
        opacity: 1,
        ease: animation.defaultEase,
        delay: animation.defaultDelay,
      });


    return sideBarTransitionTl;
  };

  openMenuMasterTl
    .add(hamburgerContentAnimation())
    .add(sideBarTransitionAnimation());
}
