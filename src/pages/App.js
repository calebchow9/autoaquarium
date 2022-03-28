import { React, useEffect, useState } from "react";
import axios from "axios";

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
  const [selectedProfile, setSelectedProfile] = useState("");
  const [profiles, setProfiles] = useState([]);

  const handleSelectedProfile = (event) => {
    setSelectedProfile(event.target.value);

    // update chart high/lows
  };

  useEffect(() => {
    getProfiles();
  }, []);

  const getProfiles = () => {
    axios.get('http://localhost:4000/profile').then((res) => {
      setProfiles(res.data);
    })
  }

  const getProfile = (id) => {
    
  }

  console.log(selectedProfile)

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
            value={selectedProfile}
            label="Profile"
            onChange={handleSelectedProfile}
          >
            {profiles && profiles.map((profile) => {
              return <MenuItem value={profile._id} key={profile._id}>{profile.name}</MenuItem>
            })}
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
