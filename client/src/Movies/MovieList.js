import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import styled from 'styled-components';
import MovieCard from './MovieCard';

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:visited, &:link, &:active {
        text-decoration: none;
    }
    &:hover{
      color: grey;
    }
    color: black;
`;

const MovieList = props => {
  const [movies, setMovies] = useState([])
  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovies(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    
    getMovies();
  }, []);
  
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieDetails key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

function MovieDetails({ movie }) {
  return (
    <StyledLink to={`/movies/${movie.id}`}>
        <MovieCard movie={movie}/>
    </StyledLink>
  );
}

export default MovieList;
