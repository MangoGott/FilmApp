import React, { Component } from "react";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
//import modelInstance from "../data/DinnerModel";
import "./MovieItem.css";
import Col from "react-bootstrap/Col";
import FigureImage from 'react-bootstrap/FigureImage'
import FigureCaption from 'react-bootstrap/FigureCaption'
import Figure from 'react-bootstrap/Figure'
import { Link } from 'react-router-dom'
import { withCookies} from 'react-cookie';

class MovieItem extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: "LOADING",
      movie: props.movie,
      baseUri: "https://image.tmdb.org/t/p/w500"
    };
    this.handleClick = this.handleClick.bind(this);
  }



  handleClick(e){
      console.log(e.target.alt, " clicked");
     // this.props.model.addToMenu(this.state.dish);
      
      
  }


  render() {
   // var image = this.dish.title;

    let imgSrc = this.state.baseUri+ this.state.movie.poster_path;
    let name = this.state.movie.title;
    let id = this.state.movie.id;

    //let id = this.state.dish.id;

    return (
        <Col xs ="3" className="movieImage" >
            <Link to={`/details/${id}`}>
                <div className="frame">
                    <Figure>
                        <FigureImage  src={imgSrc} alt={name} />
                        <FigureCaption>{name}</FigureCaption>
                    </Figure>
                </div>
            </Link>
        </Col>
    );
  }
}

export default withCookies(MovieItem);
