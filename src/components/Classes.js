import React from "react";
import Close from "@material-ui/icons/Close";
import imageupload_default from "../images/uploadimage_default.jpg";
import imageupload from "../images/upload.png";
const Classes = ({classname}) => {
  return (
    <div
      className="card text-white bg-dark mb-3 col-10"
      style={{ borderRadius: "10px", height: "200px" }}
    >
      <div className="card-header" style={{ fontSize: "20px" }}>
        {classname}
        <Close className="float-right" style={{cursor:"pointer"}}/>
      </div>
      <div className="card-body row" style={{ overflowX: "scroll" }}>
        <label
          className="overflow-ellipsis btn btn-primary align-self-center mr-4"
          style={{ marginBottom: "0px", width: "90px", height: "80px" ,backgroundColor:"#302C2C",borderRadius:"10px"}}
        >
          <input
            type="file"
            name="photo"
            style={{ display: "none" }}
            accept="image/*"
            // onChange={onchange}
          ></input>
          {/* {imagename} */}
          <img
            src={imageupload}
            style={{ width: "100%", height: "100%" }}
          ></img>
        </label>
      </div>
    </div>
  );
};
export default Classes