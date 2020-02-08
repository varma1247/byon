import * as tf from "@tensorflow/tfjs";
const model = tf.sequential({
    layers: [
      tf.layers.conv2d({
        inputShape: [28, 28, 3],
        kernelSize: 3,
        filters: 32,
        name: "conv1",
        activation: "relu",
        padding: "same"
      }),
      tf.layers.conv2d({
        kernelSize: 3,
        filters: 32,
        name: "conv2",
        activation: "relu",
        padding: "same"
      }),
      tf.layers.maxPool2d({
        poolSize: 2
      }),
      tf.layers.flatten({
        name: "flatten"
      }),
      tf.layers.dense({
        units: 96,
        activation: "relu",
        name: "dense1"
      })
    ]
  });
  export default model