import { TimelineMax } from 'gsap';
import config from '../../config';

export default function closeMobileMenuAnimation(buttonType) {
  return new Promise((resolve) => {
    const { elm, animation } = config;

    const closeMobileMenuAnimationTl = new TimelineMax();

    const fadeOutMobileMenuContent = () => {
      const fadeOutMobileMenuContentTl = new TimelineMax();

      const reversedSidebarLinks = [...elm.mobileSideBarLinks].reverse();

      fadeOutMobileMenuContentTl
        .to(elm.mobileBookTxt, animation.defaultDuration, {
          opacity: 0,
        })
        .staggerTo(reversedSidebarLinks, animation.defaultDuration, {
          opacity: 0,
        }, animation.defaultStagger)
        .to(elm.mobileSidebar, animation.durationLonger, {
          opacity: 0,
        });

      return fadeOutMobileMenuContentTl;
    };

    const fadeInMainContent = () => {
      const fadeInContentTl = new TimelineMax();
      fadeInContentTl
        .set(elm.mobileSidebar, {
          opacity: 1,
        })
        .to(elm.mobileSidebarWrapper, animation.defaultDuration, {
          ease: animation.defaultEase,
          opacity: 1,
        });

      buttonType === 'close'
        ? fadeInContentTl
          .fromTo(
            [elm.mainContainer,
              elm.mainFooter,
              elm.contentWrapper],
            animation.defaultDuration, {
              opacity: 0,
            }, {
              ease: animation.defaultEase,
              opacity: 1,
            }, `-=${animation.defaultDuration}`,
          )
          .set(elm.body, {
            className: '-=no-overflow',
          })

        : fadeInContentTl
          .set(elm.body, {
            className: '-=no-overflow',
          });


      return fadeInContentTl;
    };

    const mobileSidebarSlideOutAnimation = () => {
      const sideBarSlideInTl = new TimelineMax();

      sideBarSlideInTl
        .to(elm.mobileTransitionBlock, animation.defaultDuration, {
          ease: animation.defaultEase,
          x: '0%',
        })
        .set(elm.mobileSidebar, {
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
      .add(fadeInMainContent())
      .eventCallback('onComplete', resolve);
  });
}
