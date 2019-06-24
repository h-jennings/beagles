import { TimelineMax } from 'gsap';
import config from '../../config';
import mobileTransitionBlockFn from './mobileTransitionBlock';
import fadeMainContentFn from './fadeMainContent';
import fadeSidebarContentFn from './fadeSidebarContent';

export default function openMenuAnimation(buttonType) {
  return new Promise((resolve) => {
    const { elm, animation } = config;

    const openMobileMenuAnimationMasterTl = new TimelineMax();

    openMobileMenuAnimationMasterTl
      .add(fadeMainContentFn(buttonType))
      .add(mobileTransitionBlockFn(buttonType))
      .add(fadeSidebarContentFn(buttonType))
      .eventCallback('onComplete', resolve);
  });
}
