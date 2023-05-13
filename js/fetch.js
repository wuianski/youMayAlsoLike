function postHex(joinB) {
  //console.log(joinB);
  const BaseUrl = "https://data.youmayalsolike.work/"; //http://127.0.0.1:5000  //https://data.youmayalsolike.ml/
  const cameraPalette = `${joinB}`;
  const PaletteUrl = `${BaseUrl}/palette/${cameraPalette}?num=ˇ`;

  /** show image **/
  const showImage = (imgURLs, targetElement) => {
    targetElement.style.backgroundImage = `url(${imgURLs})`;
  };
  /** show image **/
  // const showMyImage = (imgURLs, myTargetElement) => {
  //   myTargetElement.style.backgroundImage = `url(${imgURLs})`;
  //   // myTargetElement.style.background = `#fff`;
  // };

  /** create palette divs **/
  const createColorElement = (hex) => {
    const block = document.createElement("div");
    block.className = "sbox";
    block.style.backgroundColor = `#${hex}`;
    block.style.width = "20%";
    block.style.height = "20px";
    block.style.position = "relative";
    block.style.bottom = "0px";
    return block;
  };

  /** pass the value to 'createColorElement', then clear palette divs before draw the new hex, then draw **/
  const applyImages = (images) => {
    if (!images) {
      return;
    }
    const dataPaletteElements = document.querySelectorAll("div.dataPalette");
    // const myDataPaletteElements = document.getElementById("pop1_img");
    const appliedImages = images.slice(0, dataPaletteElements.length);
    appliedImages.forEach(
      /** @param {{file_name: string, palette: string, url: string}} img */ (
        img,
        idx
      ) => {
        const targetElement = dataPaletteElements[idx];
        // const myTargetElement = myDataPaletteElements;
        const colorElements = img.palette
          .split("-")
          .map((hex) => createColorElement(hex));

        /*const newBlock = document.createElement("div");
        targetElement.appendChild(newBlock);
        newBlock.className = "nbox";*/
        /** clear palette divs **/
        targetElement.innerHTML = "";
        // myTargetElement.innerHTML = "";
        /** draw the new hex in to palette divs **/
        colorElements.forEach((ele) => targetElement.appendChild(ele));

        /** get images url **/
        const imgURLs = img.url;
        showImage(imgURLs, targetElement);
        // showMyImage(imgURLs, myTargetElement);
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
