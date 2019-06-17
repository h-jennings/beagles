/* global TimelineMax */

export default function homeTransition(targets) {
  const createAnimation = new Promise((resolve) => {
    const homeTransitionMasterTl = new TimelineMax();

    const fadeOutContent = () => {
      const fadeOutContentTl = new TimelineMax();

      fadeOutContentTl
        .fromTo(targets, 0.5, {
          y: '0%',
          opacity: 1,
        },
        {
          y: '20%',
          opacity: 0,
        });

      return fadeOutContentTl;
    };
    homeTransitionMasterTl
      .add(fadeOutContent())
      .eventCallback('onComplete', resolve);
  });

  createAnimation()
    .catch(err => console.error(err));
}
