import React from 'react';
import BooksList from './BooksList/BooksList';
import axios from 'axios';
import { useTypedSelector } from '../../hooks/useTypedSelectors';

import './Books.scss';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export type Book = {
  _id: string;
  name: string;
  filePath: string;
  isCompleted: boolean;
};
const Books = () => {
  const [books, setBooks] = React.useState<Book[]>([]);
  const { isAuthenticated } = useTypedSelector(s => s.user);

  React.useEffect(() => {
    isAuthenticated &&
      axios
        .get('/books')
        .then(({ data }) => setBooks(data))
        .catch(e => console.error(e));
  }, [isAuthenticated]);
  const handleComplete = async (_id: string, isCompleted: boolean) => {
    try {
      await axios.patch('/books/' + _id + '/completed', {
        isCompleted: !isCompleted,
      });

      setBooks(books =>
        books.map(el =>
          el._id === _id
            ? Object.assign({}, el, { isCompleted: !isCompleted })
            : el,
        ),
      );
    } catch (e) {
      console.log(e);
    }
  };
  const _handleComplete = React.useCallback(handleComplete, []);

  /* ==================== UPLOAD BOOCK ==================== */
  const [selectedBook, setSelectedBook] = React.useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files && setSelectedBook(e.target.files[0]);
  };

  const _handleChange = React.useCallback(handleChange, []);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('book', selectedBook);

    selectedBook &&
      (await axios
        .post('/books/', formData, {})
        .then(res => setSelectedBook(res.data))
        .catch(e => console.log(e)));
  };

  return (
    <section>
      <article className="book__box">
        <label htmlFor="image_uploads" className="book__label">
          Choose book to upload
          <input
            className="book__input"
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".pdf,.epub,.azw,.html,.txt,.pdb,.prc,.doc,.docx"
            multiple
            onChange={_handleChange}
          />
        </label>
        <IconButton
          onClick={handleUpload}
          sx={{
            color: 'rgb(240, 248, 255)',
            '&:hover': {
              color: 'rgb(3, 233, 244)',
            },
          }}
        >
          <CloudUploadIcon />
        </IconButton>
      </article>
      {books && <BooksList books={books} handleComplete={_handleComplete} />}{' '}
    </section>
  );
};

export default Books;
