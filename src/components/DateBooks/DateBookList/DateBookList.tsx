import React, { FC } from 'react';
import { IPost } from '../DateBookType';
import { Link } from 'react-router-dom';
import './DateBookList.scss';

interface DateBookListType {
  posts: Array<IPost>;
}

const DateBookList: FC<DateBookListType> = ({ posts }) => {
  return (
    <ul className="dateBook--list">
      {posts.map(el => (
        <li key={el._id} className="dateBook--list__item">
          <Link
            to={'/datebooks/' + el._id}
            className="dateBook--list__item--link"
          >
            <h3>{el.date}</h3>{' '}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(DateBookList);
