import { TimelineMax } from 'gsap';
import config from '../../config';

export default function fadeMainContentFn(buttonType) {
  const { elm, animation } = config;
  const fadeMainContentMasterTl = new TimelineMax();

  const fadeMainContent = () => {
    const fadeMainContentTl = new TimelineMax();

    fadeMainContentTl
      .fromTo([elm.mainContainer, elm.mobileSidebarWrapper], animation.defaultDuration, {
        opacity: 1,
      },
      {
        ease: animation.defaultEase,
        opacity: 0,
      })
      .set([elm.mainContainer, elm.mobileSidebarWrapper], {
        visibility: 'hidden',
      })
      .set(elm.body, {
        className: '+=no-overflow',
      });


    return fadeMainContentTl;
  };

  fadeMainContentMasterTl
    .add(fadeMainContent());

  if (buttonType !== 'mobileMenu') return fadeMainContentMasterTl.reverse(0);

  return fadeMainContentMasterTl;
}
