import { types } from '../consts/types';

export const getFilmsData = async (films, dispatch) => {
  const response = [];

  films.forEach(async (personFilm, index) => {
    const personFilmHTTPS = personFilm.replace('http', 'https');
    try {
      dispatch({ type: types.SET_IS_PROCESSING, isProcessing: true });
      const responseData = await fetch(personFilmHTTPS);
      const personFilmData = await responseData.json();
      dispatch({ type: types.SET_IS_PROCESSING, isProcessing: false });
      response[index] = personFilmData;
      dispatch({ type: types.SET_FILMS, films: response });
    } catch (error) {
      console.error(error);
    }
  });
};
