/*

This is to move the player text if
it's width is greater than it's container

*/

const textContainer = document.querySelector('.element');

// Comparing the scroll width vs. the container width

if (textContainer.scrollWidth > textContainer.clientWidth) {
  // Do Something (animate).
}
