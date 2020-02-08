import * as tf from "@tensorflow/tfjs";
const loadImage=(src)=> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src
      img.width=28
      img.height=28
      img.onload = () => resolve(tf.browser.fromPixels(img).toFloat());
      img.onerror = (err) => reject(err);
    });
  }
  export default loadImage