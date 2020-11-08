import { types } from '../consts/types';

export const appReducer = (state, action) => {
  switch (action.type) {
    case types.SET_FILTERED_PEOPLE:
      return { ...state, filteredPeople: action.filteredPeople };
    case types.SET_NO_RESULTS:
      return { ...state, noResults: action.noResults };
    case types.SET_FILMS:
      return { ...state, films: action.films };
    case types.SET_IS_PROCESSING:
      return { ...state, isProcessing: action.isProcessing };
    case types.SET_NO_RESIDENTS:
      return { ...state, noResidents: action.noResidents };
    default:
      return state;
  }
};
