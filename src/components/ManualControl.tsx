import React, { useEffect, useState } from 'react';
import { Switch, FormControlLabel, TextField } from '@material-ui/core';
import { fetchData, post } from '../utils';

const ManualControl: React.FC = () => {
  const [relayStatuses, setRelayStatuses] = useState([false, false]);
  const [updateInterval, setUpdateInterval] = useState(180);
  const [enabledInterval, setEnabledInterval] = useState(10);
  const [disabledInterval, setDisabledInterval] = useState(300);

  const switchRelay = (id: number, enable: boolean) => {
    post('switchRelay', { id, enable })
      .then(() => id ? setRelayStatuses([relayStatuses[0], enable]) :
        setRelayStatuses([enable, relayStatuses[1]]));
  };

  const updateData = () => {
    fetchData('getRelayStatuses', 'statuses')
      .then(setRelayStatuses);
    // fetchData('getIntervals', 'intervals')
    //   .then((intervals) => {
    //     setUpdateInterval(intervals.update);
    //     setEnabledInterval(intervals.enabled);
    //     setDisabledInterval(intervals.disabled);
    //   });
  };

  useEffect(() => {
    updateData();
  }, []);

  useEffect(() => {
    post('setIntervals', {
      update: updateInterval,
      enabled: enabledInterval,
      disabled: disabledInterval
    }).finally();
  }, [updateInterval, enabledInterval, disabledInterval]);

  return (
    <div>
      <div className="info-block manual-control">
        <FormControlLabel
          value="Bottom Heating"
          control={
            <Switch
              color="primary"
              checked={relayStatuses[0]}
              onChange={(e) => switchRelay(0, !relayStatuses[0])}
            />}
          label="Bottom Heating"
          labelPlacement="top"
        />
        <FormControlLabel
          value="Side Heating"
          control={
            <Switch
              color="primary"
              checked={relayStatuses[1]}
              onChange={(e) => switchRelay(1, !relayStatuses[1])}
            />}
          label="Side Heating"
          labelPlacement="top"
        />
      </div>
      <div className="info-block manual-control">
        <div className="input">
          <TextField
            label="Update interval"
            type="number"
            variant="outlined"
            size="small"
            value={updateInterval}
            onChange={(e) => setUpdateInterval(+e.target.value)}
          />
        </div>
        <div className="input">
          <TextField
            label="Enabled interval"
            type="number"
            variant="outlined"
            size="small"
            value={enabledInterval}
            onChange={(e) => setEnabledInterval(+e.target.value)}
          />
        </div>
        <div className="input">
          <TextField
            label="Disabled interval"
            type="number"
            variant="outlined"
            size="small"
            value={disabledInterval}
            onChange={(e) => setDisabledInterval(+e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ManualControl;
