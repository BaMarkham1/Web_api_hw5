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
import {fetchMovie, fetchMovies, postNewReview, newPutMovie} from "../actions/movieActions";
import PanelBody from "react-bootstrap/lib/PanelBody";
import {submitLogin} from "../actions/authActions";
import ReactPlayer from "react-player"

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
                movie_id: 0,
                //movie_id: this.props.selectedMovie._id,
            },
            reviewed: false,
            empty_photo : "data:image/jpeg;base64,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",
            editingMovieDetails: false,
            changesSubmitted: false,
            postingReview: false,
            seeReviews: false
        };
        if (props.selectedMovie) {
            this.state.movie = props.selectedMovie
            console.log("set movie details in state!")
            console.log(this.state.movie)
            }
        this.handleUpdate = this.handleUpdate.bind(this);
        this.postReview = this.postReview.bind(this);
        this.putMovie = this.putMovie.bind(this);
        this.changeRating = this.changeRating.bind(this);
        this.updateReview = this.updateReview.bind(this);
        this.updateEditing = this.updateEditing.bind(this);
        this.updateDetails = this.updateDetails.bind(this);
        this.startPostingReview = this.startPostingReview.bind(this);
        this.hidePostReview = this.hidePostReview.bind(this);
        this.hideDetailEditing = this.hideDetailEditing.bind(this);
        this.toggleSeeingReviews = this.toggleSeeingReviews.bind(this);
    }

    toggleSeeingReviews() {
        this.setState({seeReviews : !this.state.seeReviews})
    }

    hidePostReview() {
        this.setState( {
            postingReview: false
        })
    }

    hideDetailEditing() {
        this.setState({
            editingMovieDetails: false
        })
    }

    startPostingReview() {
        this.setState({
            postingReview: true
        })
    }

    setDetails() {
        let movieDetails = {
            movie_id : this.props.movieId,
            title : this.props.selectedMovie.title,
            year : this.props.selectedMovie.year,
            image_url : this.props.selectedMovie.image_url,
            genre : this.props.selectedMovie.genre
        }
        this.setState({
            movieDetails: movieDetails
        })
    }

    updateEditing() {
        console.log("changing state");
        console.log(this.state.editingMovieDetails);
        this.setDetails();
        this.setState({editingMovieDetails : !this.state.editingMovieDetails})
    }

    updateReview(event) {
        let updateDetails = Object.assign({}, this.state.review);
        updateDetails[event.target.id] = event.target.value;
        this.setState({
            review:updateDetails
        });
    }

    updateDetails(event) {
        let updateDetails = Object.assign({}, this.state.movieDetails);
        updateDetails[event.target.id] = event.target.value;
        this.setState({
            movieDetails:updateDetails
        });
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

    putMovie() {
        console.log("put movie called");
        console.log("movie details:");
        console.log(this.state.movieDetails);
        this.setState({changesSubmitted : true })
        const {dispatch} = this.props;
        dispatch(newPutMovie(this.state.movieDetails));
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



    ReviewForm3 = () => {
        return (
            <Form horizontal>
                <h3>
                    <b>
                        Submit a Review for {this.props.selectedMovie.title}
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
                                    <textarea
                                        id="quote" onChange={this.updateDetails} value={this.state.review.quote} type="quote" placeholder="Write a review"
                                    />
                </FormGroup>
                <FormGroup>
                    <Button onClick={this.postReview}> Submit Review </Button>
                </FormGroup>
            </Form>
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

        const ReviewField2 = () => {
            return (
                <Form horizontal>
                    <h3>
                        <b>
                            Submit a Review for {this.props.selectedMovie.title}
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
                                    <textarea
                                        id="quote" onChange={this.updateDetails} value={this.state.review.quote} type="quote" placeholder="Write a review"
                                    />
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={this.postReview}> Submit Review </Button>
                    </FormGroup>
                </Form>
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
                        <Col componentClass={ControlLabel}>
                            Review
                        </Col>
                        <Col>
                            <FormControl  type="review" onChange={this.handleUpdate} value={this.state.review.quote} placeholder="Write a review" />
                            <Button onClick={this.postReview}> Submit Review </Button>
                        </Col>
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
                    <p key={review.quote}>
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
              <Panel className="panel">
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
                  <listGroup>
                      <Panel.Body>
                          <Form horizontal>
                              <FormGroup controlId="quote">
                                  <Col componentClass={ControlLabel} sm={2}>
                                      Review
                                  </Col>
                                  <Col sm={10}>
                                      <FormControl
                                          onChange={this.updateDetails} value={this.state.review.quote} type="quote" placeholder="Write a review"
                                      />
                                  </Col>
                              </FormGroup>
                          </Form>
                      </Panel.Body>
                  </listGroup>
                  <Panel.Body>{this.state.reviewed ? <h4>Thank you for your submission!</h4> : <ReviewField2 />}</Panel.Body>
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

        const MovieHeading = () => {
            return (
                <div>
                    <h1>
                        <b>
                            {this.props.selectedMovie.title}
                        </b>
                        {" (" + this.props.selectedMovie.year + ")"}
                    </h1>
                    {this.props.selectedMovie.genre}
                </div>
            )
        };

        return (
            <Panel className="panel">
                <Panel.Heading>
                    {this.props.selectedMovie ? <MovieHeading/> : <p>loading details...</p>}
                </Panel.Heading>
                <Panel.Body><Image className="image" src={this.props.selectedMovie ? this.props.selectedMovie.image_url : this.state.empty_photo} thumbnail width="330" height="400"/></Panel.Body>
                <ListGroup>
                    <ListGroupItem>
                        <h3>
                            <b>Community Rating: {this.props.selectedMovie ? this.props.selectedMovie.avg_rating + " stars" : <p>...loading rating</p>}</b>
                        </h3>
                        <StarRatings
                            rating={this.props.selectedMovie ? this.props.selectedMovie.avg_rating : 0}
                            starRatedColor="blue"
                        />
                    </ListGroupItem>
                    <ListGroupItem>
                        <h3>
                            <b>
                                {this.props.selectedMovie ? this.props.selectedMovie.title + " roles" : <p>..loading roles</p> }
                            </b>
                        </h3>
                        {
                            this.props.selectedMovie ?
                                <ActorInfo
                                    actors={this.props.selectedMovie.actors}
                                />
                                : <p>...loading roles</p>
                        }
                    </ListGroupItem>
                    {/*
                      <ListGroupItem>
                            <Panel.Body>
                                <h3>Watch Trailer:</h3>
                                <ReactPlayer
                                    url="https://www.youtube.com/watch?v=lAxgztbYDbs"
                                />
                            </Panel.Body>
                        </ListGroupItem>
                        */}
                </ListGroup>
                <ListGroupItem> {
                    this.state.editingMovieDetails === true ? (this.state.changesSubmitted === false?
                            <MovieEditForm movie={this.state.movieDetails} updateDetails={this.updateDetails} putMovie={this.putMovie} hideDetailEditing={this.hideDetailEditing}/> : <p> Changes submitted, refresh to see them </p>
                        )
                        : <button onClick={this.updateEditing}> Edit movie details</button>
                }
                </ListGroupItem>
                <ListGroup>
                    <Panel.Body>{
                        this.state.postingReview === false ?
                            <button
                                onClick={this.startPostingReview}
                            >
                                Post a Review
                            </button>
                            :
                            (
                            this.state.reviewed ?
                                <h4>Thank you for your submission!</h4>
                                :
                                <ReviewForm movie={this.props.selectedMovie} review={this.state.review} updateReview={this.updateReview} changeRating={this.changeRating} postReview={this.postReview} putMovie={this.putMovie} hidePostReview={this.hidePostReview}/>
                                )
                    }
                    </Panel.Body>
                </ListGroup>
                <Panel.Body>
                    { this.state.seeReviews ?
                        <div>
                            <button onClick={this.toggleSeeingReviews}> Hide reviews</button>
                            <h3>
                                <b>
                                    {this.props.selectedMovie ? this.props.selectedMovie.title + " reviews:" : <p>...loading reviews</p>}
                                </b>
                            </h3>
                            <ReviewInfo
                                reviews={this.props.selectedMovie.reviews}
                            />
                        </div>
                        : <button onClick={this.toggleSeeingReviews}>See reviews</button>
                    }

                </Panel.Body>
            </Panel>
        )
    }
}

class MovieEditForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.movie){
            return (
                <p>...loading</p>
            )
        }
        else {
            return (
                <ListGroup>
                    <Panel.Body>
                        <Form horizontal>
                            <FormGroup controlId="title">
                                <Col componentClass={ControlLabel} sm={2}>Title:</Col>
                                <Col sm={10}>
                                    <FormControl
                                        onChange={this.props.updateDetails} value={this.props.movie.title} type="text"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="year">
                                <Col componentClass={ControlLabel} sm={2} >Year:</Col>
                                <Col sm={10} >
                                    <FormControl
                                        onChange={this.props.updateDetails} value={this.props.movie.year} type="text"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2} >Genre:</Col>
                                <Col sm={10} >
                                    <FormControl
                                        onChange={this.props.updateDetails} value={this.props.movie.genre} type="text"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2} >Image:</Col>
                                <Col sm={10} >
                                    <FormControl
                                        onChange={this.props.updateDetails} value={this.props.movie.image_url} type="text"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Button onClick={this.props.putMovie}> Submit Changes </Button>
                            </FormGroup>
                            <FormGroup>
                                <Button onClick={this.props.hideDetailEditing}> hide </Button>
                            </FormGroup>
                        </Form>
                    </Panel.Body>
                </ListGroup>
            )
        }
    }
}

class ReviewForm extends Component {
    constructor(props) {
        super(props);
        console.log("Review form props:")
        console.log(props)
        //this.handleChange = this.handleChange.bind(this);
    }



    render() {
        if (!this.props.movie){
            return (
                    <p>...loading</p>
                )
        }
        else {
            return (
                <ListGroup>
                    <Panel.Body>
                        <Form horizontal>
                            <h3>
                                <b>
                                    Submit a Review for {this.props.movie.title}
                                </b>
                            </h3>
                            <FormGroup controlId="rating">
                                <StarRatings
                                    rating={this.props.review.rating}
                                    starRatedColor="blue"
                                    changeRating={this.props.changeRating}
                                    name='rating'
                                />
                            </FormGroup>
                            <FormGroup controlId="quote">
                                    <textarea
                                        id="quote" onChange={this.props.updateReview} value={this.props.review.quote} type="quote" placeholder="Write a review"
                                    />
                            </FormGroup>
                            <FormGroup>
                                <Button onClick={this.props.postReview}> Submit Review </Button>
                            </FormGroup>
                            <FormGroup>
                                <Button onClick={this.props.hidePostReview}> Hide </Button>
                            </FormGroup>
                        </Form>
                    </Panel.Body>
                </ListGroup>
            )
        }

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