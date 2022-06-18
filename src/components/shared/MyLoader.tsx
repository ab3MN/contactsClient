import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import './MyLoader.scss';

export const MyLoader = () => (
  <div className='fallback'>
    <ThreeCircles
      color='blue'
      height={110}
      width={110}
      ariaLabel='three-circles-rotating'
      outerCircleColor='blue'
      middleCircleColor='green'
      innerCircleColor='red'
    />
  </div>
);
