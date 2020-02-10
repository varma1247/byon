import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import uuid from "react-uuid";
// import * as tf from "@tensorflow/tfjs";
import TrainingImagesUpload from "./TrainingImagesUpload";
import imageupload_default from "../images/uploadimage_default.jpg";
import Training from "./Training"
import imgtotensor from "../utilityfunctions/imgtotensor"
import CircularProgress from "@material-ui/core/CircularProgress";

// import Imageupload from "./Imageupload"
const Owndata = () => {
  // const model = tf.sequential();
  // model.add(
  //   tf.layers.dense({ units: 100, activation: "relu", inputShape: [10] })
  // );
  // model.add(tf.layers.dense({ units: 1, activation: "linear" }));
  // // console.log(model.layers[0].ge tWeights()[0].data())
  // model.layers[0].getWeights()[0].array().then(d=>console.log(d));

  const [traindata, setTraindata] = useState([]);
  const [classcount, setclasscount] = useState(0);
  const [model,setModel]=useState(null)
  const [imageurl, setImageurl] = useState(null);
  const [imagename, setImagename] = useState("Upload");
  const [predictions, setPredictions] = useState([]);
  const [predicting, setPredicting] = useState(false);
  useEffect(() => {
    addClass();
    
    // eslint-disable-next-line
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
        imagetensors: [],
        id: uuid()
      }
    ]);
  };
  const savemodel = (model) => {
    setModel(model)
    
  };
  const onchange = e => {
    if (e.target.files[0]) {
      setImageurl(URL.createObjectURL(e.target.files[0]));
      setImagename(e.target.files[0].name);
      setPredictions([]);

    }
  };
  const onpredict = async e => {
    if (imageurl === null) {
      console.log("No Image Uploaded");
      // errmsg = (
      //   <div className="text-center" style={{ color: "white" }}>
      //     No Image Uploaded
      //   </div>
      // );
    } else {
      setPredicting(true);
      imgtotensor(imageurl).then((tensor,err)=>{
        // newtensors.push(tensor)
        if (err){
          console.log(err);
          
        }
        else{
        // if(mod)
          model.predict(tensor.expandDims().div(255)).print()
          model.predict(tensor.expandDims().div(255)).argMax(1).print()
          console.log(tensor.expandDims().toFloat().shape);
          setPredicting(false);
        }
      })
    }
  }
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
    // var newtensors=[]
    files.forEach(file => {
      var objurl=URL.createObjectURL(file)
      newurls.push(objurl)
      // var img=document.createElement('img')
      // img.setAttribute('width',"100")
      // img.setAttribute('height',"100")
      // img.setAttribute('src',objurl)
      // tf.browser.fromPixels(img).array().then(array => console.log(array));
      // const img = new Image();
      // img.src = objurl
      // img.width=28
      // img.height=28
      // img.onload = () => item.imagetensors=[...item.imagetensors,tf.browser.fromPixels(img).toFloat()];
      imgtotensor(objurl).then((tensor,err)=>{
        // newtensors.push(tensor)
        if (err){
          console.log(err);
          
        }
        else{
        item.imagetensors=[...item.imagetensors,tensor]
        }
      })
      
      // console.log(tf.browser.fromPixels(img).shape);
      
    });
    item.imageurls=[...item.imageurls,...newurls]
    
    remainingclasses.splice(index, 0, item);
    setTraindata(remainingclasses);
    // tf.browser.toPixels(traindata[0].imagetensors[0],document.getElementsByTagName("canvas")[0])
    // console.log(traindata)
    // traindata[0].imagetensors[0].print()
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
      <div className="row">
      <TrainingImagesUpload
        traindata={traindata}
        removeClass={removeClass}
        editclassname={editclassname}
        onupload={onupload}
      />
      <Training traindata={traindata} savemodel={savemodel} savedmodel={model}/>
      <div className="col-12 col-xs-4 col-lg-4 text-center mt-4" style={{ marginTop: "20px" }}>
        <div className="card bg-dark" style={{ borderRadius: "5px" }}>
            <img
              src={imageurl ? imageurl : imageupload_default}
              className="card-img-top"
              alt="..."
              id="predict"
              style={{ width: "100%", height: "30vh", objectFit: "cover" }}
            ></img>
            <div className="card-body text-center" style={{padding:"10px"}}>
              <label className="overflow-ellipsis btn btn-primary justify-content-center" style={{marginBottom:"0px"}}>
                <input
                  type="file"
                  name="photo"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={onchange}
                ></input>
                {imagename}
              </label>
            </div>
          </div>
          {predicting ? (
              <span>
                <CircularProgress style={{marginTop:"10px"}}/>
              </span>
            ) : (
            //   <button
            //   className="btn btn-danger"
            //   onClick={onpredict}
            //   style={{
            //     marginTop: "10px",
            //     backgroundColor: "#424242",
            //     borderRadius: "5px"
            //   }}
            // >
            //   Predict
            // </button>
            <Button
            className="mt-3"
            variant="outlined"
            color="secondary"
            onClick={e=>onpredict(e)}
            disabled={!model}
          >
            Predict
          </Button>
            )}
        </div>
      
      <div
        className="col-7 col-sm-5"
        style={{ margin: "auto", height: "250px", marginTop: "10px" }}
      >
        {/* {chartdata ? (
          <Bar
            data={chartdata.data}
            width={0.1}
            height={0.1}
            options={chartdata.options}
          />
        ) : null} */}
      </div>
      </div>
      
    </div>
  );
};
export default Owndata;
