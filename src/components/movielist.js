import React, { Component } from 'react';
import {fetchMovies} from '../actions/movieActions';
import { setMovie } from '../actions/movieActions';
import {connect} from "react-redux";
import {ButtonGroup, ButtonToolbar, Image, ListGroupItem, Panel} from 'react-bootstrap'
import AddMovieForm from "./AddMovieForm";
import MovieCarousel from "./MovieCarousel";
import AddActorForm from "./AddActorForm";
import MovieFilterForm from "./MovieFilterForm";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import {LinkContainer} from "react-router-bootstrap";
var mongoose = require('mongoose');
const querystring = require('querystring');

const userStates = {
    NO_STATE : "no_state",
    ADD_MOVIE : "add_movie",
    FILTER_MOVIES : "filter_movies",
    NEW_MOVIE_SUBMITTED : "new_movie_submitted",
    ADD_ACTOR : "add_actor"
};

function getFilterQueryString(filters) {
    console.log(filters)
    let sortMap = {
        "Year Released" : "year",
        "Rating" : "avg_rating",
        "Title" : "title"
    };
    let queryObject = {
        minRating : filters.minRating,
        maxRating : filters.maxRating,
        minYear : filters.minYear,
        maxYear : filters.maxYear,
        sort : sortMap[filters.selectedSort]
    };
    if (filters.genres.length > 0) {
        queryObject.genre = filters.genres;
    }
    if (filters.ascendingOrder == true) {
        queryObject.ascendingOrder = true;
    }
    if (filters.excludeUnreviewed == true) {
        queryObject.excludeUnreviewed = true;
    }
    console.log("Query object");
    console.log(queryObject);
    let queryString = "?" + querystring.stringify(queryObject);
    console.log("Query string:");
    console.log(queryString);
    return queryString;
}

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //for add new movie
            newMovie : {
                _id : "",
                title : "",
                year : "",
                image_url: "",
                selectedGenres: [],
                trailer_url: "",
                genres:[]
            },
            newActor : {
                name : "",
                image_url : ""
            },
            filters : {
                minRating : 0,
                maxRating : 5,
                minYear : 1888,
                maxYear : 2020,
                genres : [],
                selectedGenres : [],
                sortOptions : ["Rating", "Year Released", "Title"],
                selectedSort : "Rating",
                ascendingOrder : false,
                excludeUnreviewed : false
            },
            userState: userStates.NO_STATE
        };
        this.updateNewMovie = this.updateNewMovie.bind(this);
        this.updateNewActor = this.updateNewActor.bind(this);
        this.buttonHandler = this.buttonHandler.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.postMovie = this.postMovie.bind(this);
        this.postActor = this.postActor.bind(this);
        this.changeNewMovieGenres = this.changeNewMovieGenres.bind(this);
        this.changeFilteredGenres = this.changeFilteredGenres.bind(this);
        this.newPostMovie = this.newPostMovie.bind(this);
        this.newPostActor = this.newPostActor.bind(this);
        this.changeSlider = this.changeSlider.bind(this);
        this.updateSelectedSort = this.updateSelectedSort.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
    };

    applyFilters() {
        console.log("apply filters called");
        console.log("filters:");
        console.log(this.state.fiters);
        this.setState({userState: userStates.NO_STATE});
        const {dispatch} = this.props;
        let genres =[];
        if (this.state.filters.selectedGenres) genres = this.state.filters.selectedGenres.map( genre => genre.value);
        console.log("genres:");
        console.log(genres);
        let updatedFilters = this.state.filters;
        updatedFilters.genres = genres;
        this.setState({
            filters : updatedFilters
        }, () => {
            console.log("updated filters:");
            console.log(this.state.filters);
            let queryString = getFilterQueryString(this.state.filters);
            dispatch(fetchMovies(queryString));
        })
    }



    toggleCheckbox(event) {
        console.log("in update selected sort:")
        console.log("event:");
        console.log(event);
        console.log("event target:");
        console.log(event.target);
        console.log("event target value");
        console.log(event.target.value);
        console.log("event target id");
        console.log(event.target.id);
        let updatedFilters = Object.assign([], this.state.filters);
        updatedFilters[event.target.id] = !this.state.filters[event.target.id]
        this.setState({
            filters : updatedFilters
        });
    }

    updateSelectedSort(event) {
        console.log("in update selected sort:")
        console.log("event:");
        console.log(event);
        console.log("event target:");
        console.log(event.target);
        console.log("event target value");
        console.log(event.target.value);
        console.log("event target id");
        console.log(event.target.id);
        let updatedFilters = Object.assign([], this.state.filters);
        updatedFilters[event.target.id] = event.target.value;
        updatedFilters[event.target.id]= event.target.value;
        this.setState({
            filters: updatedFilters
        }, () => {
            console.log("new filters:");
            console.log(this.state.filters);
        })
    }

    changeSlider(event) {
        let updatedFilter = Object.assign({}, this.state.filters);
        updatedFilter[event.target.id] = event.target.value;
        this.setState({
            filters : updatedFilter
        })
    }

    changeNewMovieGenres(event) {
        console.log("in new movie change genres:")
        console.log("event:");
        console.log(event);
        let updatedDetails = this.state.newMovie;
        updatedDetails.selectedGenres = event;
        this.setState({
            newMovie : updatedDetails
        }, () => {
            console.log("new movie:");
            console.log(this.state.newMovie);
        });
    }

    changeFilteredGenres(event) {
        console.log("in filtered change genres:")
        console.log("event:");
        console.log(event);
        let updatedFilters = this.state.filters;
        updatedFilters.selectedGenres = event;
        this.setState({
            filters : updatedFilters
        }, () => {
            console.log("new filters:");
            console.log(this.state.filters);
        });
    }

    updateNewMovie(event) {
        let updatedMovie = Object.assign({}, this.state.newMovie);
        if (event.target.id == "year") {
            updatedMovie[event.target.id] = parseInt(event.target.value);
        }
        else {
            updatedMovie[event.target.id] = event.target.value;
        }
        this.setState({
            newMovie : updatedMovie
        });
    }

    updateNewActor(event) {
        let updatedActor = Object.assign({}, this.state.newActor);
        updatedActor[event.target.id] = event.target.value;
        this.setState({
            newActor : updatedActor
        });
    }

    buttonHandler(button) {
        switch (button.target.id) {
            case 'add_movie':
                console.log("add movie");
                this.setState({
                    userState: userStates.ADD_MOVIE
                });
                break;
            case 'filter_movies':
                console.log("filter movies");
                this.setState({
                    userState: userStates.FILTER_MOVIES
                });
                break;
            case 'new_movie_submitted':
                console.log("new movie submitted");
                this.setState({
                    userState: userStates.NEW_MOVIE_SUBMITTED
                });
                break;
            case 'add_actor':
                console.log("add actor");
                this.setState({
                    userState: userStates.ADD_ACTOR
                });
                break;
            default:
                console.log("no cases met");
                this.setState({
                    userState: userStates.NO_STATE
                });
                break;
        }
    }

    postMovie() {
        console.log("post movie called");
        console.log("new movie details:");
        console.log(this.state.newMovie);
        this.setState({userState: userStates.NO_STATE});
        const {dispatch} = this.props;
        let genres = this.state.newMovie.selectedGenres.map( genre => genre.value);
        console.log("genres:");
        console.log(genres);
        let updatedDetails = this.state.newMovie;
        updatedDetails.genres = genres;
        updatedDetails._id = mongoose.Types.ObjectId();
        this.setState({
            newMovie : updatedDetails
        }, () => {
                console.log("new movie in post movie:");
                console.log(this.state.newMovie);
                dispatch(this.newPostMovie(this.state.newMovie));
            })
    }

    postActor() {
        console.log("post actor called");
        console.log("new actor:");
        console.log(this.state.newActor);
        this.setState({userState: userStates.NO_STATE});
        const {dispatch} = this.props;
        let updatedDetails = this.state.newActor;
        updatedDetails._id = mongoose.Types.ObjectId();
        this.setState({
            newActor : updatedDetails
        }, () => {
            console.log("new actor in post actor:");
            console.log(this.state.newActor);
            dispatch(this.newPostActor(this.state.newActor));
        })
    }

    actionSwitch() {
        console.log("user state:");
        console.log(this.state.userState);
        switch (this.state.userState) {
            case 'add_movie':
                return (
                    <AddMovieForm
                        newMovie={this.state.newMovie}
                        updateNewMovie={this.updateNewMovie}
                        postMovie={this.postMovie}
                        buttonHandler={this.buttonHandler}
                        changeGenres={this.changeNewMovieGenres}
                    />
                );
            case 'filter_movies':
                return (
                    <MovieFilterForm
                        filters={this.state.filters}
                        changeSlider={this.changeSlider}
                        changeGenres={this.changeFilteredGenres}
                        buttonHandler={this.buttonHandler}
                        updateSelectedSort={this.updateSelectedSort}
                        toggleCheckbox={this.toggleCheckbox}
                        applyFilters={this.applyFilters}
                    />
                );
            case 'new_movie_submitted':
                return (
                    <div>
                        <p>Movie posted!</p>
                        <LinkContainer to={'/movies/'+ this.state.newMovie._id} onClick={()=>this.handleClick(this.state.newMovie)}>
                            <button>See New Movie</button>
                        </LinkContainer>
                    </div>
                );

            case 'add_actor':
                return (
                    <AddActorForm
                        newActor={this.state.newActor}
                        updateNewActor={this.updateNewActor}
                        postActor={this.postActor}
                    />
                );
            default:
                break;
        }
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchMovies(""));
    }

    handleSelect(selectedIndex, e) {
        const {dispatch} = this.props;
        dispatch(setMovie(this.props.movies[selectedIndex]));
    }

    handleClick = (movie) => {
        const {dispatch} = this.props;
        console.log("movie after click");
        console.log(movie);
        dispatch(setMovie(movie));
    };

    newPostMovie(movieDetails){
        const env = runtimeEnv();
        console.log(movieDetails);
        return dispatch => {
            console.log("movie to be posted:");
            console.log(movieDetails);
            return fetch(`${env.REACT_APP_API_URL}/movies/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(movieDetails),
                mode: 'cors'})
                .then( (response) => {
                    console.log(response);
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    console.log("response:")
                    console.log(response.json);
                    if (response.status == 200) {
                        console.log("status was 200");
                        console.log("new movie id");
                        console.log(movieDetails._id.toString());
                        this.setState({
                            userState: userStates.NEW_MOVIE_SUBMITTED
                        });
                    }
                    return response.json;
                })
                .catch( (e) => {
                    console.log(e)
                })
        }
    }

    newPostActor(newActor){
        const env = runtimeEnv();
        console.log(newActor);
        return dispatch => {
            console.log("actor to be posted:");
            console.log(newActor);
            return fetch(`${env.REACT_APP_API_URL}/actor/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(newActor),
                mode: 'cors'})
                .then( (response) => {
                    console.log(response);
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    console.log("response:")
                    console.log(response.json);
                    if (response.status == 200) {
                        console.log("status was 200");
                        console.log("new actor id");
                        console.log(newActor._id.toString());
                        //this.setState({
                            //userState: userStates.NEW_ACTOR_SUBMITTED
                        //});
                    }
                    return response.json;
                })
                .catch( (e) => {
                    console.log(e)
                })
        }
    }

    render() {
        console.log("props:");
        console.log(this.props);
        console.log("state:");
        console.log(this.state);
        return (
            <Panel className="panel">
                <Panel.Body>
                    <MovieCarousel
                        movies={this.props.movies}
                        handleClick={this.handleClick}
                    />
                </Panel.Body>
                <Panel.Body>
                    <ButtonToolbar>
                        <ButtonGroup>
                            <button
                                id="add_movie"
                                class="btn btn-primary btn-sm"
                                onClick={this.buttonHandler}>
                                Add New Movie
                            </button>
                            <button
                                id="add_actor"
                                className="btn btn-primary btn-sm"
                                onClick={this.buttonHandler}>
                                Add New Actor
                            </button>
                            <button
                                id="filter_movies"
                                className="btn btn-primary btn-sm"
                                onClick={this.buttonHandler}>
                                Filter Movies
                            </button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Panel.Body>
                {this.actionSwitch()}
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movie.movies
    }
}

export default connect(mapStateToProps)(MovieList);