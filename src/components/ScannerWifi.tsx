import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import { fetchData } from '../utils';

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ScannerWifi() {
  const [open, setOpen] = React.useState(false);
  const [wifiStatus, setWifiStatus] = useState('Not connected');
  const [networks, setNetworks] = useState([]);
  const [isRefreshButtonDisabled, setRefreshButtonDisabled] = useState(true);

  const refreshWifi = () => {
    setRefreshButtonDisabled(true);
    fetchData('scanWiFi', 'networks').then(setNetworks)
      .finally(() => setTimeout(() => setRefreshButtonDisabled(false), 1500));
  };

  useEffect(() => {
    fetchData('statusWiFi', 'statusWiFi')
      .then(res => setWifiStatus(res === 'true' ? 'Connected' : 'Not connected'));
  }, []);

  // useEffect(() => {
  //   refreshWifi();
  //   if (wifiStatus !== 'Connected') {
  //     setTimeout(() => refreshWifi(), 3000);
  //   }
  // }, [wifiStatus]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="inline-button">
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Connect
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <span>Select network</span>
          <Button variant="contained" color="primary" onClick={ refreshWifi } disabled={ isRefreshButtonDisabled }>
            { isRefreshButtonDisabled ? <div className="scan-btn">Scanning <CircularProgress size={17} color={'secondary'}/></div> : 'Refresh' }
          </Button>
        </DialogTitle>
        <DialogContent>
          <div className='scanner'>
            <List component="nav" aria-label="main mailbox folders">
              { networks.map((network, i) => {
                return (
                  <ListItem button key={ i }>{ network }</ListItem>
                );
              })
              }
            </List>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
