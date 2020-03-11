import React from 'react';

import Info from './components/Info';
import ControlPanel from './components/ControlPanel';
import Measurements from './components/Measurements';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Info/>
      <ControlPanel/>
      <Measurements/>
    </div>
  );
};

export default App;
