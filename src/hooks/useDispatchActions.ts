import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as us from '../redux/users/userServices';
import * as ws from '../redux/weather/weatherServices';

const Actions = { ...us, ...ws };

export const useDispatchAcions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(Actions, dispatch);
};
