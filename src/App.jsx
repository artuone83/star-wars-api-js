/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
import React, { useReducer } from 'react';
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
  text-align: center;
  margin-bottom: 50px;
`;

const Logo = styled.img`
  height: 100px;
`;

const Main = styled.main`
  padding: ${({ theme: { padding } }) => `${padding[1]}px`} 0;
`;

const Loading = styled.p`
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme: { color_pallet: { olivetone } } }) => olivetone};
  padding: 20px 50px;
  color: ${({ theme: { color_pallet: { black } } }) => black};
`;

const NoMatch = styled(Loading)``;

const Person = styled.p`
  display: inline-block;
  margin-top: 25px;
  transition: 0.5s;
  padding: 15px 50px;
  border-radius: 4px;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  background: ${(props) => (props.isActive ? props.theme.color_pallet.ripeLemon : '')};
  color: ${(props) => (props.isActive ? props.theme.color_pallet.black : '')};
  &:hover {
    cursor: pointer;
    background: ${({ theme: { color_pallet: { ripeLemon } } }) => ripeLemon};
    color: ${({ theme: { color_pallet: { black } } }) => black};
  }
`;

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
  isProcessing: false,
  selectedPerson: '',
};

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const handleSearch = () => async (e) => {
    e.preventDefault();
    dispatch({ type: types.SET_NO_RESULTS, noResults: false });
    dispatch({ type: types.SET_FILMS, films: initialState.films });

    try {
      dispatch({ type: types.SET_IS_PROCESSING, isProcessing: true });
      const responsePerson = await fetch(`${URL.searchPeople}${state.inputValue}`);
      const person = await responsePerson.json();
      const responsePlanet = await fetch(`${URL.searchPlanet}${state.inputValue}`);
      const planet = await responsePlanet.json();

      dispatch({ type: types.SET_IS_PROCESSING, isProcessing: false });
      dispatch({ type: types.SET_FILTERED_PEOPLE, filteredPeople: person.results });
      dispatch({ type: types.SET_FILTERED_PLANETS, filteredPlanets: planet.results });

      if (person.results.length === 0 && planet.results.length === 0) {
        dispatch({ type: types.SET_NO_RESULTS, noResults: true });
      } else if (person.results.length === 0 && planet.results.length > 0) {
        const planetResidents = [];

        planet.results.forEach((result) => {
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
        });
      }
    } catch (error) {
      console.error(error);
    }
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
    dispatch({ type: types.SET_SELECTED_PERSON, selectedPerson: name });
    console.log('handleResultClick -> name', name);
    if (state.filteredPeople.length > 0) {
      const person = state.filteredPeople.find(
        (filteredPerson) => filteredPerson.name.toLowerCase() === name.toLowerCase(),
      );
      const personFilms = person.films;

      getFilmsData(personFilms, dispatch);
    }
  };

  const filteredContent = () => {
    if (state.filteredPeople.length > 0) {
      return state.filteredPeople.map((person) => (
        <Person key={person.name} isActive={person.name === state.selectedPerson} onClick={handleResultClick(person.name)}>
          {person.name}
        </Person>
      ));
    }
  };

  return (
    <Container>
      <Header>
        <Logo src={logo} alt="logo" />
        <SearchBar
          handleSearch={handleSearch()}
          handleInputChange={handleInputChange}
        />
      </Header>
      <Main>
        <H1>Welcome to Star Wars WIKI</H1>
        {state.isProcessing && <Loading>Loading...</Loading>}
        {state.noResults && <NoMatch>No match found</NoMatch>}
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
