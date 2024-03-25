import {useEffect, useState} from 'react';

export const useStopwatch = (startTimestamp = Date.now()) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTimestamp;
      setElapsedTime(elapsed);
    }, 1); // Update every millisecond

    return () => clearInterval(interval);
  }, [ startTimestamp ]);

  return elapsedTime;
};

