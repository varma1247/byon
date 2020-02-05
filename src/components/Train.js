import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import uuid from "react-uuid";
import * as tf from "@tensorflow/tfjs";
import TrainingImagesUpload from "./TrainingImagesUpload";
const Train = () => {
  // const model = tf.sequential();
  // model.add(
  //   tf.layers.dense({ units: 100, activation: "relu", inputShape: [10] })
  // );
  // model.add(tf.layers.dense({ units: 1, activation: "linear" }));
  // // console.log(model.layers[0].ge tWeights()[0].data())
  // model.layers[0].getWeights()[0].array().then(d=>console.log(d));

  const [traindata, setTraindata] = useState([]);
  const addClass = () => {
    setTraindata([
      ...traindata,
      {
        class: "Class " + (traindata.length + 1).toString(),
        images: [],
        y: [],
        edit: false,
        imageData: [],
        id: uuid()
      }
    ]);
  };
  useEffect(() => {
    addClass();
  }, []);
  // console.log(traindata);
  
  const removeClass = id => {};
  return (
    <div className="container-fluid">
      <div
        className="row col-12 col-sm-6 mt-4 justify-content-center" style={{padding:"0px"}}
      >
         <Button
        variant="outlined"
        color="primary"
        startIcon={<Add />}
        onClick={addClass}
      >
        ADD CLASS
      </Button>
      </div>
      <TrainingImagesUpload traindata={traindata} />
    </div>
  );
};
export default Train;
