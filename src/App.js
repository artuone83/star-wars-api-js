/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import SearchBar from './components/search-bar';
import Films from './components/films';
import { types } from './consts/types';
import { URL } from './consts/urls';
import { getFilmsData } from './utils/get-films-data';
import { appReducer } from './reducer/app-reducer';
import logo from './Star_Wars_Logo.svg';
import Container from './layout/container';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme: { padding } }) => `${padding[1]}px`} 0;
  border-bottom: 1px solid ${({ theme: { color_pallet: { soratoga } } }) => soratoga}
`;

const H1 = styled.h1`
  margin-left: 15px;
`;

const Logo = styled.img`
  height: 100px;
`;

const Main = styled.main`
  padding: ${({ theme: { padding } }) => `${padding[1]}px`} 0;
`;

const Person = styled.p`
  display: inline-block;
  margin-top: 25px;
  transition: 0.5s;
  padding: 15px 50px 15px 0;
  border-radius: 4px;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
    background: ${({ theme: { color_pallet: { ripeLemon } } }) => ripeLemon};
    color: ${({ theme: { color_pallet: { black } } }) => black};
    padding-left: 50px;
  }
`;
const Planet = styled(Person)``;

const Footer = styled.footer`
  border-top: 1px solid ${({ theme: { color_pallet: { soratoga } } }) => soratoga};
  padding: ${({ theme: { padding } }) => `${padding[1]}px`} 0;
`;

const Link = styled.a`
  color: ${({ theme: { color_pallet: { ripeLemon } } }) => ripeLemon};

  &:visited {
    color: ${({ theme: { color_pallet: { olivetone } } }) => olivetone};
  }
`;

const initialState = {
  people: [],
  planets: [],
  filteredPeople: [],
  filteredPlanets: [],
  inputValue: '',
  noResults: false,
  films: [],
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
    const { value } = e.target;
    if (value === '') {
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
    dispatch({ type: types.SET_NAME, inputValue: value.trim() });
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
        <Person key={person.name} onClick={handleResultClick(person.name)}>
          {person.name}
        </Person>
      ));
    }

    if (state.filteredPlanets.length > 0) {
      return state.filteredPlanets.map((planet) => (
        <Planet key={planet.name} onClick={handleResultClick(planet.name)}>
          {planet.name}
        </Planet>
      ));
    }
  };

  return (
    <Container>
      <Header>
        <Logo src={logo} alt="logo" />
        <H1>Welcome to Star Wars WIKI</H1>
      </Header>
      <Main>
        <SearchBar
          handleSearch={handleSearch()}
          handleInputChange={handleInputChange}
        />
        {state.noResults && <p>no match found</p>}
        {filteredContent()}
        <Films films={state.films} />
      </Main>
      <Footer>
        <p>{new Date().getFullYear()}</p>
        <p>
          Powered by
          {' '}
          <Link href="https://swapi.dev/">SWAPI</Link>
        </p>
      </Footer>
    </Container>
  );
};

export default App;
