import { TimelineMax } from 'gsap';
import config from '../../config';

export default function closeMenuAnimation() {
  const { elm, animation } = config;

  const closeMenuMasterTl = new TimelineMax();

  const closeMenuTransition = () => {
    const closeMenuTransitionTl = new TimelineMax();
    closeMenuTransitionTl
      .to([elm.desktopBookTxt, elm.closeMenuBtnDesktop], animation.defaultDuration, {
        opacity: 0,
        ease: animation.defaultEase,
      })
      .fromTo(elm.desktopTransitionBlock, animation.durationLonger, {
        yPercent: 100,
      }, {
        yPercent: 0,
        ease: animation.defaultEase,
        delay: animation.defaultDelay,
      })
      .set(elm.desktopBookBtn, {
        display: 'none',
      })
      .set(elm.menuBtn, {
        display: 'flex',
      })
      .set(elm.hamburger, {
        display: 'unset',
        opacity: 1,
      })
      .set(elm.hamburgerBars, {
        xPercent: 100,
      })
      .set(elm.desktopSideBarLinkWrapper, {
        display: 'none',
      })
      .set([elm.desktopBookTxt, elm.closeMenuBtnDesktop], {
        display: 'none',
      })
      .to(elm.desktopTransitionBlock, animation.durationLonger, {
        yPercent: -100,
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
        xPercent: 0,
      }, animation.defaultStagger);


    return menuAppearAnimationTl;
  };

  closeMenuMasterTl
    .add(closeMenuTransition())
    .add(menuAppearAnimation());

  return closeMenuMasterTl;
}
