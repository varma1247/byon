import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { dispose } from "@tensorflow/tfjs";
import { min } from "moment";

const Training = ({ traindata, savemodel, savedmodel }) => {
  const train = async data => {
    var tensors = [];
    var labels = [];
    var labelnames = [];
    data.forEach((d, index) => {
      tensors.push(...d.imagetensors);
      labelnames.push(d.class);
      d.imagetensors.forEach(i => {
        labels.push(index);
      });
    });
    var i = 0,
      len = tensors.length,
      next,
      order = [];
    while (i < len) order[i] = ++i; //[1,2,3...]
    order.sort(function() {
      return Math.random() - 0.5;
    });

    for (i = 0; i < len; i++) {
      next = order[i];
      tensors.push(tensors[next]);
      labels.push(labels[next]);
    }
    tensors.splice(1, len);
    labels.splice(1, len);
    var X_train = tf.stack(tensors).div(255);
    tf.dispose(tensors);
    tf.dispose(labels);
    // console.log(X_train);
    // console.log(X_train.shape);
    // X_train.print();
    // console.log(tf.oneHot(labels, traindata.length).shape);
    var y_train = tf.oneHot(labels, traindata.length);

    const surface = { name: "show.fitCallbacks", tab: "Training" };
    const model = tf.sequential({
      layers: [
        tf.layers.conv2d({
          inputShape: [28, 28, 3],
          kernelSize: 3,
          filters: 16,
          name: "conv1",
          activation: "relu",
          padding: "same"
        }),
        tf.layers.conv2d({
          kernelSize: 3,
          filters: 16,
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
          units: 64,
          activation: "relu",
          name: "dense1"
        }),
        tf.layers.dense({
          units: traindata.length,
          activation: "softmax",
          name: "dense2"
        })
      ]
    });

    model.compile({
      loss: tf.losses.softmaxCrossEntropy,
      optimizer: tf.train.sgd(0.01),
      metrics: ["accuracy"]
    });
    await model.fit(X_train, y_train, {
      batchSize: 10,
      epochs: 75 ,
      callbacks: tfvis.show.fitCallbacks(surface, ["loss", "acc"]),
      shuffle: true
    });
    // var skladby = ["skladba00", "skladba01", "skladba02", "skladba03"];
    // var i = 0,
    //   len = skladby.length,
    //   next,
    //   order = [];
    // while (i < len) order[i] = ++i; //[1,2,3...]
    // order.sort(function() {
    //   return Math.random() - 0.5;
    // });
    // console.log(order);
    savemodel(model);
    model
      .predict(X_train)
      .argMax(1)
      .print();
    model.summary();
    tf.dispose(model);
  };
  return (
    <div
      className="col-12 col-sm-2 text-center card bg-dark"
      style={{ borderRadius: "10px" }}
    >
      <h5 className="card-header">
        <Button
          variant="outlined"
          color="secondary"
          style={{ verticalAlign: "middle" }}
          onClick={e => train(traindata)}
        >
          TRAIN
        </Button>
      </h5>
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">
          With supporting text below as a natural lead-in to additional content.
        </p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
};
export default Training;
