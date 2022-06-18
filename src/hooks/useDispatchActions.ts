import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as us from '../redux/users/userServices';

const Actions = { ...us };

export const useDispatchAcions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(Actions, dispatch);
};
