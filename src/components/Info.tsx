import React, { useEffect, useState } from 'react';
import { fetchData } from '../utils';
import Button from '@material-ui/core/Button';
import ScannerWifi from './ScannerWifi';

const Info: React.FC = () => {
  const [wifiStatus, setWifiStatus] = useState('Not connected');
  const [localIP, setLocalIP] = useState('');
  const [freeMemory, setFreeMemory] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);

  const changeWifiStatus = () => {
    wifiStatus === 'Connected' ? setWifiStatus('Not connected') : setWifiStatus('Connected');
  };

  const updateData = () => {
    fetchData('freeMemory', 'freeMemory').then(setFreeMemory);
    fetchData('getData', 'data')
        .then(arr => arr.length ? JSON.parse(arr.pop()) : { temperature: 0, humidity: 0 })
        .then(data => {
            setTemperature(data.temperature);
            setHumidity(data.humidity);
        });
  };

  useEffect(() => {
    fetchData('localIP', 'wifiLocalIP').then(setLocalIP);
    updateData();
    let dataUpdating = setInterval(() => updateData(), 5 * 60 * 1000);

    return () => clearInterval(dataUpdating);
  }, []);

  return (
    <header>
      <div className='info-block'>
        <p>WiFi Status: { wifiStatus }</p>
        { wifiStatus === 'Connected' && <p>Your local IP: { localIP }</p> }
        { wifiStatus === 'Connected' ?
          <Button
            variant="contained"
            color="primary"
            onClick={ changeWifiStatus }
          >Disconnect</Button> : <ScannerWifi/>
        }
      </div>
      <div className='info-block'>
        <p>Temperature: { temperature }</p>
        <p>Humidity: { humidity }</p>
        <p>Free Memory: { freeMemory }</p>
        <div>
          <Button variant="contained" color="primary" onClick={ updateData }>Update</Button>
        </div>
      </div>
    </header>
  );
};

export default Info;
