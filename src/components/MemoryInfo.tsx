import React, { useEffect, useState } from 'react';
import { fetchData } from '../utils';

const MemoryInfo: React.FC = () => {
  const [freeMemory, setFreeMemory] = useState('');

  useEffect(() => {
    fetchData('freeMemory', 'freeMemory')
      .then(res => setFreeMemory(res))
  }, []);

  return (
    <header>
      <div>
        <p>Free Memory: { freeMemory }</p>
        <button onClick={ () => fetchData('freeMemory', 'freeMemory')
          .then(res => setFreeMemory(res)) }>Update</button>
      </div>
    </header>
  );
};

export default MemoryInfo;
