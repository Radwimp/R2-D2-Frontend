import React, { useEffect, useState } from 'react';
import { fetchData } from '../utils';
import Button from '@material-ui/core/Button';
import ScannerWifi from './ScannerWifi';

const Info: React.FC = () => {
  const [wifiStatus, setWifiStatus] = useState('Not connected');
  const [localIP, setLocalIP] = useState('');
  const [freeMemory, setFreeMemory] = useState(0);

  const changeWifiStatus = () => {
    wifiStatus === 'Connected' ? setWifiStatus('Not connected') : setWifiStatus('Connected');
  };

  const updateData = () => {
    fetchData('freeMemory', 'freeMemory').then(setFreeMemory);
  };

  useEffect(() => {
    fetchData('localIP', 'wifiLocalIP').then(setLocalIP);
    updateData();
  }, []);

  return (
    <header>
      <div className='info-block'>
        <p>WiFi Status: { wifiStatus }</p>
        { wifiStatus === 'Connected' && <p>Your local IP: { localIP }</p> }
        { wifiStatus === 'Connected' ?
          <div className="inline-button">
            <div>123</div>
            <Button
              variant="contained"
              color="primary"
              onClick={ changeWifiStatus }
            >
              Disconnect
            </Button>
          </div> : <ScannerWifi/>
        }
      </div>
      <div className='info-block'>
        <p>Free Memory: { freeMemory }</p>
        <div className="inline-button">
          <Button variant="contained" color="primary" onClick={ updateData }>Update</Button>
        </div>
      </div>
    </header>
  );
};

export default Info;
