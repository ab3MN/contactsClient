import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

const Actions = {};

export const useDispatchAcions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(Actions, dispatch);
};
