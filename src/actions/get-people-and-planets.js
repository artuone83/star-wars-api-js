import { types } from '../consts/types';
import { URL } from '../consts/urls';

export const getPeopleAndPlanets = async (inputValue, dispatch) => {
  try {
    dispatch({ type: types.SET_IS_PROCESSING, isProcessing: true });
    const responsePerson = await fetch(`${URL.searchPeople}${inputValue}`);
    const person = await responsePerson.json();
    const responsePlanet = await fetch(`${URL.searchPlanet}${inputValue}`);
    const planet = await responsePlanet.json();

    dispatch({ type: types.SET_IS_PROCESSING, isProcessing: false });
    dispatch({ type: types.SET_FILTERED_PEOPLE, filteredPeople: person.results });

    if (person.results.length === 0 && planet.results.length === 0) {
      dispatch({ type: types.SET_NO_RESULTS, noResults: true });
    }
    if (person.results.length === 0 && planet.results.length > 0) {
      const planetResidents = [];

      planet.results.forEach((result) => {
        if (result.residents.length > 0) {
          dispatch({ type: types.SET_NO_RESIDENTS, noResidents: false });
          result.residents.forEach(async (resident, index) => {
            const residentHttps = resident.replace('http', 'https');
            try {
              dispatch({ type: types.SET_IS_PROCESSING, isProcessing: true });
              const responseData = await fetch(residentHttps);
              const residentData = await responseData.json();
              dispatch({ type: types.SET_IS_PROCESSING, isProcessing: false });
              planetResidents[index] = residentData;
            } catch (error) {
              console.error(error);
            }

            dispatch({ type: types.SET_FILTERED_PEOPLE, filteredPeople: planetResidents });
          });
        } else {
          dispatch({ type: types.SET_NO_RESIDENTS, noResidents: true });
        }
      });
    }
    if (person.results.length > 0 && planet.results.length > 0) {
      const planetResidents = [];

      planet.results.forEach((result) => {
        if (result.residents.length > 0) {
          result.residents.forEach(async (resident, index) => {
            const residentHttps = resident.replace('http', 'https');
            try {
              dispatch({ type: types.SET_IS_PROCESSING, isProcessing: true });
              const responseData = await fetch(residentHttps);
              const residentData = await responseData.json();
              dispatch({ type: types.SET_IS_PROCESSING, isProcessing: false });
              planetResidents[index] = residentData;
            } catch (error) {
              console.error(error);
            }

            dispatch({
              type: types.SET_FILTERED_PEOPLE,
              filteredPeople: [...person.results, ...planetResidents],
            });
          });
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
};
