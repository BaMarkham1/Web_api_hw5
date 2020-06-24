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
            },
            reviewed: false
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.postReview = this.postReview.bind(this);
        this.changeRating = this.changeRating.bind(this);
    }

    changeRating( newRating, name ) {
        let updateDetails = Object.assign({}, this.state.review);
        updateDetails.rating = newRating;
        this.setState({
            review:updateDetails
        });
    }

    handleUpdate(event){
        console.log("event target:");
        console.log(event.target);
        console.log("event target id:");
        console.log(event.target.id);
        console.log("event target value:");
        console.log(event.target.value);
        let updateDetails = Object.assign({}, this.state.review);
        if(event.target.id === "rating"){
            updateDetails[event.target.id] = parseInt(event.target.value);
        }
        else {
            updateDetails[event.target.id] = event.target.value;
            console.log("update details object 1");
            console.log(updateDetails);
        }
        this.setState({
            review: updateDetails
        });
        console.log("Review");
        console.log(this.state.review);
        console.log("update details object 2");
        console.log(updateDetails);
    }

    /*

    handleUpdate(event){
        event.preventDefault();
        console.log("event target:");
        console.log(event.target);
        let updateDetails = Object.assign({}, this.state.review);
        updateDetails.quote = event.target.value;
        //updateDetails[event.target.id] = event.target.value;
        this.setState({
            review: updateDetails
        });

        console.log("review:")
        console.log(this.state.review);
    }

     */


    postReview(){
        console.log("props");
        console.log(this.props);
        console.log("state");
        console.log(this.state)
        const {dispatch} = this.props;
        this.state.review.movie_id = this.props.movieId;
        dispatch(postNewReview(this.state.review));
        //this.forceUpdate();
        this.setState({ state: this.state });
        this.setState({reviewed: true});
        dispatch(fetchMovie(this.props.movieId));
        let reviewArray = this.props.selectedMovie.reviews;
        let newReview = {name : this.state.review.name, quote : this.state.review.quote, rating : this.state.review.rating}
        reviewArray.unshift(newReview);
        this.setState({
            reviews: reviewArray
        });
    }

    componentDidMount() {
        console.log("component did mount");
        console.log("props:")
        console.log(this.props)
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));
        }
    }



    ReviewForm = () => {

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
                                      id="quote"
                                      key="review_text_area"
                            />
                    </div>
                </form>
            </div>
        )
    }



    render() {
        const ActorInfo = ({actors}) => {
            return actors.map((actor, i) =>
                <p key={i}>
                    <b>{actor.actor_name}</b> as {actor.char_name}
                </p>
            )
        };

        const ReviewField = (props) =>{
            console.log(props.title)
            console.log()
            return(
                <Form horizontal>
                    <h3>
                        <b>
                            Submit a Review for {props.title}
                        </b>
                    </h3>
                    <FormGroup controlId="rating">
                        <StarRatings
                            rating={this.state.review.rating}
                            starRatedColor="blue"
                            changeRating={this.changeRating}
                            name='rating'
                        />
                    </FormGroup>
                    <FormGroup controlId="quote">
                            <FormControl  type="review" onChange={this.handleUpdate} value={this.state.review.quote} placeholder="Write a review" />
                            <Button onClick={this.postReview}> Submit Review </Button>
                    </FormGroup>
                </Form>
            )
        }

        const StarRater = () => {
            return (
                <StarRatings
                    rating={this.state.rating}
                    starRatedColor="blue"
                    changeRating={this.changeRating}
                    name='rating'
                />
            );
        };

        const ReviewInfo = ({reviews}) => {
            return (
                reviews.map((review, i) =>
                <div>
                    <p>
                        <h4><b>{review.name}</b></h4>
                        <StarRatings
                            rating={review.rating}
                            starDimension="20px"
                            starSpacing="0px"
                            starRatedColor="blue"
                        />
                    </p>
                    <p key={i}>
                        {"\""+ review.quote +  "\""}
                    </p>
                    <br></br>
                </div>
                )
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
                  <Panel.Heading>
                      <h1>
                          <b>
                            {currentMovie.title}
                          </b>
                          {" (" + currentMovie.year + ")"}
                      </h1>
                      {currentMovie.genre}
                  </Panel.Heading>
                  <Panel.Body><Image className="image" src={currentMovie.image_url} thumbnail width="330" height="400"/></Panel.Body>
                  <ListGroup>
                      <ListGroupItem>
                          <button>Edit movie details</button>
                      </ListGroupItem>
                      <ListGroupItem>
                          <h3>
                              <b>
                                  {currentMovie.title} roles:
                              </b>
                          </h3>
                          <ActorInfo
                              actors={currentMovie.actors}
                          />
                      </ListGroupItem>
                      <ListGroupItem>
                          <h3>
                              <b>Community Rating: {currentMovie.avg_rating}</b>
                          </h3>
                          <StarRatings
                              rating={currentMovie.avg_rating}
                              starRatedColor="blue"
                          />
                      </ListGroupItem>
                  </ListGroup>
                  <Panel.Body>{this.state.reviewed ? <h4>Thank you for your submission!</h4> : <ReviewField title={currentMovie.title} />}</Panel.Body>
                  <Panel.Body>
                      <h3>
                          <b>
                              {currentMovie.title} reviews:
                          </b>
                      </h3>
                      <ReviewInfo
                          reviews={currentMovie.reviews}
                      />
                  </Panel.Body>
              </Panel>
            );
        };

        return (
            <DetailInfo currentMovie={this.props.selectedMovie} />
        )
    }
}


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

/*

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