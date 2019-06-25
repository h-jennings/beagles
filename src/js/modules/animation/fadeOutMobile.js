import { TimelineMax } from 'gsap';
import fadeSidebarContentFn from './fadeSidebarContent';
import mobileTransitionBlockFn from './mobileTransitionBlock';


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
