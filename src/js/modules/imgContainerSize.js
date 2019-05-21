export default class ImgContainerSize {
  constructor() {
    this.imageContainer = document.querySelector('.img-container');
    this.imageLeft = document.querySelector('img.img-left');
    this.imageRight = document.querySelector('img.img-right');
    this.init();
  }

  init() {
    // Adding Event Listeners
    window.addEventListener('DOMContentLoaded', this.setContainerSize.bind(this));
    window.addEventListener('resize', this.resizeContainerSize.bind(this));
  }

  setContainerSize() {
    const initialImageSize = this.imageRight.getBoundingClientRect().bottom;
    this.imageContainer.style.height = `${initialImageSize + 173}px`;
  }

  resizeContainerSize() {
    const newImageSize = this.imageRight.getBoundingClientRect().bottom;
    this.imageContainer.style.height = `${newImageSize + 173}px`;
  }
}
