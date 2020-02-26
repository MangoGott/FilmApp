import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';
import Login from "./Login/Login";
import modelInstance from "./data/MovieModel";
import Home from "./Home/Home";
import "./App.css";
import { instanceOf } from "prop-types";
import MovieDetails from "./MovieDetails/MovieDetails";
import FindMovies from "./FindMovies/FindMovies";
import MyMovies from "./MyMovies/MyMovies";


class App extends Component {

    static propTypes={
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            title: "Balooba"
        };
    }

    render() {
        /*if the user is not logged in, always show the login page, else show the rest of the site*/
        let routes = <Login model={modelInstance}/>;

        if(modelInstance.getUser() !== null){
            routes =  <div><Route exact path="/" //component={Login} />
                             render={() => <Login model={modelInstance}/>}
                />
                <Route
            path="/home"
            render={() => <Home model={modelInstance} />}
            />
            <Route
                path="/details/:movie_id"
                render={props => <MovieDetails {...props} model={modelInstance}/>}
            />
            <Route
            path="/search"
            render={props => <FindMovies model={modelInstance}/>}
            />
            <Route
                path="/myMovies"
                render={() => <MyMovies model={modelInstance}/>}
            /></div>;
        }
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">{this.state.title}</h1>
                    <Route exact path="/" //component={Login} />
                           render={() => <Login model={modelInstance}/>}
                    />
                    <Route
                        path="/home"
                        render={() => <Home model={modelInstance} />}
                    />
                    <Route
                        path="/details/:movie_id"
                        render={props => <MovieDetails {...props} model={modelInstance}/>}
                    />
                    <Route
                        path="/search"
                        render={props => <FindMovies model={modelInstance}/>}
                    />
                    <Route
                        path="/myMovies"
                        render={() => <MyMovies model={modelInstance}/>}
                    />
                </header>
            </div>
        );
    }
}

export default withCookies(App);
