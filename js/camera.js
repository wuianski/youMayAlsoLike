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

    var video = document.getElementById("video");
    var canvas = document.getElementById("canvas");

    // var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    //document.body.appendChild(canvas);

    /** Get access to the camera! **/
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      /** Not adding `{ audio: true }` since we only want video now **/
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
          video.play();
          loadBodyPix();
        });
    }

    /** Elements for taking the snapshot **/
    var canvas2 = document.getElementById("canvas2");
    var context = canvas2.getContext("2d");

    var tempState = false;

    /**  Trigger photo take by click mouse button on anywhere of screen **/
    function WhichButton(event) {
      if (event.button == 0) {
        tempState = true;
        //ctx.drawImage(video, 0, 0, 640, 480);
        context.drawImage(canvas, 0, 0, 640, 480);

        const data = ctx.getImageData(0, 0, 640, 480).data;
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
      }
    }

    function loadBodyPix() {
      options = {
        multiplier: 0.75,
        stride: 32,
        quantBytes: 4,
      };
      bodyPix
        .load(options)
        .then((net) => perform(net))
        .catch((err) => console.log(err));
    }

    async function perform(net) {
      while (1) {
        const segmentation = await net.segmentPerson(video);
        const coloredPartImage = bodyPix.toMask(segmentation);
        const opacity = 1;
        const flipHorizontal = false;
        const maskBlurAmount = 0;
        // Draw the mask image on top of the original image onto a canvas.
        // The colored part image will be drawn semi-transparent, with an opacity of
        // 0.7, allowing for the original image to be visible under.
        bodyPix.drawMask(
          canvas,
          video,
          coloredPartImage,
          opacity,
          maskBlurAmount,
          flipHorizontal
        );
      }
    }