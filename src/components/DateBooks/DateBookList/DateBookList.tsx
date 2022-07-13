import React, { FC, memo } from 'react';
import { IPost } from '../DateBookType';

interface DateBookListType {
  posts: Array<IPost>;
}

const DateBookList: FC<DateBookListType> = ({ posts }) => {
  console.log('DateBookList Render');
  return (
    <ul>
      {posts.map(el => (
        <li key={el._id}>
          <h3>{el.date}</h3>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(DateBookList);
