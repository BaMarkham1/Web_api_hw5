
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
                review_quote: '',
                rating: 0,
                movie_id: 0
                //movie_id: this.props.selectedMovie._id,
            }
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.postReview = this.postReview.bind(this);
    }

    handleUpdate(event){
        let updateDetails = Object.assign({}, this.state.review);
        if(event.target.id === "rating"){
            updateDetails[event.target.id] = parseInt(event.target.value);
        }
        else {
            updateDetails[event.target.id] = event.target.value;
        }
        this.setState({
            review: updateDetails
        });
        console.log(this.state.review);
    }

    postReview(){
        const {dispatch} = this.props;
        this.state.review = this.props.movieId
        dispatch(postNewReview(this.state.review));
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

    render() {
        const ActorInfo = ({actors}) => {
            return actors.map((actor, i) =>
                <p key={i}>
                    <b>{actor.actor_name}</b> as {actor.char_name}
                </p>
            )
        };

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
              <Panel>
                  <Panel.Heading>Movie Detail</Panel.Heading>
                  <Panel.Body><Image className="image" src={currentMovie.image_url} thumbnail width="330" height="400"/></Panel.Body>
                  <ListGroup>
                      <ListGroupItem>{currentMovie.title}</ListGroupItem>
                      <ListGroupItem><ActorInfo actors={currentMovie.actors} />  </ListGroupItem>
                      <ListGroupItem><h4><Glyphicon glyph={'star'}/> {currentMovie.avg_rating} </h4></ListGroupItem>
                  </ListGroup>
                  <Panel.Body><ReviewInfo reviews={currentMovie.reviews} /></Panel.Body>
                  <Panel.Body><ReviewField /></Panel.Body>
              </Panel>
            );
        };

        const ReviewField = ({reviews}) =>{
            return(
                <Form horizontal>
                    <FormGroup controlId="rating">
                        <Col componentClass={ControlLabel} sm={2}>
                            Rating:
                        </Col>
                        <Col sm={10}>
                            <FormControl onChange={this.handleUpdate} value={this.state.review.rating} componentClass="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="review_quote">
                        <Col componentClass={ControlLabel} sm={2}>
                            Review:
                        </Col>
                        <Col sm={10}>
                            <FormControl autoFocus onChange={this.handleUpdate} value={this.state.review.review_quote} type="text" placeholder="Review:" />
                            <Button onClick={this.postReview}> Submit Review </Button>
                        </Col>
                    </FormGroup>

                </Form>
            )
        }

        return (
            <DetailInfo currentMovie={this.props.selectedMovie} />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("state");
    console.log(state)
    console.log("ownProps");
    console.log(ownProps);
    return {
        selectedMovie: state.movie.selectedMovie,
        movieId: ownProps.match.params.movieId
    }
}

export default withRouter(connect(mapStateToProps)(Movie));