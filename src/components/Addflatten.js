import React, { useState } from "react";
import { Button, TextField,makeStyles, MenuItem,InputLabel,Select } from "@material-ui/core";
import * as tf from "@tensorflow/tfjs";
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
const Addflatten=({ownmodel,setomodel})=>{
    const [name,setName]=useState('')
    const classstyle = useStyles();
    const addtomodel = e => {
        var layer = name?tf.layers.flatten({
          name: name
        }):tf.layers.flatten({
        })
        setomodel([...ownmodel,layer])
      };
    return(
    <div className="row text-center mt-4">
    <div
      className="card text-white bg-dark col-10 m-auto"
      style={{ borderRadius: "10px", height: "200px" }}
    >
      <div className="card-header" style={{ fontSize: "20px" }}>
        Flatten2d
      </div>
      <div className="card-body m-auto mb-0">
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
            onClick={e=>addtomodel()}
          >
            ADD TO MODEL
          </Button>
        </div>
    </div>
  </div>
    )
}
export default Addflatten