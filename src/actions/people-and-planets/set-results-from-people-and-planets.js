import { uniqBy } from 'lodash';
import { types } from '../../consts/types';

export const setResultsFromPeopleAndPlanets = (person, planet, dispatch) => {
  const planetResidents = [];
  const { results: personResults } = person;
  const { results: planetResults } = planet;

  planetResults.forEach((result) => {
    const { residents } = result;

    if (residents.length > 0) {
      residents.forEach(async (resident, index) => {
        const residentHttps = resident.replace('http', 'https');

        try {
          dispatch({ type: types.SET_IS_PROCESSING, isProcessing: true });
          dispatch({
            type: types.SET_REQUEST_ERROR,
            requestError: {
              status: false,
            },
          });

          const responseData = await fetch(residentHttps);
          const residentData = await responseData.json();

          dispatch({ type: types.SET_IS_PROCESSING, isProcessing: false });
          planetResidents[index] = residentData;
        } catch (error) {
          console.error(error);
          dispatch({
            type: types.SET_REQUEST_ERROR,
            requestError: {
              status: true,
              message: 'Cannot get residents',
            },
          });
        }

        dispatch({
          type: types.SET_FILTERED_PEOPLE,
          filteredPeople: uniqBy([...personResults, ...planetResidents], 'name'),
        });
      });
    }
  });
};
