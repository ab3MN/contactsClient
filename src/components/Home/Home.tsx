import React from 'react';
import News from '../News/News';
import Quotes from '../Quotes/Quotes';
import Weather from '../Weather/Weather';
import './Home.scss';

const Home = () => {
  return (
    <section className="home">
      <Quotes />
      <Weather />
      <News />
    </section>
  );
};

export default Home;
