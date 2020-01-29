import * as mobilenet from "@tensorflow-models/mobilenet";
import React, { useState } from "react";
import imageupload_default from "../images/uploadimage_default.png";
import Predictionscomp from "./Predictionscomp"
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    '& > * + *': {
      textAlign:"center" ,
    },
  },
}));

const Imageupload = () => {
  const [imageurl, setImageurl] = useState(null);
  const [imagename, setImagename] = useState("Upload");
  const [predictions, setPredictions] = useState([]);
  const [predicting, setPredicting] = useState(false);
  var errmsg=null
//   console.log(imageurl);

  const onchange = e => {
    setImageurl(URL.createObjectURL(e.target.files[0]));
    setImagename(e.target.files[0].name);
    setPredictions([])
  };
  const onpredict = async e => {
    if (imageurl === null) {
      console.log("No Image Uploaded");
      errmsg=<div className="text-center" style={{color:"white"}}>No Image Uploaded</div>
      
    } else {
      setPredicting(true);
      const predictimg = document.getElementById("predict");
      const model = await mobilenet.load();
      const predictions = await model.classify(predictimg);
      console.log(predictions);
      // model.layers[0].getWeights().print();
      
      setImagename("Upload");
      setPredicting(false);
      setPredictions(predictions)
    }
  };
  const classes = useStyles();
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-8 col-sm-4" style={{ marginTop: "20px" }}>
          <div className="card bg-dark" style={{ borderRadius: "5px" }}>
            <img
              src={imageurl ? imageurl : imageupload_default}
              className="card-img-top"
              alt="..."
              id="predict"
              style={{ width: "100%", height: "20vw", objectFit: "cover" }}
            />
            <div className="card-body">
              <label className="btn btn-primary justify-content-center">
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
          <button className="btn btn-danger" onClick={onpredict} style={{marginTop:"20px",backgroundColor:"#424242",borderRadius:"5px"}}>
            Predict
          </button>
        </div>
      </div>
      <div className="justify-content-center">
        {predicting && (
         <div className={classes.root}>
         <CircularProgress />
         
       </div>
        )}
        {errmsg}
      </div>
      {predictions.length!==0?(<Predictionscomp predictions={predictions}/>):null}
    </div>
  );
};
export default Imageupload;
