import React, { useState } from 'react';
import { Typography, Switch, FormControlLabel } from '@material-ui/core';

const ControlPanel: React.FC = () => {
  const [relay0, setRelay0] = useState(false);
  const [relay1, setRelay1] = useState(false);
  const [autoMode, setAutoMode] = useState(true);

  const switchRelay = (id: number, enable?: boolean) => {
    fetch('//192.168.0.104/switchRelay', {
      method: 'POST',
      body: JSON.stringify({ id, 'enable': enable || id ? !relay1 : !relay0 })  })
      .then(() => id ? setRelay1(!relay1) : setRelay0(!relay0));
  };



  return (
    <div>
      <div>
        <Typography>
          Manual
        </Typography>
        <FormControlLabel
          value="Mode"
          control={
            <Switch
              color="primary"
              checked={autoMode}
              onChange={() => setAutoMode(prevState => !prevState)}
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
              color="primary"
              checked={relay0}
              onChange={() => switchRelay(0)}
            />}
          label="Relay 1"
          labelPlacement="top"
        />
        <FormControlLabel
          value="Relay 2"
          control={
            <Switch
              color="primary"
              checked={relay1}
              onChange={() => switchRelay(1)}
            />}
          label="Relay 2"
          labelPlacement="top"
        />

      </div>
    </div>
  );
};

export default ControlPanel;
