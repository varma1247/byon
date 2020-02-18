import React, { useState } from "react";
import Add from "@material-ui/icons/Add";
import * as tf from "@tensorflow/tfjs";
import {
  Button,
  TextField,
  makeStyles,
  MenuItem,
  InputLabel,
  Select
} from "@material-ui/core";
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
const Addconv2d = ({ ownmodel, setomodel }) => {
  const [kernelsize, setKernersize] = useState(3);
  const [filters, setFilters] = useState(16);
  const [name, setName] = useState("");
  const classstyle = useStyles();
  const addtomodel = e => {
    var layer = name?tf.layers.conv2d({
      kernelSize: kernelsize,
      filters: filters,
      name: name,
      activation: "relu",
      padding: "same"
    }):tf.layers.conv2d({
      kernelSize: kernelsize,
      filters: filters,
      activation: "relu",
      padding: "same"
    })
    setomodel([...ownmodel,layer])
  };
  return (
    <div className="row text-center mt-4">
      <div
        className="card text-white bg-dark col-10 m-auto"
        style={{ borderRadius: "10px", height: "200px" }}
      >
        <div className="card-header" style={{ fontSize: "20px" }}>
          Conv2d
        </div>
        <div className="card-body m-auto">
          <TextField
            className="mr-3"
            id="outlined-basic"
            label="KernelSize"
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
              setKernersize(e.target.value);
            }}
            value={kernelsize}
          />
          <TextField
            className="mr-3"
            id="outlined-basic"
            label="Num of Filters:"
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
              setFilters(parseInt(e.target.value));
            }}
            value={filters}
          />
          <TextField
            className="mr-3"
            id="outlined-basic"
            label="Name:"
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
              setName(e.target.value);
            }}
            value={name}
          />
        </div>
        <div className="row text-center m-auto">
          <Button
            className="mb-4"
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={e => addtomodel(e)}
          >
            ADD TO MODEL
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Addconv2d;
