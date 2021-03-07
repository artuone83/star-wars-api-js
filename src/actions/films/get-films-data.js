import { types } from '../../consts/types';

export const getFilmsData = async (personFilms, dispatch) => {
  const films = [];

  personFilms?.forEach(async (personFilm, index) => {
    const personFilmHTTPS = personFilm.replace('http', 'https');
    try {
      dispatch({ type: types.SET_IS_PROCESSING, isProcessing: true });

      const responseData = await fetch(personFilmHTTPS);
      const personFilmData = await responseData.json();

      dispatch({ type: types.SET_IS_PROCESSING, isProcessing: false });

      films[index] = personFilmData;

      dispatch({ type: types.SET_FILMS, films });
    } catch (error) {
      console.error(error);
      dispatch({
        type: types.SET_REQUEST_ERROR,
        requestError: {
          status: true,
          message: 'Cannot get films',
        },
      });
    }
  });
};
