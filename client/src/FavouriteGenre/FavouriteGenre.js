import React, { Component } from "react";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import MovieItem from "../MovieItem/MovieItem";
import Row from "react-bootstrap/Row";
import "./FavouriteGenre.css";

class FavouriteGenre extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: "LOADING",
      movies: ""
    };
  } 
 
  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    
    // when data is retrieved we update the state
    // this will cause the component to re-render
    this.props.model
      .getGenre(28)
      .then(movies => {
        this.setState({
          status: "LOADED",
          movies: movies.results.slice(0,10)
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });

      
  }


  render() {
    let movieList = null;
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case "LOADING":
        movieList = <div className="spinner"/>;
        break;
      case "LOADED":
        movieList = this.state.movies.map(movie => (
          <MovieItem key={movie.id} movie={movie} model={this.props.model}/>
        ));
        break;
      default:
      movieList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div  className="FavouriteGenreMovies">
        {movieList}
      </div>
    );
  }
}

export default FavouriteGenre;
