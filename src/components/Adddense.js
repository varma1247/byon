import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import {
  Button,
  TextField,
  makeStyles,
  MenuItem,
  InputLabel,
  Select
} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
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
const Adddense = ({ ownmodel, setomodel }) => {
  const [units, setUnits] = useState(32);
  const [name, setName] = useState("");
  const classstyle = useStyles();
  const addtomodel = e => {
    var layer = name
      ? tf.layers.dense({
          units: units,
          name: name,
          activation: "relu"
        })
      : tf.layers.dense({
          units: units,
          activation: "relu"
        });
    setomodel([...ownmodel, layer]);
  };
  return (
    <div className="row text-center mt-4">
      <div
        className="card text-white bg-dark col-10 m-auto"
        style={{ borderRadius: "10px", height: "200px" }}
      >
        <div className="card-header" style={{ fontSize: "20px" }}>
          Dense
        </div>
        <div className="card-body m-auto">
          <TextField
            className="mr-3"
            id="outlined-basic"
            label="Units"
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
              setUnits(e.target.value);
            }}
            value={units}
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
            onClick={e=>addtomodel(e)}
          >
            ADD TO MODEL
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Adddense;
