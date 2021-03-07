import { types } from '../../consts/types';

export const setNoResults = (dispatch) => {
  dispatch({ type: types.SET_NO_RESULTS, noResults: true });
};
