import React from 'react';
import DateBookList from './DateBookList/DateBookList';
import axios from 'axios';
import { getCurrentDay } from '../../helpers/getCurrentDay';
import { IPost } from './DateBookType';

const DateBooks = () => {
  const [text, setText] = React.useState<string>('');
  const [posts, setPost] = React.useState<IPost[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  /* ==================== ADD POST ==================== */
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!text) {
        return;
      }

      const res = await axios.post('/datebooks', {
        text,
        date: getCurrentDay(),
      });

      setPost(posts => [...posts, res.data]);
      setText('');
    } catch (e) {
      console.log(e);
    }
  };
  /* ==================== GET POST ==================== */
  React.useEffect(() => {
    axios
      .get('/datebooks')
      .then(res => setPost(res.data))
      .catch(e => console.log(e));
  }, []);

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <textarea name="text" onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
      {posts.length >= 1 && <DateBookList posts={posts} />}
    </section>
  );
};

export default DateBooks;
