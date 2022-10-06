import React, { FC } from 'react';
import { Book } from '../Books';
import './BooksList.scss';

interface IBooksListProps {
  books: Book[];
  handleComplete: (_id: string, isCompleted: boolean) => void;
}

const BooksList: FC<IBooksListProps> = ({ books, handleComplete }) => {
  return (
    <ul className="books--list">
      {books.map(el => (
        <li key={el._id} className="books--list__item">
          <p
            onClick={() => handleComplete(el._id, el.isCompleted)}
            className={
              el.isCompleted
                ? 'books--list__name completed'
                : 'books--list__name'
            }
          >
            {books.indexOf(el) + 1 + '. ' + el.name}
          </p>{' '}
          <a
            href={el.filePath}
            target="_blank"
            rel="noreferrer"
            className="books--list__link"
          >
            Download
          </a>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(BooksList);
