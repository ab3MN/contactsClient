import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import './MyLoader.scss';

export const MyLoader = () => {
  const [isLoading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    !isLoading &&
      setTimeout(() => {
        setLoading(true);
      }, 2000);
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="fallback">
          <ThreeCircles
            color="blue"
            height={110}
            width={110}
            ariaLabel="three-circles-rotating"
            outerCircleColor="blue"
            middleCircleColor="green"
            innerCircleColor="red"
          />
        </div>
      )}
    </>
  );
};
