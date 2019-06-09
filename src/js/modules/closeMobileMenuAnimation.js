/* global TimelineMax */

export default function closeMobileMenuAnimation() {
  const { elm, animation } = this.config;

  const closeMobileMenuAnimationTl = new TimelineMax();

  const fadeOutMobileMenuContent = () => {
    const fadeOutMobileMenuContentTl = new TimelineMax();

    const reversedSidebarLinks = [...elm.sideBarLinks].reverse();

    fadeOutMobileMenuContentTl
      .to(elm.bookTxt, animation.defaultDuration, {
        opacity: 0,
      })
      .staggerTo(reversedSidebarLinks, animation.defaultDuration, {
        opacity: 0,
      }, animation.defaultStagger)
      .to(elm.sidebar, animation.durationLonger, {
        opacity: 0,
      });

    return fadeOutMobileMenuContentTl;
  };

  const fadeInMainContent = () => {
    const fadeInContentTl = new TimelineMax();
    fadeInContentTl
      .set(elm.sidebar, {
        opacity: 1,
      })
      .to(elm.mobileSidebarWrapper, animation.defaultDuration, {
        ease: animation.defaultEase,
        opacity: 1,
      })
      .to([elm.contentWrapper, elm.mainFooter], animation.defaultDuration, {
        ease: animation.defaultEase,
        opacity: 1,
        delay: animation.defaultDelay,
      }, `-=${animation.defaultDuration}`)
      .set(elm.body, {
        overflow: 'visible',
      }, `-=${animation.defaultDuration}`);

    return fadeInContentTl;
  };

  const mobileSidebarSlideOutAnimation = () => {
    const sideBarSlideInTl = new TimelineMax();

    sideBarSlideInTl
      .to(elm.mobileTransitionBlock, animation.defaultDuration, {
        ease: animation.defaultEase,
        x: '0%',
      })
      .set(elm.sidebar, {
        x: '-100%',
      })
      .to(elm.mobileTransitionBlock, animation.durationLonger, {
        ease: animation.defaultEase,
        x: '-100%',
        delay: animation.longerDelay,
      });

    return sideBarSlideInTl;
  };

  closeMobileMenuAnimationTl
    .add(fadeOutMobileMenuContent())
    .add(mobileSidebarSlideOutAnimation(), `-=${animation.defaultDuration}`)
    .add(fadeInMainContent());
}
