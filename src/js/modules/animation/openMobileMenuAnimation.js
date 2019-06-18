import { TimelineMax } from 'gsap';
import config from '../../config';

export default function openMenuAnimation() {
  const { elm, animation } = config;

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
      .set(elm.body, {
        className: '+=no-overflow',
      });

    return fadeOutContentTl;
  };

  const mobileSidebarSlideInAnimation = () => {
    const sideBarSlideTl = new TimelineMax();

    sideBarSlideTl
      .set(elm.mobileTransitionBlock, {
        opacity: 1,
        visibility: 'visible',
      })
      .set(elm.closeMenuBtnMobile, {
        display: 'unset',
      })
      .to(elm.mobileTransitionBlock, animation.defaultDuration, {
        x: '0%',
        delay: animation.longerDelay,
      })
      .set(elm.mobileSidebar, {
        x: '0%',
      })
      .to(elm.mobileTransitionBlock, animation.defaultDuration, {
        x: '100%',
        delay: animation.longerDelay,
      })
      .staggerFromTo(elm.mobileSideBarLinks, animation.durationLonger, {
        y: '-20%',
        opacity: 0,
      }, {
        y: '0%',
        opacity: 1,
      }, animation.defaultStagger)
      .fromTo([elm.mobileBookTxt, elm.closeMenuBtnMobile], animation.defaultDuration, {
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
