import { types } from '../../consts/types';

export const setPeopleFromPlanetResidents = (planetData, dispatch) => {
  const planetResidents = [];
  const { results } = planetData;

  results.forEach((result) => {
    const { residents } = result;

    if (residents.length > 0) {
      dispatch({ type: types.SET_NO_RESIDENTS, noResidents: false });

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

        dispatch({ type: types.SET_FILTERED_PEOPLE, filteredPeople: planetResidents });
      });
    } else {
      dispatch({ type: types.SET_NO_RESIDENTS, noResidents: true });
    }
  });
};
