import React, { useEffect, useState } from 'react';
import { fetchData } from '../utils';
import Button from '@material-ui/core/Button';
import AlertDialogSlide from './AlertDialogSlide';

const MemoryInfo: React.FC = () => {
  const [wifiStatus, setWifiStatus] = useState('Not connected');
  const [localIP, setLocalIP] = useState('');
  const [freeMemory, setFreeMemory] = useState('');

  useEffect(() => {
    fetchData('localIP', 'wifiLocalIP', setLocalIP).finally();
    fetchData('freeMemory', 'freeMemory', setFreeMemory).finally();
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
          >Disconnect</Button> : <AlertDialogSlide/>
        }
      </div>
      <div className='info-block'>
        <p>Free Memory: { freeMemory }</p>
        <div>
          <Button variant="contained" color="primary" onClick={ () => fetchData('freeMemory', 'freeMemory', setFreeMemory) }>Update</Button>
        </div>
      </div>
    </header>
  );

  function changeWifiStatus() {
    wifiStatus === 'Connected' ? setWifiStatus('Not connected') : setWifiStatus('Connected');
  }
};

export default MemoryInfo;
