import React, { useEffect, useState } from 'react';
import { Typography, Switch, FormControlLabel, TextField } from '@material-ui/core';
import { fetchData, post } from '../utils';
import ManualControl from './ManualControl';

const ControlPanel: React.FC = () => {
  const [desiredTemperature, setDesiredTemperature] = useState(30);
  const [autoMode, setAutoMode] = useState(false);
  const [temperature, setTemperature] = useState(0);

  const setMode = (auto: boolean) => {
    post('setMode', { 'autoMode': auto })
      .then(() => setAutoMode(auto));
  };

  const handleChangeDesiredTemperature = (temperature: number) => {
    post('handleChangeDesiredTemperature', { temperature })
      .then(() => setDesiredTemperature(temperature));
  };

  const updateData = () => {
    fetchData('getTemperature', 'temperature')
      .then(setTemperature);
  };

  useEffect(() => {
    updateData();
    let dataUpdating = setInterval(() => updateData(), 20 * 1000);

    return () => clearInterval(dataUpdating);
  }, []);

  return (
    <div>
      <Typography className="info-block">
        Temperature: {temperature}℃
      </Typography>
      <div className="control-panel info-block">
        <Typography style={{ color: autoMode ? 'dimgrey' : 'black' }}>
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
        <Typography style={{ color: autoMode ? 'black' : 'dimgrey' }}>
          Auto
        </Typography>
      </div>
      { autoMode ?
        <div className="control-panel info-block">
          <TextField
            label="Desired Temperature"
            type="number"
            variant="outlined"
            size="small"
            value={desiredTemperature}
            onChange={(e) => handleChangeDesiredTemperature(+e.target.value)}
          />
        </div> : <ManualControl />
      }
    </div>
  );
};

export default ControlPanel;
