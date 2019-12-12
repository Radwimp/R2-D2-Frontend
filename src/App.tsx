import React from 'react';

import MemoryInfo from './components/MemoryInfo';
import Measurements from './components/Measurements';

const App: React.FC = () => {
  return (
    <div className='App'>
      <MemoryInfo/>
      <Measurements/>
    </div>
  );
};

export default App;
