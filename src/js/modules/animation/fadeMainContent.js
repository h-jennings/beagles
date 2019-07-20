import { TimelineMax } from 'gsap';
import config from '../../config';

export default function fadeMainContentFn(buttonType) {
  const { elm, animation } = config;
  const fadeMainContentMasterTl = new TimelineMax();

  const fadeMainContent = () => {
    const fadeMainContentTl = new TimelineMax();
    const mainContainer = document.querySelector('main');
    fadeMainContentTl
      .fromTo([mainContainer, elm.mobileSidebarWrapper], animation.defaultDuration, {
        opacity: 1,
      },
      {
        ease: animation.defaultEase,
        opacity: 0,
      })
      .fromTo([mainContainer, elm.mobileSidebarWrapper], animation.instant, {
        visibility: 'visible',
      },
      {
        visibility: 'hidden',
      })
      .fromTo(elm.body, animation.instant, {
        className: '-=no-overflow',
      },
      {
        className: '+=no-overflow',
      });


    return fadeMainContentTl;
  };

  fadeMainContentMasterTl
    .add(fadeMainContent());
  if (buttonType !== 'mobileMenu') return fadeMainContentMasterTl.reverse(0);

  return fadeMainContentMasterTl;
}
