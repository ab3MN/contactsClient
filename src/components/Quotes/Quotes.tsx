import React, { FC } from 'react';
import axios from 'axios';

import './Quotes.scss';

interface IQuote {
  text: String;
  from: String;
  _id: String;
}

const Quotes: FC = () => {
  const [quote, setQuote] = React.useState<IQuote>();

  React.useEffect(() => {
    !quote &&
      axios
        .get('/quote')
        .then(res => setQuote(res.data))
        .catch(e => console.log(e));
  }, [quote]);

  return (
    <h1 className="quote--text">
      "{quote?.text}"<span className="quote--from"> - {quote?.from}</span>
    </h1>
  );
};

export default React.memo(Quotes);
