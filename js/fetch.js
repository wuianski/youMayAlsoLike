const BaseUrl = 'http://127.0.0.1:5000';
const PaletteUrl = `${BaseUrl}/palette/defd0f-886f84-defd0f-b43150-31b1d4?num=2`;

const createElement = (palette) => {
  const dataPaletteElements = document.querySelectorAll("div.dataPalette");
  var j;
  for (j = 0; j < dataPaletteElements.length; j++) {
    const paletteParent = document.createElement("div");
    paletteParent.className = "paletteParent";
    dataPaletteElements[j].appendChild(paletteParent);
  }
};

const createColorElement = (hex) => {
  const block = document.createElement('div');
  block.style.backgroundColor = `#${hex}`;
  block.style.width = '20px';
  block.style.height = '20px'
  block.style.margin = '0.25rem';
  return block;
};

const applyImages = (images) => {
  if (!images) {
    return;
  }

  const dataPaletteElements = document.querySelectorAll("div.dataPalette");
  const appliedImages = images.slice(0, dataPaletteElements.length);
  appliedImages.forEach(/** @param {{file_name: string, palette: string, url: string}} img */(img, idx) => {
    const targetElement = dataPaletteElements[idx];
    const colorElements = img.palette
      .split('-')
      .map(hex => createColorElement(hex));

    colorElements.forEach(ele => targetElement.appendChild(ele));
  });
};

fetch(PaletteUrl, { credentials: "same-origin" })
  .then((response) => response.json())
  .then((data) => {
    const {
      /**  @type {Array<number>} images */
      distances,
      /**  @type {Array<Object>} images */
      images,
    } = data;

    //deleteAllResult();

    applyImages(images);

    // images.forEach((v, idx) => {
    //   const distance = distances[idx];
    //   const {
    //     /** @type {string} file_name */
    //     file_name,
    //     /** @type {string} palette */
    //     palette,
    //   } = v;

    //   // palette color
    //   console.log(images.length);
    //   createElement(palette);
    // });
  })
  .catch((error) => console.error(error));
