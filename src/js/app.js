import '../scss/main.scss';
import module from './modules/module';
// import ImgContainerSize from './modules/imgContainerSize';

const images = require.context('../assets/images/', true, /\.jpg|.svg$/);
images.keys().map(images);

module();

function init() {
  return console.log('🔥 App is running');
}

init();

// const calcImgContainerSize = new ImgContainerSize();
