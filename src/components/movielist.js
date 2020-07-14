import React, { Component } from 'react';
import {fetchMovies, newPostMovie} from '../actions/movieActions';
import { setMovie } from '../actions/movieActions';
import {connect} from "react-redux";
import {ButtonGroup, ButtonToolbar, Image, ListGroupItem, Panel} from 'react-bootstrap'
import AddMovieForm from "./AddMovieForm";
import MovieCarousel from "./MovieCarousel";

const userStates = {
    NO_STATE : "no_state",
    ADD_MOVIE : "add_movie",
    FILTER_MOVIE : "filter_movie",
};

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //for add new movie
            newMovie : {
                title : "",
                year : "",
                image_url: "",
                selectedGenres: [],
                trailer_url: "",
                genres:[]
            },
            userState: userStates.NO_STATE
        };
        this.updateNewMovie = this.updateNewMovie.bind(this);
        this.buttonHandler = this.buttonHandler.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.postMovie = this.postMovie.bind(this);
        this.changeGenres = this.changeGenres.bind(this);
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
        updatedMovie[event.target.id] = event.target.value;
        this.setState({
            newMovie : updatedMovie
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
        this.setState({
            newMovie : updatedDetails
        }, () => {
                console.log("new movie in post movie:");
                console.log(this.state.newMovie);
                dispatch(newPostMovie(this.state.newMovie));
                console.log("resetting new movie")
                let newMovie = {
                    title: "",
                    year: "",
                    image_url: "",
                    selectedGenres: [],
                    trailer_url: "",
                    genres:[]
                };
                this.setState({
                    newMovie: newMovie
                })
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
        dispatch(setMovie(movie));
    };



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
                            <button id="add_movie" class="btn btn-primary btn-sm" onClick={this.buttonHandler}>Add new movie</button>
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