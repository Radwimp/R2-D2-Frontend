import React, { useEffect, useState } from 'react';
import { fetchData } from '../utils';
import Button from '@material-ui/core/Button';
import ScannerWifi from './ScannerWifi';

const MemoryInfo: React.FC = () => {
  const [wifiStatus, setWifiStatus] = useState('Not connected');
  const [localIP, setLocalIP] = useState('');
  const [freeMemory, setFreeMemory] = useState(0);

  const changeWifiStatus = () => {
    wifiStatus === 'Connected' ? setWifiStatus('Not connected') : setWifiStatus('Connected');
  };

  useEffect(() => {
    fetchData('localIP', 'wifiLocalIP').then(setLocalIP);
    fetchData('freeMemory', 'freeMemory').then(setFreeMemory);
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
        <p>Free Memory: { freeMemory }</p>
        <div>
          <Button variant="contained" color="primary" onClick={ () => fetchData('freeMemory', 'freeMemory').then(setFreeMemory) }>Update</Button>
        </div>
      </div>
    </header>
  );
};

export default MemoryInfo;
