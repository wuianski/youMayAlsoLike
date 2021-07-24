    const PALETTE_COLORS_COUNT = 5;
    const IMAGE_MAX_WIDTH = 400;

    const paletteElement = document.querySelector(".palette");
    const paletteElements = [];
    let i = 0;
    while (i < PALETTE_COLORS_COUNT) {
      const li = document.createElement('li');
      paletteElement.appendChild(li);
      paletteElements.push(li);
      i++;
    }

    const paletteExtractor = new PaletteExtractor();

    var video = document.getElementById('video');
    var canvas = document.createElement('canvas');
    var canvasContext = canvas.getContext('2d');
    document.body.appendChild(canvas);

    /** Get access to the camera! **/
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      /** Not adding `{ audio: true }` since we only want video now **/
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          //video.src = window.URL.createObjectURL(stream);
          video.srcObject = stream;
          video.play();
        });
    }

    /** Elements for taking the snapshot **/
    var canvas2 = document.getElementById('canvas2');
    var context = canvas2.getContext('2d');

    /**  Trigger photo take **/
    document.getElementById("snap").addEventListener("click", function () {
      canvasContext.drawImage(video, 0, 0, 640, 480);
      context.drawImage(video, 0, 0, 640, 480);

      const data = canvasContext.getImageData(0, 0, 640, 480).data;
      /** Extracts the colors palette from image data. **/
      const hexPalette = paletteExtractor.processImageData(
        data,
        PALETTE_COLORS_COUNT
      );
      //console.log(hexPalette)

      /** combine 5 hex into a string for post to API (send to fetch.js) **/
      let joinA = hexPalette.join("-");
      let str = joinA.toString().split("#");
      const joinB = str.join("");
      postHex(joinB);

      /** draw 5 hex on top of snapshot image **/
      let index = 0;
      for (const paletteColorElem of paletteElements) {
        paletteColorElem.style.backgroundColor = hexPalette[index];
        index++;
      }
    });