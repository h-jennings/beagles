import '../scss/main.scss';
import Sidebar from './modules/sidebar';

const images = require.context('../assets/images/', true, /\.jpg|.svg$/);
images.keys().map(images);

const sidebar = new Sidebar();
