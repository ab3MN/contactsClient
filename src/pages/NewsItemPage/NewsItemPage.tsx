import React from 'react';
import { useLocation } from 'react-router-dom';
import NewsItem from '../../components/News/NewsItem/NewsItem';
import axios from 'axios';

const NewsItemPage = () => {
  const [oneNews, setOneNews] = React.useState();

  const location = useLocation();
  const title = decodeURIComponent(location.pathname.slice(6));

  React.useEffect(() => {
    axios
      .get('/news/oneNews?title=' + title)
      .then(({ data }) => setOneNews(data?.articles[0]))
      .catch(e => console.error(e));
  }, [title]);

  return <>{oneNews && <NewsItem news={oneNews} />}</>;
};

export default NewsItemPage;
