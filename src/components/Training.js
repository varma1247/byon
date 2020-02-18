import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GetApp from "@material-ui/icons/GetApp";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  tcolor: {
    color: "white",
    fontSize: "15px"
  }
}));
const Training = ({ traindata, savemodel, savedmodel, setlabelnames,ownmodel}) => {
  const classstyle = useStyles();
  const [epochs, setEpochs] = useState(100);
  const [alpha, setAlpha] = useState(0.1);
  const [batchsize, setBatchsize] = useState(10);
  const [empty, setEmpty] = useState(false);
  const onepochChange = e => {
    setEpochs(e.target.value);
  };
  const onalphaChange = e => {
    setAlpha(e.target.value);
  };
  const exportmodel = async () => {
    await savedmodel.save("downloads://my-model");
  };
  const onbsizeChange = e => {
    setBatchsize(e.target.value);
  };
  const train = async data => {
    if (
      traindata[0].imagetensors.length === 0 ||
      traindata.length === 1 ||
      traindata[1].imagetensors.length === 0
    ) {
      setEmpty(true);
    } else {
      tfvis.visor().open();
      setEmpty(false);
      // tf.browser.toPixels(traindata[0].imagetensors[0].div(255),document.getElementsByTagName("canvas")[0])
      var [tensors, labels] = tf.tidy(() => {
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
        setlabelnames(labelnames);
        return [tensors, labels, labelnames];
      });
      
      var [X_train, y_train] = tf.tidy(() => {
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
        return [
          tf.stack(tensors).div(255),
          tf.oneHot(labels, traindata.length)
        ];
      });
      console.log(labels);
      const newmodel=tf.sequential()
      newmodel.add( tf.layers.conv2d({
        inputShape: traindata[0].imagetensors[0].shape,
        kernelSize: 3,
        filters: 16,
        name: "conv1",
        activation: "relu",
        padding: "same"
      }))
      ownmodel.forEach(o => {
        newmodel.add(o)
      });
      var model = ownmodel.length>0?newmodel:tf.sequential({
        layers: [
          tf.layers.conv2d({
            inputShape: traindata[0].imagetensors[0].shape,
            kernelSize: 3,
            filters: 16,
            name: "conv1",
            activation: "relu",
            padding: "same"
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
    
        ]
      });
      model.add( tf.layers.dense({
        units: traindata.length,
        activation: "softmax",
        name: "dense2"
      }))
      model.compile({
        loss: "categoricalCrossentropy",
        optimizer: tf.train.sgd(alpha),
        metrics: ["accuracy"]
      });

      X_train.array().then(a => {
        console.log(a);
      });
      var epochLogs = [];
      const callbacks = {
        onTrainEnd: logs => {
          const surface = {
            name: "Summary",
            tab: "Model Summary"
          };
          tfvis.show.modelSummary(surface, model);
        },
        onEpochEnd: function(epoch, log) {
          const surface = tfvis.visor().surface({
            name: "Accuracy",
            tab: "Loss and Accuracy"
          });
          const surface2 = tfvis.visor().surface({
            name: "Loss",
            tab: "Loss and Accuracy"
          });
          const options = {
            xLabel: "Epoch",
            yLabel: "Value",
            seriesColors: ["lightseagreen"],
            height: 250,
            zoomToFit: false
          }; // Prep the data
          const options2 = {
            xLabel: "Epoch",
            yLabel: "Value",
            seriesColors: ["tomato"],
            height: 250,
            zoomToFit: false
          }; // Prep the data

          epochLogs.push(log);
          const acc = epochLogs.map((log, i) => ({
            x: i,
            y: log.acc
          }));
          const loss = epochLogs.map((log, i) => ({
            x: i,
            y: log.loss
          }));
          const data = {
            values: [acc],
            // Custom names for the series
            series: ["Acc"] // render the chart
          };
          const data2 = {
            values: [loss],
            // Custom names for the series
            series: ["Loss"] // render the chart
          };
          console.log(model.getWeights("conv1")[0].shape);

          // tf.unstack(model.getLayer("conv1").getWeights()[0], -1).forEach(
          //   async tensor => {
          //     // var temptensor=tensor.add(tensor).div(2)
          //     tensor = tf.image.resizeNearestNeighbor(
          //       tensor
          //         .abs()
          //         .add(tensor)
          //         .div(2),
          //       [50, 50]
          //     );
          //     const canvas = document.createElement("canvas");
          //     canvas.width = 50;
          //     canvas.height = 50;
          //     canvas.style = "margin: 4px;";
          //     await tf.browser.toPixels(tensor, canvas);
          //     allcanvas.push(canvas)
          //     // drawArea.appendChild(canvas);
          //   }
          // );
          tfvis.render.linechart(surface2, data2, options2);
          tfvis.render.linechart(surface, data, options);

          // tfvis.render.linechart(surface1, data2, options2);
        }
      };

      await model.fit(X_train, y_train, {
        batchSize: batchsize,
        epochs: epochs,
        callbacks: callbacks
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
    <>
      <div
        className="col-10 col-sm-4 col-md-2 text-center card bg-dark mt-4"
        style={{ borderRadius: "10px", height: "60%", margin: "0px auto" }}
      >
        <h5 className="card-header">
        
            <Button
              variant="contained"
              color="default"
              style={{ verticalAlign: "middle" }}
              onClick={e => train(traindata)}
            >
              TRAIN
            </Button>
        </h5>
        <div className="card-body">
          <TextField
            className="mt-3"
            id="outlined-basic"
            label="Epochs:"
            type="number"
            InputProps={{
              className: classstyle.tcolor
            }}
            InputLabelProps={{
              style: {
                color: "white",
                fontSize: "20px"
              }
            }}
            variant="outlined"
            onChange={e => {
              onepochChange(e);
            }}
            value={epochs}
          />
          <TextField
            className="mt-4"
            id="outlined-basic"
            label="Alpha:"
            type="number"
            InputProps={{
              className: classstyle.tcolor
            }}
            InputLabelProps={{
              style: {
                color: "white",
                fontSize: "20px"
              }
            }}
            variant="outlined"
            onChange={e => {
              onalphaChange(e);
            }}
            value={alpha}
          />
          <TextField
            className="mt-4"
            id="outlined-basic"
            label="BatchSize:"
            type="number"
            InputProps={{
              className: classstyle.tcolor
            }}
            InputLabelProps={{
              style: {
                color: "white",
                fontSize: "20px"
              }
            }}
            variant="outlined"
            onChange={e => {
              onbsizeChange(e);
            }}
            value={batchsize}
          />

          {/* <input type="text" value=""></input>
        <TextField id="outlined-basic" label="LearningRate:" variant="outlined"/>
        <TextField id="outlined-basic" label="BatchSize" variant="outlined"/> */}
        </div>
        {empty ? (
          <div
            className="text-center"
            style={{ color: "red", fontSize: "20px" }}
          >
            Upload alteast two classes of images and one image in each class to
            start training
          </div>
        ) : null}
        {savedmodel ? (
          <Button
            className="mb-4"
            variant="contained"
            color="primary"
            startIcon={<GetApp />}
            onClick={e => {
              exportmodel();
            }}
          >
            Export Model
          </Button>
        ) : null}
      </div>
    </>
  );
};
export default Training;
