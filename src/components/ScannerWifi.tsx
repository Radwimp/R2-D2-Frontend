import React, { useEffect, useState } from 'react';
import { fetchData } from '../utils';

const ScannerWifi: React.FC = () => {
  const [wifiStatus, setWifiStatus] = useState('Not connected');
  const [networks, setNetworks] = useState([]);
  const [localIP, setLocalIP] = useState('');
  const [isRefreshButtonDisabled, setRefreshButtonDisabled] = useState(false);

  useEffect(() => {
    fetchData('statusWiFi', 'statusWiFi')
      .then(res => setWifiStatus(res === 'true' ? 'Connected' : 'Not connected'));
  }, []);

  useEffect(() => {
    fetchData('localIP', 'wifiLocalIP')
      .then(res => setLocalIP(res));
    if (wifiStatus !== 'Connected') {
        setTimeout(() => {
          fetchData('scannerWiFi', 'networks')
            .then(res => setNetworks(res));
      }, 2000);
    }
  }, [wifiStatus]);


  return (
      <div key={123}>
      <p>WiFi Status: { wifiStatus }</p>
      { wifiStatus === 'Connected' && <p>Your local IP: { localIP }</p> }
      <button onClick={ changeWifiStatus }>
        { wifiStatus === 'Connected' ? 'Disconnect' : 'Connect' }
      </button>
      { wifiStatus !== 'Connected' &&
      <button onClick={ refreshWifi } disabled={ isRefreshButtonDisabled }>Refresh</button>
      }
      { wifiStatus !== 'Connected' &&
      networks.map((network) => {
        return (
          <p key={ network }>{ network }</p>
        );
      })
      }
    </div>
  );

  function changeWifiStatus() {
    wifiStatus === 'Connected' ? setWifiStatus('Not connected') : setWifiStatus('Connected');
  }

  function refreshWifi() {
    setRefreshButtonDisabled(true);
    setTimeout(() => setRefreshButtonDisabled(false), 3000);
    fetchData('scannerWiFi', 'networks')
      .then(res => setNetworks(res));
  }
};

export default ScannerWifi;
