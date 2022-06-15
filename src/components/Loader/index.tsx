import React from 'react';
import "./loader.scss";
import LinearProgress from '@material-ui/core/LinearProgress';

export default function Loader() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="loader-wrap">
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
}
    