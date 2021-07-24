const Url =
  "http://127.0.0.1:5000/palette/defd0f-886f84-defd0f-b43150-31b1d4?num=2";

const createElement = (palette) => {
  const dataPaletteElements = document.querySelectorAll("div.dataPalette");
  var j;
  for (j = 0; j < dataPaletteElements.length; j++) {
    const paletteParent = document.createElement("div");
    paletteParent.className = "paletteParent";
    dataPaletteElements[j].appendChild(paletteParent);
  }
};

fetch(Url, { credentials: "same-origin" })
  .then((response) => response.json())
  .then((data) => {
    const {
      /**  @type {Array<number>} images */
      distances,
      /**  @type {Array<Object>} images */
      images,
    } = data;

    //deleteAllResult();

    if (!images) {
      return;
    }

    images.forEach((v, idx) => {
      const distance = distances[idx];
      const {
        /** @type {string} file_name */
        file_name,
        /** @type {string} palette */
        palette,
      } = v;

      // palette color
      console.log(images.length);
      createElement(palette);
    });
  })
  .catch((error) => console.error(error));
