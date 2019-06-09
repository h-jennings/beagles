export default function changeButtonState(state) {
  const { elm } = this.config;

  const menuButtonStates = ['menu', 'hamburger', 'mobileMenu'];
  let btnState = state;

  menuButtonStates.includes(state) ? btnState = 'book' : btnState = 'menu';

  const setBookFn = function setBookFn() {
    // ! Need to add this functionality back in once the page transition logic is needed
    // this.menuBtn.setAttribute('onclick', 'location.href=\'/contact.html\'');
    elm.menuBtn.dataset.buttonType = 'book';
  };

  const setMenuFn = function setMenuFn() {
    // ! Need to add this functionality back in once the page transition logic is needed
    // this.menuBtn.removeAttribute('onclick');
    elm.menuBtn.dataset.buttonType = 'menu';
  };

  if (btnState === 'book') {
    setBookFn();
  } else {
    setMenuFn();
  }
}
