import React, { useEffect } from 'react';
import axios from 'axios';
import './News.scss';
import { getFormatDate } from '../../helpers/getCurrentDay';
import { Link } from 'react-router-dom';

interface INews {
  title: string;
  description: string;
  publishedAt: string;
  id: string;
}

const News = () => {
  const [news, setNews] = React.useState<INews[] | null>(null);

  useEffect(() => {
    const name = 'Ukraine';
    axios
      .get<INews[]>('/news?q=' + name)
      .then(({ data }) => setNews(data))
      .catch(e => console.error(e));
  }, []);

  return (
    <ul className="news--list">
      {news &&
        news.map(el => (
          <li key={el.id} className="news--list__item">
            <Link to={'/news/' + el.title} className="news--list__link">
              <h2 className="news--list__title">{el.title}</h2>
              <h5 className="news--list__description">{el.description}</h5>{' '}
              <h6 className="news--list__date">
                {getFormatDate(el.publishedAt)}
              </h6>
            </Link>{' '}
          </li>
        ))}
    </ul>
  );
};

export default React.memo(News);
