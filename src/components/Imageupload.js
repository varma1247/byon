import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
// import "@tensorflow/tfjs-node"
import React, { useState } from "react";
import imageupload_default from "../images/uploadimage_default.jpg";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Bar } from "react-chartjs-2";
import { defaults } from "react-chartjs-2";
defaults.global.defaultFontColor = "white";
const Imageupload = () => {
  const [imageurl, setImageurl] = useState(null);
  const [imagename, setImagename] = useState("Upload");
  const [predictions, setPredictions] = useState([]);
  const [predicting, setPredicting] = useState(false);
  const [chartdata, setChartdata] = useState(null);
  var errmsg = null;
    console.log(predictions);

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
      errmsg = (
        <div className="text-center" style={{ color: "white" }}>
          No Image Uploaded
        </div>
      );
    } else {
      setPredicting(true);
      const predictimg = document.getElementById("predict");
      // console.log(tf.browser.fromPixels(predictimg).print())
      var imgdata=tf.browser.fromPixels(predictimg)
      console.log(imgdata);
      tf.browser.toPixels(imgdata).then(d=>{console.log(d);
      })
      imgdata=tf.image.resizeNearestNeighbor(imgdata,[224,224])
      
      
      imgdata.array().then(d=>console.log(d));
      // document.getElementById("tr").setAttribute("src","jgjh")
      // imgdata.array().then(d=>console.log(d))
      const model = await mobilenet.load();
      const predictions = await model.classify(predictimg);
      console.log(predictions);
      // model.layers[0].getWeights().print();
      setImagename("Upload");
      setPredicting(false);
      setPredictions(predictions);
      function getRandomColor() {
        var characters = "0123456789ABCDEF";
        var color = "#";

        for (var i = 0; i < 6; i++) {
          color += characters[getRandomNumber(0, 15)];
        }

        return color;
      }

      function getRandomNumber(low, high) {
        var r = Math.floor(Math.random() * (high - low + 1)) + low;
        return r;
      }
      var colours = [];
      var data = [];
      var labels = [];
      var total = 1;
      predictions.forEach(pred => {
        total -= pred.probability;
      });
      predictions.push({ className: "Other", probability: total });
      predictions.forEach(pred => {
        colours.push(getRandomColor());
        data.push((pred.probability * 100).toFixed(4));
        labels.push(pred.className.split(",")[0].toUpperCase());
      });
      setChartdata({
        data: {
          labels: labels,
          datasets: [
            {
              label: "Predictions",
              data: data,
              backgroundColor: colours
            }
          ]
        },
        options: {
          legend: {
            display: true,
            labels:{
              boxWidth:0
            }

          }
        }
      });
    }
  };
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-8 col-xs-4 col-lg-5 text-center" style={{ marginTop: "20px" }}>
          <div className="card bg-dark" style={{ borderRadius: "5px" }}>
            <img
              src={imageurl ? imageurl : imageupload_default}
              className="card-img-top"
              alt="..."
              id="predict"
              style={{ width: "100%", height: "30vh", objectFit: "cover" }}
            />
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
              <button
              className="btn btn-danger"
              onClick={onpredict}
              style={{
                marginTop: "10px",
                backgroundColor: "#424242",
                borderRadius: "5px"
              }}
            >
              Predict
            </button>
            )}
        </div>
      </div>
      <div className="justify-content-center">{errmsg}</div>
      <div
        className="col-7 col-sm-5"
        style={{ margin: "auto", height: "250px", marginTop: "10px" }}
      >
        {chartdata ? (
          <Bar
            data={chartdata.data}
            width={0.1}
            height={0.1}
            options={chartdata.options}
          />
        ) : null}
      </div>
    </div>
  );
};
export default Imageupload;
