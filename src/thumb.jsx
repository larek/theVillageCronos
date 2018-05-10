let createThumb = (size, img, callback) => {
  let canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 300;
  let ctx = canvas.getContext('2d');
  let image = new Image();
  image.src = img;
  image.onload = () => {
    ctx.drawImage(image,
      0, 50,   // Start at 0/50 pixels from the left and the top of the image (crop),
      size, size,   // "Get" a `size * size` (w * h) area from the source image (crop),
      0, 0,     // Place the result at 0, 0 in the canvas,
      size, size);
    callback(canvas.toDataURL());
  };
};

export default createThumb;
