import React, { useState } from "react";
import Add from "@material-ui/icons/Add";
import { Button, ButtonGroup, TextField, makeStyles } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

import Addconv2d from "./Addconv2d";
import Addpooling from "./Addpooling";
import Addflatten from "./Addflatten";
import Adddense from "./Adddense";
import * as tf from "@tensorflow/tfjs";
const Buildmodel = ({ ownmodel, setomodel }) => {
  const [conv, setConv] = useState(false);
  const [pool, setPool] = useState(false);
  const [flat, setFlat] = useState(false);
  const [dense, setDense] = useState(false);
  const modifyconv = e => {
    setConv(true);
    setPool(false);
    setFlat(false);
    setDense(false);
  };
  const modifypool = e => {
    setConv(false);
    setPool(true);
    setFlat(false);
    setDense(false);
  };
  const modifyflat = e => {
    setConv(false);
    setPool(false);
    setFlat(true);
    setDense(false);
  };
  const modifydense = e => {
    setConv(false);
    setPool(false);
    setFlat(false);
    setDense(true);
  };
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-8 m-auto text-center">
        <Alert severity="info" className="mb-4 mt-4">The first Convolution layer and last dense layer will be added dynamically based on input-shape and number of Classes respectively</Alert>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              startIcon={<Add />}
              onClick={e => {
                modifyconv(e);
              }}
            >
              Add conv2d
            </Button>
            <Button
              startIcon={<Add />}
              onClick={e => {
                modifypool(e);
              }}
            >
              Add Pooling
            </Button>
            <Button
              startIcon={<Add />}
              onClick={e => {
                modifyflat(e);
              }}
            >
              Add Flatten
            </Button>
            <Button
              startIcon={<Add />}
              onClick={e => {
                modifydense(e);
              }}
            >
              Add Dense
            </Button>
          </ButtonGroup>
        </div>
      </div>
      {conv && <Addconv2d ownmodel={ownmodel} setomodel={setomodel} />}
      {pool && <Addpooling ownmodel={ownmodel} setomodel={setomodel} />}
      {flat && <Addflatten ownmodel={ownmodel} setomodel={setomodel} />}
      {dense && <Adddense ownmodel={ownmodel} setomodel={setomodel} />}
      {/* <Adddense ownmodel={ownmodel} setomodel={setomodel} /> */}
     
    </div>
  );
};
export default Buildmodel;
