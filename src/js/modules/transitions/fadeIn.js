import { TimelineMax } from 'gsap';

export default function fadeIn(targets) {
  return new Promise((resolve) => {
    const fadeInMasterTl = new TimelineMax();
    const fadeInContent = () => {
      const fadeInContentTl = new TimelineMax();

      fadeInContentTl
        .fromTo(targets, 0.5, {
          opacity: 0,
        },
        {
          opacity: 1,
        });

      return fadeInContentTl;
    };
    fadeInMasterTl
      .add(fadeInContent())
      .delay(0.5)
      .eventCallback('onComplete', resolve);
  });
}
