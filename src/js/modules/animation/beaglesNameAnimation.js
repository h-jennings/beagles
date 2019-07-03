export default function beaglesNameAnimation(config) {
  // Calculating the size of the 'name' svg on the homepage
  const { nameSvg, menuBtn, nameWrapper } = config.elm;
  const root = document.documentElement;
  const nameContainer = nameWrapper.getBoundingClientRect().height;
  const visibleHeightOfNameWrapper = window.innerHeight - menuBtn.getBoundingClientRect().height;


  const getDiff = () => {
    let nameDiff = (visibleHeightOfNameWrapper / nameContainer) * 100;
    nameDiff = 100 - nameDiff;

    return nameDiff;
  };

  if (nameSvg) {
    // Creating properly on the root element
    root.style.setProperty('--name-diff', `${getDiff()}%`);
  }
}
