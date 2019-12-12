import React, { useEffect, useState } from 'react';
import { fetchData } from '../utils';
import Button from '@material-ui/core/Button';

const ScannerWifi: React.FC = () => {
  const [wifiStatus, setWifiStatus] = useState('Not connected');
  const [networks, setNetworks] = useState([]);
  const [isRefreshButtonDisabled, setRefreshButtonDisabled] = useState(true);

  useEffect(() => {
    fetchData('statusWiFi', 'statusWiFi')
      .then(res => setWifiStatus(res === 'true' ? 'Connected' : 'Not connected'));
  }, []);

  useEffect(() => {
    if (wifiStatus !== 'Connected') {
        setTimeout(() => refreshWifi(), 2000);
    }
  }, [wifiStatus]);


  return (
      <div className='scanner'>
      { wifiStatus !== 'Connected' &&
      <Button variant="contained" color="primary" onClick={ refreshWifi } disabled={ isRefreshButtonDisabled }>Refresh</Button>
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

  function refreshWifi() {
    setRefreshButtonDisabled(true);
    fetchData('scannerWiFi', 'networks', setNetworks)
      .finally(() => setTimeout(() => setRefreshButtonDisabled(false), 1500));
  }
};

export default ScannerWifi;
