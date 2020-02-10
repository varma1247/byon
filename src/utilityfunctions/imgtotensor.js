import * as tf from "@tensorflow/tfjs";
const loadImage=(src)=> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src
      img.width=50
      img.height=50
      img.onload = () => resolve(tf.tidy(()=>{return tf.browser.fromPixels(img).toFloat()}));
      img.onerror = (err) => reject(err);
    });
  }
  export default loadImage