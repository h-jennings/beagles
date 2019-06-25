import { TimelineMax } from 'gsap';
import config from '../../config';

export default function fadeSidebarContentFn(buttonType) {
  const { elm, animation } = config;
  const fadeSidebarContentMasterTl = new TimelineMax();

  const fadeSidebarContent = () => {
    const fadeSidebarContentTl = new TimelineMax();

    fadeSidebarContentTl
      .fromTo(elm.mobileSidebar, animation.instant,
        {
          xPercent: 0,
        },
        {
          xPercent: 100,
        })
      .fromTo(elm.closeMenuBtnMobile, animation.instant,
        {
          display: 'none',
        },
        {
          display: 'unset',
        })
      .fromTo(elm.mobileBookBtn, animation.durationLonger, {
        opacity: 0,
      },
      {
        opacity: 1,
        delay: animation.longerDelay,
      })
      .staggerFromTo(elm.mobileSideBarLinks, animation.durationLonger, {
        opacity: 0,
        yPercent: -20,
      },
      {
        opacity: 1,
        yPercent: 0,
      }, animation.defaultStagger, `-=${animation.durationLonger}`)
      .fromTo([elm.closeMenuBtnMobile, elm.mobileBookTxt], animation.defaultDuration, {
        opacity: 0,
        ease: animation.defaultEase,
      },
      {
        opacity: 1,
        ease: animation.defaultEase,
      });


    return fadeSidebarContentTl;
  };

  fadeSidebarContentMasterTl
    .add(fadeSidebarContent());

  if (buttonType !== 'mobileMenu') return fadeSidebarContentMasterTl.reverse(0);

  return fadeSidebarContentMasterTl;
}
