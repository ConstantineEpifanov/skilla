import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { skillaActions } from '../store/skilla/skilla.slice';
import { dateFilterActions } from '../store/skilla/dateFilter.slice';
import { callFilterActions } from '../store/skilla/callFilter.slice';

const actions = {
  ...skillaActions,
  ...dateFilterActions,
  ...callFilterActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
