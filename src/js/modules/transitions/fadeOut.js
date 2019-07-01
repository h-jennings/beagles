import { TimelineMax } from 'gsap';

export default function fadeOut(targets) {
  return new Promise((resolve) => {
    const fadeOutMasterTl = new TimelineMax();

    const fadeOutContent = () => {
      const fadeOutContentTl = new TimelineMax();

      fadeOutContentTl
        .to(targets, 0.5, {
          opacity: 0,
        });

      return fadeOutContentTl;
    };
    fadeOutMasterTl
      .add(fadeOutContent())
      .eventCallback('onComplete', resolve);
  });
}
