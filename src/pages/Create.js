import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import axios from "axios";

function Create() {
  let navigate = useNavigate();
  const apiURL = "http://auto-aquarium.herokuapp.com";

  const [name, setName] = useState("");
  const [temps, setTemps] = useState([20, 30]);
  const [pHs, setpHs] = useState([6, 7]);
  const [conds, setConds] = useState([0.15, 0.2]);

  const useStyles = makeStyles({
    page: {
      margin: "auto",
      width: "50%",
      textAlign: "center",
    },
    nameInput: {},
    tempSlider: {},
  });

  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleTemp = (e) => {
    e.preventDefault();
    setTemps(e.target.value);
  };

  const handlepHs = (e) => {
    e.preventDefault();
    setpHs(e.target.value);
  };

  const handleConds = (e) => {
    e.preventDefault();
    setConds(e.target.value);
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  const marks = [
    {
      value: -20,
      label: "-20°C",
    },
    {
      value: 60,
      label: "60°C",
    },
  ];

  const pHmarks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 14,
      label: "14",
    },
  ];

  const condmarks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 1,
      label: "1",
    },
  ];

  const sendData = (e) => {
    e.preventDefault();
    if (name && temps && conds && pHs) {
      const profileObj = {
        name,
        tempLow: temps[0],
        tempHigh: temps[1],
        phLow: pHs[0],
        phHigh: pHs[1],
        condLow: conds[0],
        condHigh: conds[1],
      };
      axios.post(`${apiURL}/profile`, profileObj).then((res) => {
        console.log(res);
      });
      navigate("/");
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.page}>
      <h1>Create a Profile</h1>
      <form onSubmit={sendData}>
        <p>Profile Name</p>
        <input
          className={classes.nameInput}
          type="text"
          id="name_input"
          value={name}
          onChange={handleName}
        />
        <br></br>
        <br></br>
        <br></br>
        <p>Temperature</p>
        <br></br>
        <Box sx={{ width: 700 }}>
          <Slider
            className={classes.tempSlider}
            getAriaLabel={() => "Temperature"}
            getAriaValueText={valuetext}
            valueLabelDisplay="on"
            defaultValue={[20, 30]}
            step={0.1}
            min={-20}
            max={60}
            onChange={handleTemp}
            marks={marks}
          />
        </Box>

        <p>pH</p>
        <br></br>
        <Box sx={{ width: 700 }}>
          <Slider
            className={classes.tempSlider}
            getAriaLabel={() => "Temperature"}
            getAriaValueText={valuetext}
            valueLabelDisplay="on"
            min={0}
            max={14}
            step={0.1}
            defaultValue={[6, 7]}
            onChange={handlepHs}
            marks={pHmarks}
          />
        </Box>

        <p>Conductivity</p>
        <br></br>
        <Box sx={{ width: 700 }}>
          <Slider
            className={classes.tempSlider}
            getAriaLabel={() => "Temperature"}
            getAriaValueText={valuetext}
            valueLabelDisplay="on"
            min={0}
            max={1}
            step={0.01}
            defaultValue={[0.15, 0.2]}
            onChange={handleConds}
            marks={condmarks}
          />
        </Box>

        <Link style={{ textDecoration: "none" }} to="/">
          <Button type="" color="secondary" variant="contained">
            Cancel
          </Button>
        </Link>
        <Button
          style={{ marginLeft: "10px" }}
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Create;
