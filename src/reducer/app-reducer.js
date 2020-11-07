/* eslint-disable import/prefer-default-export */
import { types } from '../consts/types';

export const appReducer = (state, action) => {
  switch (action.type) {
    case types.SET_PEOPLE:
      return { ...state, people: action.people };
    case types.SET_NAME:
      return { ...state, inputValue: action.inputValue };
    case types.SET_PLANETS:
      return { ...state, planets: action.planets };
    case types.SET_FILTERED_PEOPLE:
      return { ...state, filteredPeople: action.filteredPeople };
    case types.SET_FILTERED_PLANETS:
      return { ...state, filteredPlanets: action.filteredPlanets };
    case types.SET_NO_RESULTS:
      return { ...state, noResults: action.noResults };
    case types.SET_FILMS:
      return { ...state, films: action.films };
    case types.SET_ALL_FILMS:
      return { ...state, allFilms: action.allFilms };
    default:
      return state;
  }
};
