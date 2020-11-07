/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import SearchBar from './components/search-bar';

const Header = styled.header`
  background: gray;
`;

const Main = styled.main``;

const Footer = styled.footer``;

const URL = {
  people: 'https://swapi.dev/api/people/',
  planets: 'https://swapi.dev/api/planets/',
};

const types = {
  SET_PEOPLE: 'SET_PEOPLE',
  SET_PLANETS: 'SET_PLANETS',
  SET_NAME: 'SET_NAME',
  SET_FILTERED_PEOPLE: 'SET_FILTERED_PEOPLE',
  SET_FILTERED_PLANETS: 'SET_FILTERED_PLANETS',
  SET_NO_RESULTS: 'SET_NO_RESULTS',
  SET_FILMS: 'SET_FILMS',
  SET_ALL_FILMS: 'SET_ALL_FILMS',
};

const initialState = {
  people: [],
  planets: [],
  filteredPeople: [],
  filteredPlanets: [],
  inputValue: '',
  noResults: false,
  films: [],
};

const appReducer = (state, action) => {
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

const Films = ({ films }) => (
  <ul>
    {films.map((film) => (
      <li key={film.title}>
        <p>{film.title}</p>
        <p>{film.release_date}</p>
        <p>{`${film.opening_crawl.substring(0, 133)}...`}</p>
      </li>
    ))}
  </ul>
);

const getFilmsData = async (films, dispatch) => {
  const response = [];

  films.forEach(async (personFilm, index) => {
    try {
      const responseData = await fetch(personFilm);
      const personFilmData = await responseData.json();
      response[index] = personFilmData;
      dispatch({ type: types.SET_FILMS, films: response });
    } catch (error) {
      console.error(error);
    }
  });
};

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const getData = async () => {
      try {
        const peopleResponse = await fetch(URL.people);
        const peopleData = await peopleResponse.json();
        const planetsResponse = await fetch(URL.planets);
        const planetsData = await planetsResponse.json();

        dispatch({ type: types.SET_PEOPLE, people: peopleData.results });
        dispatch({ type: types.SET_PLANETS, planets: planetsData.results });
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  const handleSearch = () => (e) => {
    e.preventDefault();
    dispatch({ type: types.SET_NO_RESULTS, noResults: false });
    dispatch({ type: types.SET_FILMS, films: initialState.films });

    const filteredPeople = state.people.filter(
      (person) => person.name.toLowerCase() === state.inputValue.toLowerCase(),
    );
    const filteredPlanets = state.planets.filter(
      (planet) => planet.name.toLowerCase() === state.inputValue.toLowerCase()
        || planet.population === state.inputValue,
    );

    if (filteredPeople.length === 0 && filteredPlanets.length === 0) {
      dispatch({ type: types.SET_NO_RESULTS, noResults: true });
    }
    dispatch({ type: types.SET_FILTERED_PEOPLE, filteredPeople });
    dispatch({ type: types.SET_FILTERED_PLANETS, filteredPlanets });
  };

  const handleInputChange = (e) => {
    if (e.target.value === '') {
      dispatch({
        type: types.SET_FILTERED_PEOPLE,
        filteredPeople: initialState.filteredPeople,
      });
      dispatch({
        type: types.SET_FILTERED_PLANETS,
        filteredPlanets: initialState.filteredPlanets,
      });
      dispatch({ type: types.SET_NO_RESULTS, noResults: false });
      dispatch({ type: types.SET_FILMS, films: initialState.films });
    }
    dispatch({ type: types.SET_NAME, inputValue: e.target.value });
  };

  const handleResultClick = (name) => async () => {
    if (state.filteredPeople.length > 0) {
      const person = state.filteredPeople.find(
        (filteredPerson) => filteredPerson.name.toLowerCase() === name.toLowerCase(),
      );
      const personFilms = person.films;

      getFilmsData(personFilms, dispatch);
    }

    if (state.filteredPlanets.length > 0) {
      const planet = state.filteredPlanets.find(
        (filteredPlanet) => filteredPlanet.name.toLowerCase() === name.toLowerCase(),
      );
      const planetFilms = planet.films;

      getFilmsData(planetFilms, dispatch);
    }
  };

  const filteredContent = () => {
    if (state.filteredPeople.length > 0) {
      return state.filteredPeople.map((person) => (
        <p key={person.name} onClick={handleResultClick(person.name)}>
          {person.name}
        </p>
      ));
    }

    if (state.filteredPlanets.length > 0) {
      return state.filteredPlanets.map((planet) => (
        <p key={planet.name} onClick={handleResultClick(planet.name)}>
          {planet.name}
        </p>
      ));
    }
  };

  return (
    <>
      <Header>Star wars API</Header>
      <Main>
        Main content
        <SearchBar
          handleSearch={handleSearch()}
          handleInputChange={handleInputChange}
        />
        {state.noResults && <p>no match found</p>}
        {filteredContent()}
        <Films films={state.films} />
      </Main>
      <Footer>Footer</Footer>
    </>
  );
};

export default App;
