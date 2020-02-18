import React from "react";
import Close from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import imageupload from "../images/upload.png";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  tcolor: {
    color: "white",
    fontSize: "20px"
  }
}));
const Classes = ({ classname, removeClass, id, editclassname,onupload,imageurls }) => {
//   console.log(classname.key);
  const classstyle = useStyles();
  return (
    <div
      className="card text-white bg-dark mb-3 col-9"
      style={{ borderRadius: "10px", height: "220px" }}
    >
      <div className="card-header" style={{ fontSize: "20px" }}>
        <TextField
          className="float-left"
          id="standard-textarea"
          placeholder={classname}
          InputProps={{
            className: classstyle.tcolor
          }}
          onChange={(e)=>{
              editclassname(id,e.target.value)
          }}
        />
        {/* <Edit style={{cursor:"pointer"}} onClick={()=>editclassname(id)}/> */}
        <Close
          className="float-right"
          style={{ cursor: "pointer" }}
          onClick={() => removeClass(id)}
        />
      </div>
      <div className="card-body row" style={{ overflowX: "scroll" }}>
        <label
          className="overflow-ellipsis btn btn-primary align-self-center mr-4 mt-3"
          style={{
            marginBottom: "0px",
            width: "90px",
            height: "80px",
            backgroundColor: "#302C2C",
            borderRadius: "10px"
          }}
        >
          <input
            type="file"
            name="photo"
            style={{ display: "none" }}
            accept="image/*"
            multiple
            onChange={e=>{
                var allfiles=[]
                for (const file of e.target.files) {
                    allfiles.push(file)
                }
                onupload(id,allfiles)
            }}
          ></input>
          {/* {imagename} */}
          <img
            src={imageupload}
            style={{ width: "100%", height: "100%" }}
            alt=""
          ></img>
        </label>
        {
            imageurls.map((imgurl,index)=>{
                return <img className="align-self-center mr-4 mt-3"
                style={{
                  marginBottom: "0px",
                  width: "90px",
                  height: "80px",
                  backgroundColor: "#302C2C",
                  borderRadius: "10px"
                }} src={imgurl} key={index} alt=""></img>
            })
        }
      </div>
    </div>
  );
};
export default Classes;
