import React, { Component } from 'react';
import { fetchMovies } from '../actions/movieActions';
import { setMovie } from '../actions/movieActions';
import {connect} from "react-redux";
import {Image, ListGroupItem} from 'react-bootstrap'
import { Carousel } from 'react-bootstrap'
import { Glyphicon } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';
import StarRatings from "react-star-ratings";

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
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
    }

    render() {
        {console.log("props:")}
        {console.log(this.props)}
        {console.log("state:")}
        {console.log(this.state)}
        const MovieListCarousel= ({movieList}) => {
            if (!movieList) { // evaluates to true if currentMovie is null
                return <div>Loading...</div>;
            }
            return (
                    <Carousel onSelect={this.handleSelect}>
                        {movieList.map((movie) =>
                            <Carousel.Item key={movie._id}>
                                <div>
                                    <LinkContainer to={'/movies/'+movie._id} onClick={()=>this.handleClick(movie)}>
                                        <Image className="image" src={movie.image_url} thumbnail width="300" height="450" />
                                    </LinkContainer>
                                </div>
                                <Carousel.Caption>
                                    <h3>{movie.title}</h3>
                                    <StarRatings
                                        rating={movie.avg_rating}
                                        starRatedColor="blue"
                                    />
                                    <h4>{movie.genre + " (" + movie.year + ")"}</h4>
                                </Carousel.Caption>
                            </Carousel.Item>)}
                    </Carousel>
            )
        }

        return (
          <MovieListCarousel movieList={this.props.movies} />
        );
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movie.movies
    }
}

export default connect(mapStateToProps)(MovieList);