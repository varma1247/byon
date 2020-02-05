import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
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
  const [classcount, setclasscount] = useState(0);
  useEffect(() => {
    addClass();
  }, []);
  // console.log(traindata);
  const addClass = () => {
    var newclassname = (classcount + 1).toString();
    setclasscount(classcount + 1);
    setTraindata([
      ...traindata,
      {
        class: "Class " + newclassname,
        imageurls: [],
        y: [],
        edit: false,
        imageelements: [],
        id: uuid()
      }
    ]);
  };
  const removeClass = id => {
    const remainingclasses = traindata.filter(item => item.id !== id);
    console.log(id);

    setTraindata(remainingclasses);
  };
  const editclassname = (id,val) => {
    var index = traindata.findIndex(el => el.id === id);
    var remainingclasses = traindata.filter(item => item.id !== id);
    var item = traindata[index];
    item.class = val;
    remainingclasses.splice(index, 0, item);
    console.log(remainingclasses);

    setTraindata(remainingclasses);
  };
  const onupload=(id,files)=>{
    var index = traindata.findIndex(el => el.id === id);
    var remainingclasses = traindata.filter(item => item.id !== id);
    var item = traindata[index];
    var newurls=[]
    files.forEach(file => {
      newurls.push(URL.createObjectURL(file))
    });
    item.imageurls=[...item.imageurls,...newurls]
    remainingclasses.splice(index, 0, item);
    console.log(remainingclasses);

    setTraindata(remainingclasses);
  }
  return (
    <div className="container-fluid">
      <div
        className="row col-12 col-sm-6 mt-4 justify-content-center"
        style={{ padding: "0px" }}
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
      <TrainingImagesUpload
        traindata={traindata}
        removeClass={removeClass}
        editclassname={editclassname}
        onupload={onupload}
      />
    </div>
  );
};
export default Train;
