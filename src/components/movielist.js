import React, { Component } from 'react';
import {fetchMovies} from '../actions/movieActions';
import { setMovie } from '../actions/movieActions';
import {connect} from "react-redux";
import {ButtonGroup, ButtonToolbar, Image, ListGroupItem, Panel} from 'react-bootstrap'
import AddMovieForm from "./AddMovieForm";
import MovieCarousel from "./MovieCarousel";
import AddActorForm from "./AddActorForm";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import {LinkContainer} from "react-router-bootstrap";
var mongoose = require('mongoose');

const userStates = {
    NO_STATE : "no_state",
    ADD_MOVIE : "add_movie",
    FILTER_MOVIE : "filter_movie",
    NEW_MOVIE_SUBMITTED : "new_movie_submitted",
    ADD_ACTOR : "add_actor"
};

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
            userState: userStates.NO_STATE
        };
        this.updateNewMovie = this.updateNewMovie.bind(this);
        this.updateNewActor = this.updateNewActor.bind(this);
        this.buttonHandler = this.buttonHandler.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.postMovie = this.postMovie.bind(this);
        this.postActor = this.postActor.bind(this);
        this.changeGenres = this.changeGenres.bind(this);
        this.newPostMovie = this.newPostMovie.bind(this);
        this.newPostActor = this.newPostActor.bind(this);
    };

    changeGenres(event) {
        console.log("in change genres:")
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
                    userState: userStates.FILTER_MOVIE
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
                        changeGenres={this.changeGenres}
                    />
                );
            case 'filter_movies':
                break;
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
        dispatch(fetchMovies());
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