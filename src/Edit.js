import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { React, useState } from "react";

import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { makeStyles } from "@mui/styles";
Chart.register(...registerables);

function Edit() {
  const [value, setValue] = useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  const marks = [
    {
      value: 0,
      label: "0°C",
    },
    {
      value: 20,
      label: "20°C",
    },
    {
      value: 37,
      label: "37°C",
    },
    {
      value: 100,
      label: "100°C",
    },
  ];

  const dates = ["Jan", "Feb"];

  const tempList = [28, 29];

  const tempData = {
    labels: dates ? [...dates] : null,
    datasets: [
      {
        label: "Temperature",
        data: tempList ? [...tempList] : null,
        borderColor: ["#eb596e"],
        backgroundColor: ["#ff577f45"],
        pointBackgroundColor: "#ec4646",
        pointBorderColor: "#ec4646",
      },
    ],
  };

  const useStyles = makeStyles({});

  return (
    <div className="App">
      <Line data={tempData} />
      {/* <header className="App-header">
        <h1>Auto Aquarium</h1>
        <br></br>
        <Stack sx={{ height: 400 }} spacing={10} direction="row">
          <Slider
            aria-label="Temperature"
            orientation="vertical"
            getAriaValueText={valuetext}
            defaultValue={30}
          />
          <Slider
            aria-label="Temperature"
            orientation="vertical"
            defaultValue={30}
            disabled
          />
          <Slider
            getAriaLabel={() => "Temperature"}
            orientation="vertical"
            getAriaValueText={valuetext}
            defaultValue={[20, 37]}
            marks={marks}
          />
        </Stack>
        <div class="text" style={{ display: "flex" }}>
          <p style={{ paddingRight: "20px", paddingLeft: "20px" }}>
            Temperature
          </p>
          <p style={{ paddingRight: "20px", paddingLeft: "20px" }}>pH</p>
          <p style={{ paddingRight: "20px", paddingLeft: "20px" }}>
            Conductivity
          </p>
        </div>
      </header> */}
    </div>
  );
}

export default Edit;
