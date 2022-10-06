import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import DateBookItem from '../../../components/DateBooks/DateBookItem/DateBookItem';

const SingleDateBookPage = () => {
  const [post, setPost] = React.useState();

  const id = useLocation().pathname.split('/')[2];

  React.useEffect(() => {
    axios
      .get('/datebooks/' + id)
      .then(({ data }) => setPost(data))
      .catch(e => console.error(e));
  }, [id]);
  return <>{post && <DateBookItem post={post} />}</>;
};

export default SingleDateBookPage;
