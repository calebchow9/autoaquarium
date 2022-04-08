import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
  // variables
  const apiURL = "http://localhost:4000";

  // hooks
  const [selectedProfile, setSelectedProfile] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [temps, setTemps] = useState([]);
  const [pHs, setpHs] = useState([]);
  const [conds, setConds] = useState([]);
  const [times, setTimes] = useState([]);

  // constraints
  const [tempLow, setTempLow] = useState(null);
  const [tempHigh, setTempHigh] = useState(null);
  const [pHLow, setpHLow] = useState(null);
  const [pHHigh, setpHHigh] = useState(null);
  const [condLow, setCondLow] = useState(null);
  const [condHigh, setCondHigh] = useState(null);

  const handleSelectedProfile = (event) => {
    setSelectedProfile(event.target.value);

    // update chart high/lows
    getProfile(event.target.value);
  };

  useEffect(() => {
    getProfiles();
    getData();
  }, []);

  const getProfiles = () => {
    axios.get(`${apiURL}/profile`).then((res) => {
      setProfiles(res.data);
    });
  };

  const getData = () => {
    axios.get(`${apiURL}/data10`).then((res) => {
      res.data.forEach((dataObj) => {
        const date = new Date(dataObj.timestamp);
        setTimes((oldTimes) => [
          `${date.getHours()}:${date.getMinutes()}`,
          ...oldTimes,
        ]);
        setTemps((oldTemp) => [dataObj.temp, ...oldTemp]);
        setpHs((oldpHs) => [dataObj.pH, ...oldpHs]);
        setConds((oldConds) => [dataObj.cond, ...oldConds]);
      });
    });
  };

  const getProfile = (id) => {
    axios.get(`${apiURL}/profile/${id}`).then((res) => {
      setTempLow(res.data.tempLow);
      setTempHigh(res.data.tempHigh);
      setpHLow(res.data.phLow);
      setpHHigh(res.data.phHigh);
      setCondLow(res.data.condLow);
      setCondHigh(res.data.condHigh);
    });
  };

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
    labels: times ? [...times] : null,
    datasets: [
      {
        label: "Temperature",
        data: temps ? [...temps] : null,
        borderColor: ["#eb596e"],
        backgroundColor: ["#ff577f45"],
        pointBackgroundColor: "#ec4646",
        pointBorderColor: "#ec4646",
        fill: false,
      },
      {
        label: "Min",
        data: Array(3).fill(tempLow),
        fill: false,
        backgroundColor: "#90EE90",
        borderColor: "#DDDDDD",
      },
      {
        label: "Max",
        data: Array(3).fill(tempHigh),
        fill: "-1",
        backgroundColor: "#90EE90",
        borderColor: "#DDDDDD",
      },
    ],
  };

  const pHData = {
    labels: times ? [...times] : null,
    datasets: [
      {
        label: "pH",
        data: pHs ? [...pHs] : null,
        borderColor: ["#2986cc"],
        backgroundColor: ["#ff577f45"],
        pointBackgroundColor: "#2986cc",
        pointBorderColor: "#2986cc",
        fill: false,
      },
      {
        label: "Min",
        data: Array(3).fill(pHLow),
        fill: false,
        backgroundColor: "#90EE90",
        borderColor: "#DDDDDD",
      },
      {
        label: "Max",
        data: Array(3).fill(pHHigh),
        fill: "-1",
        backgroundColor: "#90EE90",
        borderColor: "#DDDDDD",
      },
    ],
  };

  const condData = {
    labels: times ? [...times] : null,
    datasets: [
      {
        label: "pH",
        data: conds ? [...conds] : null,
        borderColor: ["#b4a7d6"],
        backgroundColor: ["#ff577f45"],
        pointBackgroundColor: "#b4a7d6",
        pointBorderColor: "#b4a7d6",
        fill: false,
      },
      {
        label: "Min",
        data: Array(3).fill(condLow),
        fill: false,
        backgroundColor: "#90EE90",
        borderColor: "#DDDDDD",
      },
      {
        label: "Max",
        data: Array(3).fill(condHigh),
        fill: "-1",
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
      alignItems: "center",
    },
    charts: {
      marginLeft: "15%",
      marginRight: "15%",
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.page}>
      <h1>Auto Aquarium</h1>

      <div className={classes.profiles}>
        <div>
          <InputLabel id="profile-select-label">Profile</InputLabel>
          <Select
            labelId="profile-select-label"
            id="profile-select"
            value={selectedProfile}
            displayEmpty
            label="Profile"
            onChange={handleSelectedProfile}
          >
            {profiles &&
              profiles.map((profile) => {
                return (
                  <MenuItem value={profile._id} key={profile._id}>
                    {profile.name}
                  </MenuItem>
                );
              })}
          </Select>
        </div>
        <Link style={{ textDecoration: "none" }} to="/create">
          <Button style={{ height: "50px" }} variant="contained">
            +
          </Button>
        </Link>
      </div>

      <div className={classes.charts}>
        <div>
          <h2>Temperature (°C)</h2>
          <Line data={tempData} options={options} />
        </div>

        <div>
          <h2>pH</h2>
          <Line data={pHData} options={options} />
        </div>

        <div>
          <h2>Conductivity</h2>
          <Line data={condData} options={options} />
        </div>
      </div>
    </div>
  );
}

export default App;
