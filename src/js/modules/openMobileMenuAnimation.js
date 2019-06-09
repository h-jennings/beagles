/* global TimelineMax */

export default function openMenuAnimation() {
  const { elm, animation } = this.config;

  const openMobileMenuAnimationMasterTl = new TimelineMax();

  const fadeOutMobileContent = () => {
    const fadeOutContentTl = new TimelineMax();
    fadeOutContentTl
      .to(
        [elm.mobileSidebarWrapper,
          elm.contentWrapper,
          elm.mainFooter],
        animation.defaultDuration, {
          ease: animation.defaultEase,
          opacity: 0,
        },
      )
      .to(elm.body, animation.defaultDuration, {
        overflow: 'hidden',
      }, `-=${animation.defaultDuration}`);

    return fadeOutContentTl;
  };

  const mobileSidebarSlideInAnimation = () => {
    const sideBarSlideTl = new TimelineMax();

    sideBarSlideTl
      .set(elm.mobileTransitionBlock, {
        opacity: 1,
        visibility: 'visible',
      })
      .to(elm.mobileTransitionBlock, animation.defaultDuration, {
        x: '0%',
        delay: animation.longerDelay,
      })
      .set(elm.sidebar, {
        x: '0%',
      })
      .to(elm.mobileTransitionBlock, animation.defaultDuration, {
        x: '100%',
        delay: animation.longerDelay,
      })
      .staggerFromTo(elm.sideBarLinks, animation.durationLonger, {
        y: '-20%',
        opacity: 0,
      }, {
        y: '0%',
        opacity: 1,
      }, animation.defaultStagger)
      .fromTo(elm.bookTxt, animation.defaultDuration, {
        opacity: 0,
      }, {
        opacity: 1,
      });

    return sideBarSlideTl;
  };
  openMobileMenuAnimationMasterTl
    .add(fadeOutMobileContent())
    .add(mobileSidebarSlideInAnimation());
}
