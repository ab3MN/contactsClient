import React, { FC } from 'react';
import './DateBookItem.scss';

type postType = { text: string };

interface IDateBookItemProps {
  post: postType;
}

const DateBookItem: FC<IDateBookItemProps> = ({ post }) => {
  return (
    <section className="datebook--item">
      <p className="datebook--item__text">{post.text}</p>
    </section>
  );
};

export default React.memo(DateBookItem);
