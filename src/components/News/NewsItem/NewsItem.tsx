import React, { FC } from 'react';
import './NewsItem.scss';
import { getFormatDate } from '../../../helpers/getCurrentDay';

type News = {
  content: string;
  urlToImage: string;
  description: string;
  author: string;
  title: string;
  publishedAt: string;
  url: string;
};

interface INewsItemProps {
  news: News;
}

const NewsItem: FC<INewsItemProps> = ({ news }) => {
  const { content, urlToImage, description, author, title, publishedAt, url } =
    news;
  return (
    <section className="news--item">
      <h1 className="news--item__title">
        "{title}" - <span className="news--item__author">{author}</span>
      </h1>{' '}
      <h4 className="news--item__description">{description}</h4>
      <div className="news--item__image--box">
        {' '}
        <img src={urlToImage} alt="News" className="news--item__image" />
        <p className="news--item__content">{content}</p>{' '}
        <span className="news--item__date">
          {' '}
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="news--item__link"
          >
            Read full news
          </a>
          {getFormatDate(publishedAt)}
        </span>
      </div>{' '}
    </section>
  );
};

export default NewsItem;
