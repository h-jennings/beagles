/* eslint-disable no-param-reassign */
export default function browserCheck() {
  let isMobile = false;

  document.body.getBoundingClientRect().width <= 900
    ? isMobile = true
    : isMobile = false;

  return isMobile;
}
