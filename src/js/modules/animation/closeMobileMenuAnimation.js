import { TimelineMax } from 'gsap';
import config from '../../config';
import mobileTransitionBlockFn from './mobileTransitionBlock';
import fadeMainContentFn from './fadeMainContent';
import fadeSidebarContentFn from './fadeSidebarContent';

export default function (buttonType) {
  return new Promise((resolve) => {
    const { elm, animation } = config;

    const closeMobileMenuAnimationTl = new TimelineMax();

    closeMobileMenuAnimationTl
      .add(fadeSidebarContentFn(buttonType))
      .add(mobileTransitionBlockFn(buttonType))
      .add(fadeMainContentFn(buttonType))
      .eventCallback('onComplete', resolve);
  });
}
