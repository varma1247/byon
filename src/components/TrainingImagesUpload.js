import React, { useState } from "react";
import Close from "@material-ui/icons/Close";
import Classes from "./Classes";
const TrainingImagesUpload = ({ traindata }) => {
  return (
    <div
      className="row col-12 col-sm-6 mt-4 justify-content-center"
      style={{ height: "70vh", overflowY: "scroll" }}
    >
      {traindata.map((classes, index) => {
        return (
          <Classes classname={classes.class} key={classes.id}/>
        );
      })}
    </div>
  );
};
export default TrainingImagesUpload;
