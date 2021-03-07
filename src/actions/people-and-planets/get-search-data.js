import { types } from '../../consts/types';
import { URL } from '../../consts/urls';
import { setNoResults } from './set-no-results';
import { setPeopleFromPlanetResidents } from './set-people-from-planet-residents';
import { setResultsFromPeopleAndPlanets } from './set-results-from-people-and-planets';

export const getSearchData = async (inputValue, dispatch) => {
  try {
    dispatch({ type: types.SET_IS_PROCESSING, isProcessing: true });
    dispatch({
      type: types.SET_REQUEST_ERROR,
      requestError: {
        status: false,
      },
    });

    const responsePerson = await fetch(`${URL.searchPeople}${inputValue}`);
    const person = await responsePerson.json();

    const responsePlanet = await fetch(`${URL.searchPlanet}${inputValue}`);
    const planet = await responsePlanet.json();

    dispatch({ type: types.SET_IS_PROCESSING, isProcessing: false });
    dispatch({ type: types.SET_FILTERED_PEOPLE, filteredPeople: person.results });

    if (person.results.length === 0 && planet.results.length === 0) {
      setNoResults(dispatch);
    }
    if (person.results.length === 0 && planet.results.length > 0) {
      setPeopleFromPlanetResidents(planet, dispatch);
    }
    if (person.results.length > 0 && planet.results.length > 0) {
      setResultsFromPeopleAndPlanets(person, planet, dispatch);
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: types.SET_REQUEST_ERROR,
      requestError: {
        status: true,
        message: 'Cannot get people or planets',
      },
    });
  }
};
