import React, { useState } from 'react';
import { withCookies } from 'react-cookie';
import { Button, Form } from 'react-bootstrap';
import './FindMovies.css';
import { Redirect } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import MovieItem from "../MovieItem/MovieItem";

// a movie ID that works for testing etc: 299537 (Captain Marvel)

const FindMovies = ({ model }) => {

  
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  if(model.getUser() === null){
      return <Redirect to="/"/>
  }

  const baseUrl = "https://image.tmdb.org/t/p/w500";


  const handleClick = () => {
    model.searchMovies(query).then(data => setResults(data.results));
  }

  const handleChange = e => {
    setQuery(e.target.value);
    };


  const images = results
  .filter(movie => movie.poster_path !== null)
  .map(movie => 
    <MovieItem key={movie.id} movie={movie} model={model}/>
  );
  
  return (
    
    <div className="row Home">

        <div className="col-lg-2 Sidebar">
        <Sidebar model={model} />
        </div>
      
      <div className="col">
        
        <div id="search">
          <Form>
            <Form.Row>
              <Form.Control inline placeholder="Search..." onChange={handleChange}/>
              <Button inline onClick={handleClick} variant="primary">Search</Button>
            </Form.Row>
          </Form>
        </div>
        
        <div id="searchDiv" className="row">  
          {images}
        </div>

      </div>
    </div>

   
  );
};

export default withCookies(FindMovies);