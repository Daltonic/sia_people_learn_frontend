import { useEffect, useState } from 'react';

const ProgressBar = ({ progress }: { progress: number }) => {
  const [style, setStyle] = useState({ width: '0%' });

  useEffect(() => {
    setStyle({ width: `${progress}%` });
  }, [progress]);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={style}></div>
    </div>
  );
};

export default ProgressBar;
