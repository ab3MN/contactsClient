import axios from 'axios';
import React from 'react';
import { getCurrentDay } from '../../helpers/getCurrentDay';

interface IQuote {
  text: String;
  from: String;
  _id: String;
}

const Home = () => {
  const [quote, setQuote] = React.useState<IQuote>();

  React.useEffect(() => {
    axios
      .get('/quote')
      .then(res => setQuote(res.data))
      .catch(e => console.log(e));
  });

  return (
    <section>
      {quote && (
        <>
          <h4>{quote.text}</h4>
          <h5>{quote.from}</h5>
        </>
      )}
    </section>
  );
};

export default Home;
