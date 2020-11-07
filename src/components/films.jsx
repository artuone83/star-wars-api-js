import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FilmsList = styled.ul`
  padding: 20px 40px;
`;

const ListItem = styled.li`
  position: relative;
  color: white;
  padding: 20px 10px; 

  &:before {
    content: '';
    position: absolute;
    top: 20px;
    left: -20px;
    width: 5px;
    height: 50px;
    background: ${({ theme: { color_pallet: { ripeLemon } } }) => ripeLemon};
    
  }
`;

const Title = styled.h2`
  font-size: 2rem;
`;

const ReleaseDate = styled.p`
  margin: 12px 0;
`;

const OpeningCrawl = styled(ReleaseDate)``;

const Films = ({ films }) => (
  <FilmsList>
    {films.map((film) => (
      <ListItem key={film.title}>
        <Title>{film.title}</Title>
        <ReleaseDate>{film.release_date}</ReleaseDate>
        <OpeningCrawl>{`${film.opening_crawl.substring(0, 133)}...`}</OpeningCrawl>
      </ListItem>
    ))}
  </FilmsList>
);

Films.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Films;
