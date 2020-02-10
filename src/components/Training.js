import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { dispose, callbacks } from "@tensorflow/tfjs";
import { min } from "moment";
import Input from '@material-ui/core/Input';
const Training = ({ traindata, savemodel, savedmodel }) => {
  const [empty,setEmpty]=useState(false)
  const train = async data => {
    if (traindata[0].imagetensors.length===0 ||traindata.length===1){
      setEmpty(true)
    }
    else{
      setEmpty(false)
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
    // var i = 0,
    //   len = tensors.length,
    //   next,
    //   order = [];
    // while (i < len) order[i] = ++i; //[1,2,3...]
    // order.sort(function() {
    //   return Math.random() - 0.5;
    // });

    // for (i = 0; i < len; i++) {
    //   next = order[i];
    //   tensors.push(tensors[next]);
    //   labels.push(labels[next]);
    // }
    var [X_train,y_train]=tf.tidy(()=>{
      // tensors.splice(1, len);
      // labels.splice(1, len);
      return [tf.stack(tensors).div(255),tf.oneHot(labels, traindata.length)]
    })
  console.log(labels);
  
    const surface = { name: "Loss and Accuracy Visualization", tab: "Training" };
    const model = tf.sequential({
      layers: [
        tf.layers.conv2d({
          inputShape: [50, 50, 3],
          kernelSize: 3,
          filters: 16,
          name: "conv1",
          activation: "relu",
          padding: "same",
        }),
        tf.layers.maxPool2d({
          poolSize: 2
        }),
        tf.layers.conv2d({
          kernelSize: 3,
          filters: 32,
          name: "conv3",
          activation: "relu",
          padding: "same"
        }),
        tf.layers.maxPool2d({
          poolSize: 2
        }),
        tf.layers.conv2d({
          kernelSize: 3,
          filters: 64,
          name: "conv4",
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
          units: 32,
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
      loss: "categoricalCrossentropy",
      optimizer: tf.train.sgd(0.1),
      metrics: ["accuracy"]
    });
    X_train.array().then(a=>{
      console.log(a);
      
    })
    
    tfvis.visor().open()

    await model.fit(X_train, y_train, {
      batchSize: 1,
      epochs: 200,
      callbacks: tfvis.show.fitCallbacks(surface, ["loss", "acc"],{callbacks:["onEpochEnd"]}),
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
      // .argMax(1)
      .print();
    model.summary();
    // tf.dispose(model);
  }
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
        {/* <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">
          With supporting text below as a natural lead-in to additional content.
        </p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a> */}
        <Input type="number"/>
      </div>
      {empty?(<div className="text-center">Upload alteast one image for each class</div>):null}
    </div>
  );
};
export default Training;
