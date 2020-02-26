import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { withCookies  } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import MovieCarousel from '../MovieCarousel/MovieCarousel'

import "./MyMovies.css";
//a movie ID that works for testing etc: 299537 (Captain Marvel)
class MyMovies extends Component {

    constructor(props) {
        super(props);

        this.state = {
            status: "LOADING",
            movie: '',
            baseUri: "https://image.tmdb.org/t/p/w500"
        }
    }

    componentDidMount() {
        this.setState({
            status:"LOADED"
        });

        this.props.model.addObserver(this);
    }

    componentWillUnmount() {
        this.props.model.removeObserver(this);
    }

    createContent() {
        let lists = this.props.model.getAllMovieLists();
        console.log(lists == ""); //note to self: DO NOT change to ===
        console.log(lists);
        if(lists != "") { //yes, this works, don't change it.
            return (
                lists.map(list => (<MovieCarousel list={list} model={this.props.model} key={list.name}/>))
            );
        }

        return(<div className="nothingHereDiv">
            <h3>There's nothing here...</h3>
        </div>);
        }



    render() {
        console.log("myMovies getUser: ", this.props.model.getUser());
        if(this.props.model.getUser() === null){
            return <Redirect to="/"/>
        }
        let carousels = "no info";

        if(this.state.status === "LOADED"){
            carousels = this.createContent();
        }

        return (
            <div className="row" id="mainContainer">
                <Sidebar model={this.props.model}/>
                <div className="content">
                    <h1>My Movies</h1>
                    {carousels}
                </div>
            </div>
        );
    }
}

export default withCookies(MyMovies);