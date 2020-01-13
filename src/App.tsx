import React from 'react';

import Info from './components/Info';
import Measurements from './components/Measurements';
import ControlPanel from './components/ControlPanel';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Info/>
      {/*<Measurements/>*/}
      <ControlPanel/>
    </div>
  );
};

export default App;
