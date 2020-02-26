import ObservableModel from "./ObservableModel";
import { withCookies} from 'react-cookie';


const util = require('util');


const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/";
const genreList = [
    {
        "id": 28,
        "name": "Action",
        "amount": 0
    },
    {
        "id": 12,
        "name": "Adventure",
        "amount": 0
    },
    {
        "id": 16,
        "name": "Animation",
        "amount": 0
    },
    {
        "id": 35,
        "name": "Comedy",
        "amount": 0
    },
    {
        "id": 80,
        "name": "Crime",
        "amount": 0
    },
    {
        "id": 99,
        "name": "Documentary",
        "amount": 0
    },
    {
        "id": 18,
        "name": "Drama",
        "amount": 0
    },
    {
        "id": 10751,
        "name": "Family",
        "amount": 0
    },
    {
        "id": 14,
        "name": "Fantasy",
        "amount": 0
    },
    {
        "id": 36,
        "name": "History",
        "amount": 0
    },
    {
        "id": 27,
        "name": "Horror",
        "amount": 0
    },
    {
        "id": 10402,
        "name": "Music",
        "amount": 0
    },
    {
        "id": 9648,
        "name": "Mystery",
        "amount": 0
    },
    {
        "id": 10749,
        "name": "Romance",
        "amount": 0
    },
    {
        "id": 878,
        "name": "Science Fiction",
        "amount": 0
    },
    {
        "id": 10770,
        "name": "TV Movie",
        "amount": 0
    },
    {
        "id": 53,
        "name": "Thriller",
        "amount": 0
    },
    {
        "id": 10752,
        "name": "War",
        "amount": 0
    },
    {
        "id": 37,
        "name": "Western",
        "amount": 0
    }
];


let storage = window.localStorage;

class MovieModel extends ObservableModel {
    constructor() {
        super();
        this._user = null;
        if(storage.getItem("user") !== null){
            this._user = JSON.parse(storage.getItem("user"));
            console.log({ConstructorUser: this._user});
        }
    }

    storeUser(){
        let postUrl = '/api/update/'+ this._user._id;
        fetch(postUrl, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this._user)
        });

    }

    getUser(){
        console.log({GetUser: this._user});
        return this._user;
    }

    setUser(user){
        storage.setItem("user", JSON.stringify(user));
        console.log({user: this._user});
        this.storeUser(this._user.user);
    }

    login(userName){
        let loginUrl = '/api/login/'+ userName;
        console.log(loginUrl);
        return fetch(loginUrl).
            then(this.processResponse).
            then(fetchUser => {
                console.log({userBefore: this._user});
                this._user=fetchUser.result[0];
                console.log({userAfter: this._user});
            storage.setItem("user", JSON.stringify(this._user));
            console.log(this._user);
            return true});
    }

    getIdByGenre(genre) {
        return genreList.filter(elem =>
            elem.name === genre
        )[0].id;
    }

    getGenreById(id){
        return genreList.filter(elem =>
            elem.name === id
        )[0].name;
    }

    getMovieList(listName){
        console.log({user: this._user});
        if(this._user.movieLists.length > 0){
            let movieList = this._user.movieLists.filter(elem =>
                elem.name === listName
            );
            if(movieList.length !== 1 ){
                return null;
            }else{
                return movieList[0];
            }
        }else{
            return null;
        }
    }

    searchMovies(searchterm){

        let searchUrl = BASE_URL + "search/movie?api_key="+ API_KEY +"&language=en-US&query="+ searchterm +"&page=1";
        return fetch(searchUrl).then(this.processResponse);
    }

    getAllMovieLists(){
        console.log({user: this._user});
        return this._user.movieLists ? this._user.movieLists : [];
    }
    createMovieList(listName){
        console.log(listName);
        let exists = this.getMovieList(listName) !== null;

        if(exists){
            console.log("ListName Already exists");
            return;
        }else{
            let movieList = { "name" : listName,
                "movies" : []
            };
            console.log({user: this._user});
            this._user.movieLists.push(movieList);
            //this.storeUser();
            console.log("list " + listName + " created");
            console.log(typeof listName);
            return;
        }
    }

    isInList(movie_id, listName){
        let list = this.getMovieList(listName);
        if(list === null) return false;
        for(let i=0; i < list.movies.length; i++){
            //console.log("id: " + list.movies[i]);
            if(list.movies[i].id === movie_id) return true;
        }

        return false;
    }

    addToList(listName, movie_id, genres, obj){
        let list = this.getMovieList(listName);
        if(list === null || list.name !== listName){
            this.createMovieList(listName);
            console.log("creating " + listName);
            list = this.createMovieList(listName);
        }

        let movieObj = {
            id: movie_id,
            genres: genres,
        };
        list.movies.push(movieObj);
        //console.log(list.movies);
        console.log({user: this._user});
        this.setUser(this._user);
        obj.update("add");
        // this.notifyObservers("movieLists");
    }


    removeFromList(listName, movie_id, obj) {
        let list = this.getMovieList(listName);
        for (let i = 0; i < list.movies.length; i++) {
            if (list.movies[i].id === movie_id) {
                list.movies.splice(i, 1);
                console.log({user: this._user});
                this.setUser(this._user);
                obj.update("remove");
                //this.notifyObservers("movieLists");
            }
        }
    }


    getGenre(genre_id){
        let url = BASE_URL + "discover/movie";
        let params="api_key=" + API_KEY + "&sort_by=popularity.desc&page=1&with_genres="+genre_id;
        //return this.fetchFromDB(url, params);
        return fetch(url + "?" + params).then(this.processResponse);
    }

    getMovie(movie_id){
        let url = BASE_URL + "movie/" + movie_id;
        let params = "api_key=" + API_KEY;

        return fetch(url + "?" + params).then(this.processResponse);
    }

    fetchFromDB(url, params){
        return fetch(url + "?" + params).then(this.processResponse);
    }


    processResponse(response) {
        console.log(response.url);
        if (response.ok) {
            return response.json();
        }
        throw response;
    }
}

// Export an instance of DinnerModel
const modelInstance = new MovieModel();
export default withCookies(modelInstance);