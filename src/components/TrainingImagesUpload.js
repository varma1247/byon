import React from "react";
import Classes from "./Classes";
// import Training from "./Training"
const TrainingImagesUpload = ({ traindata,removeClass,editclassname,onupload }) => {
  return (
    <div
      className="row col-12 col-sm-6 mt-4 justify-content-center"
      style={{ height: "70vh", overflowY: "scroll" }}
    >
      {traindata.map((classes, index) => {
        return (
          <Classes classname={classes.class} key={classes.id} removeClass={removeClass} id={classes.id} editclassname={editclassname} onupload={onupload} imageurls={classes.imageurls}/>
        );
      })}
        {/* <Training/> */}
    </div>
  );
};
export default TrainingImagesUpload;
