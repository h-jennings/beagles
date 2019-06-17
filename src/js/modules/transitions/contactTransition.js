/* global TimelineMax */

export default function contactTransition(targets) {
  const createAnimation = new Promise((resolve) => {
    const contactTransitionMasterTl = new TimelineMax();

    const fadeInContent = () => {
      const fadeInContentTl = new TimelineMax();

      fadeInContentTl
        .fromTo(targets, 0.5, {
          y: '20%',
          opacity: 0,
        },
        {
          y: '0%',
          opacity: 1,
        });

      return fadeInContentTl;
    };
    contactTransitionMasterTl
      .add(fadeInContent())
      .eventCallback('onComplete', resolve);
  });

  createAnimation()
    .catch(err => console.error(err));
}
