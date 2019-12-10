import React from 'react';

import ScannerWifi from './components/ScannerWifi';
import MemoryInfo from './components/MemoryInfo';
import Measurements from './components/Measurements';

const App: React.FC = () => {
  return (
    <div className='App'>
      <MemoryInfo/>
      <ScannerWifi/>
      <Measurements/>
    </div>
  );
};

export default App;
