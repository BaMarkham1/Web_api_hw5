import StarRatings from 'react-star-ratings';
import React, { Component }  from 'react';
import {connect} from "react-redux";
import {
    Glyphicon,
    Panel,
    ListGroup,
    ListGroupItem,
    FormGroup,
    Col,
    ControlLabel,
    FormControl,
    Form,
    Button
} from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import {fetchMovie, fetchMovies, postNewReview} from "../actions/movieActions";
import PanelBody from "react-bootstrap/lib/PanelBody";
import {submitLogin} from "../actions/authActions";

//support routing by creating a new component

class Movie extends Component {

    constructor(props) {
        super(props);
        console.log("props in constructor:")
        console.log(this.props)
        this.state = {
            review: {
                name: localStorage.getItem('username'),
                quote: '',
                rating: 0,
                movie_id: 0
                //movie_id: this.props.selectedMovie._id,
            }
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        //this.postReview = this.postReview.bind(this);
    }


    handleUpdate(event){
        event.preventDefault();
        console.log("event target:");
        console.log(event.target);
        let updateDetails = Object.assign({}, this.state.review);
        updateDetails.quote = event.target.value;
        this.setState({
            review: updateDetails
        });

        console.log("review:")
        console.log(this.state.review);
    }

    /*
    postReview(){
        const {dispatch} = this.props;
        this.state.review.movie_id = this.props.movieId;
        dispatch(postNewReview(this.state.review));
    }
     */

    componentDidMount() {
        console.log("component did mount");
        console.log("props:")
        console.log(this.props)
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));
        }
    }

    render() {
        const ActorInfo = ({actors}) => {
            return actors.map((actor, i) =>
                <p key={i}>
                    <b>{actor.actor_name}</b> as {actor.char_name}
                </p>
            )
        };

        const ReviewForm = () => {
            return (
                <div>
                    <form className="field">
                        <h3>
                            Post a review for this movie
                        </h3>
                        <label
                            className="label">Review
                        </label>
                        <div className="control">
                            <textarea className="textarea"
                                      type="text"
                                      name="quote"
                                      value={this.state.review.quote}
                                      onChange={this.handleUpdate}
                            />
                        </div>
                    </form>
                </div>
            )
        }

        const ReviewInfo = ({reviews}) => {
            return reviews.map((review, i) =>
                <p key={i}>
                    <b>{review.name}</b> {review.quote}
                    <Glyphicon glyph={'star'} /> {review.rating}
                </p>
            )
        };

        const DetailInfo = ({currentMovie}) => {
            if (!currentMovie) { //if not could still be fetching the movie
                return <div>Loading...</div>;
            }
            console.log("currentMovie:")
            console.log(currentMovie)
            return (
              <Panel className="panel" key={345}>
                  <Panel.Heading>Movie Detail</Panel.Heading>
                  <Panel.Body><Image className="image" src={currentMovie.image_url} thumbnail width="330" height="400"/></Panel.Body>
                  <ListGroup>
                      <ListGroupItem>{currentMovie.title}</ListGroupItem>
                      <ListGroupItem><ActorInfo actors={currentMovie.actors} />  </ListGroupItem>
                      <ListGroupItem><h4><Glyphicon glyph={'star'}/> {currentMovie.avg_rating} </h4></ListGroupItem>
                  </ListGroup>
                  <Panel.Body><ReviewInfo reviews={currentMovie.reviews} /></Panel.Body>
                  <div>
                      <form className="field">
                          <h3>
                              Post a review for this movie
                          </h3>
                          <label
                              className="label">Review
                          </label>
                          <div className="control">
                            <textarea className="textarea"
                                      key={123}
                                      type="text"
                                      name="quote"
                                      value={this.state.review.quote}
                                      onChange={this.handleUpdate}
                            />
                          </div>
                      </form>
                  </div>
              </Panel>
            );
        };

        return (
            <DetailInfo currentMovie={this.props.selectedMovie} />
        )
    }
}

/*
class ReviewForm extends Component {
    constructor(props) {
        super(props);
        console.log("props:")
        console.log(props)
        //this.handleChange = this.handleChange.bind(this);
    }


    render() {
        console.log("quote:");
        console.log(this.props.quote);
        return (
            <div>
                <form class="field">
                    <h3>
                        Post a review for this movie
                    </h3>
                    <label
                        className="label">Review
                    </label>
                    <div className="control">
                        <textarea className="textarea" type="text" name="quote" value={this.props.quote} onChange={this.props.onChange}/>
                    </div>
                </form>
            </div>
        )
    }
}



class ReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: "",
            rating: 0,
            movie_id : props.movie_id,
            movie_title :  props.movie_title,
            name : props.username
        };
        console.log("props in reviewForm:")
        console.log(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeRating = this.changeRating.bind(this);
        this.postReview = this.postReview.bind(this);
    }

    postReview(){
        const {dispatch} = this.state;
        //this.state.review.movie_id = this.props.movieId;
        dispatch(postNewReview(this.state));
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    changeRating( newRating, name ) {
        this.setState({
            rating: newRating
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.postReview();
        console.log("form submitted. State:");
        console.log(this.state);
    }

    render() {
        const StarRater = () => {
            return(
                <div>
                    <StarRatings
                        rating={this.state.rating}
                        starRatedColor="blue"
                        changeRating={this.changeRating}
                        name='rating'
                    />
                </div>
            )
        };

        return (
            <div className="field">
                <form onSubmit={this.handleSubmit}>
                    <h3>Post a review for {this.state.movie_title}</h3>
                    <label
                        className="Label">Rating
                    </label>
                    <div className="control">
                        <StarRater/>
                    </div>
                    <label
                        className="label">Review
                    </label>
                    <div className="control">
                        <textarea className="textarea" type="text" name="quote" value={this.state.quote} onChange={this.handleChange}/>
                    </div>
                    <button>
                        Submit Review
                    </button>
                </form>
            </div>
        );
    }
}

/*
class StarRater extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 0
        };
        this.changeRating = this.changeRating.bind(this);
    }

    changeRating( newRating, name ) {
        this.setState({
            rating: newRating
        });
    }

    render() {
        // rating = 2;
        return (
            <StarRatings
                rating={this.state.rating}
                starRatedColor="blue"
                changeRating={this.changeRating}
                name='rating'
            />
        );
    }
}
*/

const mapStateToProps = (state, ownProps) => {
    console.log("map state to props called");
    console.log("state");
    console.log(state);
    console.log("ownProps");
    console.log(ownProps);
    return {
        selectedMovie: state.movie.selectedMovie,
        movieId: ownProps.match.params.movieId
    }
}

export default withRouter(connect(mapStateToProps)(Movie));