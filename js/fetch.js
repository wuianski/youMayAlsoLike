function postHex(joinB) {
  //console.log(joinB);
  const BaseUrl = "http://127.0.0.1:5000";
  const cameraPalette = `${joinB}`;
  const PaletteUrl = `${BaseUrl}/palette/${cameraPalette}?num=ˇ`;

  /** create palette divs **/
  const createColorElement = (hex) => {
    const block = document.createElement("div");
    block.style.backgroundColor = `#${hex}`;
    block.style.width = "20px";
    block.style.height = "20px";
    block.style.margin = "0.25rem";
    return block;
  };

  /** pass the value to 'createColorElement', then clear palette divs before draw the new hex, then draw **/
  const applyImages = (images) => {
    if (!images) {
      return;
    }
    const dataPaletteElements = document.querySelectorAll("div.dataPalette");
    const appliedImages = images.slice(0, dataPaletteElements.length);
    appliedImages.forEach(
      /** @param {{file_name: string, palette: string, url: string}} img */ (
        img,
        idx
      ) => {
        const targetElement = dataPaletteElements[idx];
        const colorElements = img.palette
          .split("-")
          .map((hex) => createColorElement(hex));

        /** clear palette divs **/
        targetElement.innerHTML = "";
        /** draw the new hex in to palette divs **/
        colorElements.forEach((ele) => targetElement.appendChild(ele));
      }
    );
  };

  /** get data from API, then pass value to 'applyImages' **/
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
    })
    .catch((error) => console.error(error));
}
