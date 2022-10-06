import React from 'react';
import DateBookList from './DateBookList/DateBookList';
import axios from 'axios';
import { getCurrentDay } from '../../helpers/getCurrentDay';
import { IPost } from './DateBookType';
import DateBooksEditor from '../shared/DateBooksEditor/DateBooksEditor';
import { useTypedSelector } from '../../hooks/useTypedSelectors';

const DateBooks = () => {
  const [text, setText] = React.useState<string>('');
  const [posts, setPost] = React.useState<IPost[]>([]);
  const { isAuthenticated } = useTypedSelector(s => s.user);

  /* ==================== TEXT INPUT ==================== */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);
  const _handleChange = React.useCallback(handleChange, []);

  /* ==================== GET POST ==================== */
  React.useEffect(() => {
    isAuthenticated &&
      axios
        .get('/datebooks')
        .then(res => setPost(res.data))
        .catch(e => console.log(e));
  }, [isAuthenticated]);

  /* ==================== ADD POST ==================== */
  const addPost = async (text: string, date: string) => {
    const { data } = await axios.post('/datebooks', {
      text,
      date,
    });
    setPost(posts => [...posts, data]);
  };
  const _addPost = React.useCallback(addPost, []);

  /* ==================== UPDATE POST ==================== */
  const updatePost = async (text: string, id: string) => {
    const { data } = await axios.patch('/datebooks/' + id, { text });
    setPost(posts =>
      posts.map(el => (el._id === id ? Object.assign({ ...data }) : el)),
    );
  };

  const _updatePost = React.useCallback(updatePost, []);

  /* ==================== SUBMIT POST ==================== */
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!text) {
        return;
      }
      const date = getCurrentDay();
      const post = posts.find(el => el.date === date);
      !post
        ? _addPost(text, date)
        : _updatePost(post.text + '\n' + text, post._id);

      setText('');
    } catch (e) {
      console.error(e);
    }
  };

  const _handleSubmit = React.useCallback(handleSubmit, [
    posts,
    text,
    _addPost,
    _updatePost,
  ]);

  return (
    <section>
      <DateBooksEditor
        buttonCallBack={_handleSubmit}
        type="Add"
        onChange={_handleChange}
        value={text}
      />
      {posts.length >= 1 && <DateBookList posts={posts} />}
    </section>
  );
};

export default DateBooks;
