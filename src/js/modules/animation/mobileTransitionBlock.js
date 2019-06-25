import { TimelineMax } from 'gsap';
import config from '../../config';

export default function mobileTransitionBlockFn(buttonType) {
  const { elm, animation } = config;
  const mobileTransitionBlockMasterTl = new TimelineMax();

  const transitionBlockAnimation = () => {
    const transitionBlockAnimationTl = new TimelineMax();

    transitionBlockAnimationTl
      .fromTo(elm.mobileTransitionBlock, animation.instant,
        {
          opacity: 0,
        }, {
          opacity: 1,
        })
      .set(elm.mobileTransitionBlock, {
        xPercent: 0,
      })
      .to(elm.mobileTransitionBlock, animation.defaultDuration, {
        xPercent: 100,
        delay: animation.longerDelay,
      })
      .to(elm.mobileTransitionBlock, animation.durationLonger, {
        xPercent: 200,
        delay: animation.longerDelay,
      });


    return transitionBlockAnimationTl;
  };

  mobileTransitionBlockMasterTl
    .add(transitionBlockAnimation());

  if (buttonType !== 'mobileMenu') return mobileTransitionBlockMasterTl.reverse(0);

  return mobileTransitionBlockMasterTl;
}
