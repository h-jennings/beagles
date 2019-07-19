import { TimelineMax } from 'gsap';
import config from '../../config';

export default function loadingAnimation() {
  return new Promise((resolve) => {
    // gather elements to modify
    const { elm, animation } = config;

    const loadingAnimationMasterTl = new TimelineMax();

    const sideBarAnimation = () => {
      console.log('sidebar animation playing!');
    };

    const nameAnimation = () => {
      console.log('name animation playing!');
    };

    loadingAnimationMasterTl
      .add(nameAnimation())
      .add(sideBarAnimation())
      .eventCallback('onComplete', resolve);
  });
}
