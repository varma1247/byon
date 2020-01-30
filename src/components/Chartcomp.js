import React, { Fragment } from "react";
import {Doughnut} from "react-chartjs-2"
const Chartcomp = ({ predictions }) => {
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
  var total=1
  predictions.forEach(pred => {
    total-=(pred.probability)
  });
  predictions.push({className:"Other",probability:total})
  predictions.forEach(pred=>{
      colours.push(getRandomColor())
      data.push((pred.probability*100).toFixed(2))
      labels.push(pred.classNames)
  })  
  var datasets= {
    data: data,
    backgroundColor: colours,
    label: labels,


}
  return (
    <div
      style={{width:"30%",height:"30vh",margin: "auto"}}
      className="text-center"
      id="chartdiv"
    >
      <Doughnut data={datasets}/>
    </div>
  );
};
export default Chartcomp;