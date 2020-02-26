import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { withCookies  } from 'react-cookie';
import FigureImage from 'react-bootstrap/FigureImage';
import { Redirect } from 'react-router-dom';
import "./MovieDetails.css";
import MovieLists from "../MoiveLists/MovieLists";
//a movie ID that works for testing etc: 299537 (Captain Marvel)
class MovieDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            status: "LOADING",
            movie: '',
            baseUri: "https://image.tmdb.org/t/p/w500"
        }
    }

    componentDidMount() {

        this.props.model.getMovie(this.props.match.params.movie_id)
            .then(fetchMovie => {
                this.setState({
                    status: "LOADED",
                    movie: fetchMovie
                });
            })
            .catch(err => {
                console.log("ERROR! " + err.toString());
                this.setState({
                    status: "ERROR"
                });
            });
        this.props.model.addObserver(this);
    }

    componentWillUnmount() {
        this.props.model.removeObserver(this);
    }

    makeContent() {
        let theMovie = this.state.movie;
        let title = theMovie.original_title;
        let img = this.state.baseUri + theMovie.poster_path;
        let summary = theMovie.overview;
        let genres = theMovie.genres;
        let year = theMovie.release_date.slice(0, 4);
        let lang = theMovie.spoken_languages;

        return (
            <div id="movieDetailsContainer">
                <h1>{title}</h1>
                <div id="contentContainer" className="row">
                    <FigureImage src={img} alt={title} />
                    <div id="smallFacts">
                        <b>Genres:</b> {genres.map(genre => genre.name).join(", ")} <br/>
                        <b>Year: </b> {year} <br/>
                        <b>Languages: </b> {lang.map(lang => lang.name).join(", ")} <br/>
                        <div className="summaryDiv">
                            {summary}
                        </div>
                        <div id="lists">
                            <MovieLists movieId={this.props.match.params.movie_id} model={this.props.model} genres={genres.map(genre => genre.name)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    render() {
        if(this.props.model.getUser() === null){
            return <Redirect to="/"/>
        }
        let content =<div className="spinner"> </div>;

        if (this.state.status === "LOADED") {
            content = this.makeContent();
        }

        return (
            <div className="row" id="mainContainer">
                <Sidebar model={this.props.model}/>
                {content}
            </div>
        );
    }
}

export default withCookies(MovieDetails);