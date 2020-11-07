/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { types } from '../consts/types';

export const getFilmsData = async (films, dispatch) => {
  const response = [];

  films.forEach(async (personFilm, index) => {
    const personFilmHTTPS = personFilm.replace('http', 'https');
    try {
      const responseData = await fetch(personFilmHTTPS);
      const personFilmData = await responseData.json();
      response[index] = personFilmData;
      dispatch({ type: types.SET_FILMS, films: response });
    } catch (error) {
      console.error(error);
    }
  });
};
