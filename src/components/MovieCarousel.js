import React, {Component} from "react";
import {Carousel, Image} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import StarRatings from "react-star-ratings";

class MovieCarousel extends Component {
    constructor(props) {
        super(props);
        console.log("Movie Carousel props");
        console.log(props);
    }

    render() {
        return (
            <Carousel onSelect={this.handleSelect}>
                {this.props.movies.map((movie) =>
                    <Carousel.Item key={movie._id}>
                        <div>
                            <LinkContainer to={'/movies/'+movie._id} onClick={()=>this.props.handleClick(movie)}>
                                <Image className="image" src={movie.image_url} thumbnail  />
                            </LinkContainer>
                        </div>
                        <Carousel.Caption>
                            <h3>{movie.title}</h3>
                            <StarRatings
                                rating={movie.avg_rating}
                                starRatedColor="blue"
                            />
                            <h4>{movie.genres.join(", ") + " (" + movie.year + ")"}</h4>
                        </Carousel.Caption>
                    </Carousel.Item>)}
            </Carousel>
        )
    }
}

export default MovieCarousel;