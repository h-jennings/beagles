import { TimelineMax } from 'gsap';
import config from '../../config';

export default function desktopMenuAnimationFn(buttonType) {
  const { elm, animation } = config;

  const desktopMenuMasterTl = new TimelineMax();

  // Animating the content within the hamburger menu (desktop)
  const hamburgerContentAnimation = () => {
    const hamburgerContentTl = new TimelineMax();
    hamburgerContentTl
      .fromTo(elm.menuBtnTxt, animation.defaultDuration, {
        opacity: 1,
      },
      {
        opacity: 0,
        ease: animation.defaultEase,
      })
      .staggerFromTo(elm.hamburgerBars, animation.defaultDuration,
        {
          xPercent: 0,
        },
        {
          delay: animation.defaultDelay,
          ease: animation.defaultEase,
          xPercent: -100,
        }, animation.defaultStagger, `-=${animation.defaultDuration}`);

    return hamburgerContentTl;
  };

  // Animating transition block that runs over the sidebar
  const sideBarTransitionAnimation = () => {
    const sideBarTransitionTl = new TimelineMax();

    sideBarTransitionTl
      .fromTo(elm.desktopTransitionBlock, animation.durationLonger,
        {
          yPercent: 0,
        },
        {
          ease: animation.defaultEase,
          yPercent: 100,
        })
      .fromTo(elm.desktopSideBarLinkWrapper, animation.instant, {
        display: 'none',
      },
      {
        display: 'flex',
      })
      .fromTo(elm.menuBtn, animation.instant, {
        display: 'flex',
      },
      {
        display: 'none',
      })
      .fromTo(elm.desktopBookBtn, animation.instant, {
        display: 'none',
      },
      {
        display: 'unset',
      })
      .fromTo([elm.desktopBookTxt, elm.closeMenuBtnDesktop], animation.instant, {
        display: 'none',
      },
      {
        display: 'inline-block',
      })
      .to(elm.desktopTransitionBlock, animation.durationLonger, {
        ease: animation.defaultEase,
        yPercent: 200,
      })
      .fromTo([elm.desktopBookTxt, elm.closeMenuBtnDesktop], animation.defaultDuration, {
        opacity: 0,
      },
      {
        opacity: 1,
        ease: animation.defaultEase,
        delay: animation.defaultDelay,
      });

    return sideBarTransitionTl;
  };

  desktopMenuMasterTl
    .add(hamburgerContentAnimation())
    .add(sideBarTransitionAnimation());

  if (buttonType !== 'menu' && buttonType !== 'hamburger') {
    return desktopMenuMasterTl.reverse(0);
  }
  return desktopMenuMasterTl;
}
