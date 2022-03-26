import { React, useState } from "react";

// Material UI
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

// Charting libraries
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

function App() {
  const [profile, setProfile] = useState();

  const handleProfile = (event) => {
    setProfile(event.target.value);
  };

  const dates = ["Jan", "Feb", "Mar"];

  const tempList = [28, 33, 26];

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  };

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
        fill: false,
      },
      {
        label: "Min",
        data: [25, 25, 25],
        fill: "+1",
        backgroundColor: "#90EE90",
        borderColor: "#DDDDDD",
      },
      {
        label: "Max",
        data: [30, 30, 30],
        fill: true,
        backgroundColor: "#90EE90",
        borderColor: "#DDDDDD",
      },
    ],
  };

  const useStyles = makeStyles({
    page: {
      textAlign: "center",
    },
    profiles: {
      display: "flex",
      justifyContent: "center",
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.page}>
      <h1>Auto Aquarium</h1>
      <p>Status: </p>

      <div className={classes.profiles}>
        <div>
          <InputLabel id="profile-select-label">Profile</InputLabel>
          <Select
            labelId="profile-select-label"
            id="profile-select"
            value={profile}
            label="Profile"
            onChange={handleProfile}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
        <Button variant="contained">Edit</Button>
        <Button variant="contained">+</Button>
      </div>

      <h2>Temperature (°C)</h2>
      <Line data={tempData} options={options} />
    </div>
  );
}

export default App;
