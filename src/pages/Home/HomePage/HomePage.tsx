import React from 'react';
import quotes from '../quotes.json';
import { getRandomInt } from '../../../helpers/getRandomInt';

const HomePage = () => {
  const quote = quotes[getRandomInt(quotes.length) - 1];
  return (
    <>
      {quote && (
        <section>
          <h4>{quote.text}</h4>
          <h5>{quote.from}</h5>
        </section>
      )}
    </>
  );
};

export default HomePage;
