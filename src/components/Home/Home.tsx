import axios from 'axios';
import React from 'react';
import './Home.scss';

interface IQuote {
  text: String;
  from: String;
  _id: String;
}

const Home = () => {
  const [quote, setQuote] = React.useState<IQuote>();

  React.useEffect(() => {
    !quote &&
      axios
        .get('/quote')
        .then(res => setQuote(res.data))
        .catch(e => console.log(e));
  }, [quote]);

  return (
    <section className="home">
      {quote && (
        <>
          <h4 className="home__quote--text">{quote.text}</h4>
          <h5 className="home__quote--from">{quote.from}</h5>
        </>
      )}
    </section>
  );
};

export default Home;
