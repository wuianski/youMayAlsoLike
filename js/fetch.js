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
  const showMyImage = (imgURLs, myTargetElement) => {
    myTargetElement.style.backgroundImage = `url(${imgURLs})`;
    myTargetElement.style.backgroundRepeat = `no-repeat`;
    myTargetElement.style.backgroundSize = `contain`;
    myTargetElement.style.backgroundPosition = `center`;
  };

  /** create palette divs **/
  const createColorElement = (hex) => {
    const block = document.createElement("div");
    block.className = "sbox";
    block.style.backgroundColor = `#${hex}`;
    block.style.width = "20%";
    block.style.height = "10px";
    block.style.position = "relative";
    block.style.bottom = "5px";
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

        /** get images url **/
        const imgURLs = img.url;
        showImage(imgURLs, targetElement);
      }
    );
    /* pop up test */
    const myDataPaletteElements = document.getElementById("pop1_img");
    showMyImage(images[15].url, myDataPaletteElements);
    const popParent1 = document.getElementById("pop1");
    popParent1.style.display = `block`;
    popParent1.animate([
      // key frames
      { left: '-300px' },
      { left: '0px' }
    ], {
      // sync options
      duration: 1000,
    });
    /* pop up test */
    const myDataPaletteElements2 = document.getElementById("pop2_img");
    showMyImage(images[16].url, myDataPaletteElements2);
    const popParent2 = document.getElementById("pop2");
    popParent2.style.display = `block`;
    popParent2.animate([
      // key frames
      { top: '-300px' },
      { top: '0px' }
    ], {
      // sync options
      duration: 1000,
    });
    /* pop up test */
    const myDataPaletteElements3 = document.getElementById("pop3_img");
    showMyImage(images[17].url, myDataPaletteElements3);
    const popParent3 = document.getElementById("pop3");
    popParent3.style.display = `block`;
    popParent3.animate([
      // key frames
      { bottom: '-300px' },
      { bottom: '0px' }
    ], {
      // sync options
      duration: 1000,
    });
    /* pop up test */
    const myDataPaletteElements4 = document.getElementById("pop4_img");
    showMyImage(images[18].url, myDataPaletteElements4);
    const popParent4 = document.getElementById("pop4");
    popParent4.style.display = `block`;
    popParent4.animate([
      // key frames
      { right: '-300px' },
      { right: '0px' }
    ], {
      // sync options
      duration: 1000,
    });
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
