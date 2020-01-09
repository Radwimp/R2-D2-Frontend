import React, { useEffect, useState } from 'react';
import { fetchData } from '../utils';

const Measurements: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData('getData', 'data')
      .then(setData);
  }, []);

  return (
    <div>
      { data.map((measurement: { timeStamp: string, statusInfo: string, humidity: string, temperatures: string }) => {
        return (
          <p key={ measurement.toString() }>{ measurement }</p>
        );
      }) }
    </div>
  );
};

export default Measurements;
