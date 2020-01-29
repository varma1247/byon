import React, { Fragment } from "react";
const Predictioncomp = ({ predictions }) => {
  return (
    <div className="row justify-content-center">
      <div className="col-5">
        {predictions.map((prediction, index) => {
          let styles = {
            height: "30px",
            width: prediction.probability * 100 + "%",
            backgroundColor: "lightseagreen",
            marginTop: "5px",
            transition: "width 0.4s",
            borderRadius:"5px"
          };
          prediction.probability = (prediction.probability * 100).toFixed(2);
          return (
            <Fragment key={index}>
              <div className="justify-content-center"
                key={prediction.probability}
                style={{ color: "white" }}
              >
                {prediction.className.split(",")[0].toUpperCase() +
                  "  -  " +
                  prediction.probability +
                  " %"}
              </div>
              <div style={styles} key={index}></div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
export default Predictioncomp;
