import { TimelineMax } from 'gsap';
import fadeSidebarContentFn from '../animation/fadeSidebarContent';
import mobileTransitionBlockFn from '../animation/mobileTransitionBlock';


export default function fadeOutMobile() {
  return new Promise((resolve) => {
    const fadeOutMobileMasterTl = new TimelineMax();

    fadeOutMobileMasterTl
      .add(fadeSidebarContentFn())
      .add(mobileTransitionBlockFn())
      .set(document.body, { className: '-=no-overflow' })
      .eventCallback('onComplete', resolve);
  });
}
