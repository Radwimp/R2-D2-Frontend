import React, { useEffect, useState } from 'react';
import { Typography, Switch, FormControlLabel, TextField } from '@material-ui/core';
import { fetchData } from '../utils';

const ControlPanel: React.FC = () => {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [desiredTemperature, setDesiredTemperature] = useState(30);
  const [relayStatuses, setRelayStatuses] = useState([false, false]);
  const [autoMode, setAutoMode] = useState(true);

  const setMode = (auto: boolean) => {
    fetch('//192.168.0.104/setMode', {
      method: 'POST',
      body: JSON.stringify({ 'autoMode': auto })
    }).then(() => setAutoMode(auto));
  };

  const switchRelay = (id: number, enable: boolean) => {
    fetch('//192.168.0.104/switchRelay', {
      method: 'POST',
      body: JSON.stringify({ id, enable })
    }).then(() => id ? setRelayStatuses([relayStatuses[0], enable]) :
      setRelayStatuses([enable, relayStatuses[1]]));
  };

  const handleChangeDesiredTemperature = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesiredTemperature(+event.target.value);
  };

  const updateData = () => {
    fetchData('getData', 'data')
      .then(arr => arr.length ? JSON.parse(arr.pop()) : { temperature: 0, humidity: 0 })
      .then(data => {
        setTemperature(data.temperature);
        setHumidity(data.humidity);
      });
    fetchData('getRelayStatuses', 'statuses')
      .then(setRelayStatuses);
  };

  useEffect(() => {
    updateData();
    let dataUpdating = setInterval(() => updateData(), 3 * 60 * 1000);

    return () => clearInterval(dataUpdating);
  }, []);

  return (
    <div>
      <p>Temperature: { temperature }</p>
      <p>Humidity: { humidity }</p>
      <div className="control-panel info-block">
        <Typography>
          Manual
        </Typography>
        <FormControlLabel
          value="Mode"
          control={
            <Switch
              color="primary"
              checked={autoMode}
              onChange={() => setMode(!autoMode)}
            />}
          label="Mode"
          labelPlacement="top"
        />
        <Typography>
          Auto
        </Typography>
      </div>
      <div className="control-panel info-block">
        <FormControlLabel
          value="Relay 1"
          control={
            <Switch
              disabled={autoMode}
              color="primary"
              checked={relayStatuses[0]}
              onChange={(e) => switchRelay(0, !relayStatuses[0])}
            />}
          label="Relay 1"
          labelPlacement="top"
        />
        <FormControlLabel
          value="Relay 2"
          control={
            <Switch
              disabled={autoMode}
              color="primary"
              checked={relayStatuses[1]}
              onChange={(e) => switchRelay(1, !relayStatuses[1])}
            />}
          label="Relay 2"
          labelPlacement="top"
        />
        <TextField
          label="Desired Temperature"
          type="number"
          variant="outlined"
          size="small"
          value={desiredTemperature}
          onChange={handleChangeDesiredTemperature}
          disabled={!autoMode}
        />
      </div>
    </div>
  );
};

export default ControlPanel;
