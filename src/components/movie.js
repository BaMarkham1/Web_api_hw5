import StarRatings from 'react-star-ratings';
import React, { Component }  from 'react';
import {connect} from "react-redux";
import {
    Panel,
    ListGroup,
    ListGroupItem,
    ButtonGroup,
    ButtonToolbar, FormGroup, Col
} from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import {LinkContainer} from "react-router-bootstrap";
import { withRouter } from "react-router-dom";
import {
    fetchMovie,
    fetchMovieReviews,
    fetchActors,
    postNewReview,
    newPutMovie,
    fetchMovieRoles,
    postRole,
    putRole,
    setActor,
    putNewReview,
    newDeleteReview,
    fetchMovieWatchlist,
    postWatchlist,
    deleteWatchlist
} from "../actions/movieActions";
import ReactPlayer from "react-player"
//internal components
import MovieRoleScroller from "./MovieRoleScroller";
import AddMovieRolesForm from "./AddMovieRolesForm";
import EditMovieRolesForm from "./EditMovieRolesForm";
import SubmitReviewForm from "./SubmitReviewForm";
import MovieEditForm from "./MovieEditForm";
import ReviewList from "./reviewList";

//support routing by creating a new component

const userStates = {
    NO_STATE : "no_state",
    SEE_REVIEWS : "see_reviews",
    POST_REVIEW : "post_review",
    REVIEW_POSTED : "review_posted",
    EDIT_REVIEW : "edit_review",
    EDIT_MOVIE : "edit_movie",
    ADD_ROLES : "add_roles",
    EDIT_ROLES : "edit_roles"
};


class Movie extends Component {

    constructor(props) {
        super(props);
        console.log("props in movie constructor:");
        console.log(this.props);
        this.state = {
            review: {
                name: localStorage.getItem('username'),
                quote: '',
                rating: 0,
                movie_id: 0,
                //movie_id: this.props.selectedMovie._id,
            },
            reviewed: false,
            empty_photo: "data:image/jpeg;base64,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",
            editingMovieDetails: false,
            addingRoles: false,
            newRoles: [],
            selectValues: [],
            changesSubmitted: false,
            postingReview: false,
            seeReviews: false,
            userState: userStates.NO_STATE
        };
        if (props.selectedMovie) {
            this.state.movie = props.selectedMovie
            console.log("set movie details in state!")
            console.log(this.state.movie)
        }
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
        this.addNewRole = this.addNewRole.bind(this);
        this.updateNewRoles = this.updateNewRoles.bind(this);
        this.updateEditedRoles = this.updateEditedRoles.bind(this);
        this.updateSelectedActor = this.updateSelectedActor.bind(this);
        this.updateSelectedActor2 = this.updateSelectedActor2.bind(this);
        this.submitNewRoles = this.submitNewRoles.bind(this);
        this.deleteRole = this.deleteRole.bind(this);
        this.buttonHandler = this.buttonHandler.bind(this);
        this.submitEditedRoles = this.submitEditedRoles.bind(this);
        this.changeGenres = this.changeGenres.bind(this);
        this.handleActorClick = this.handleActorClick.bind(this);
        this.putReview = this.putReview.bind(this);
        this.toggleWatchlist = this.toggleWatchlist.bind(this);
    }

    handleActorClick(role) {
        const {dispatch} = this.props;
        console.log("role after click");
        console.log(role);
        let actor = {
            _id : role.actor_id,
            img_url : role.img_url,
            name : role.actor_name
        };
        console.log("actor after handleActorClick")
        console.log(actor);
        dispatch(setActor(actor));
    }

    buttonHandler(button) {
        switch (button.target.id) {
            case 'see_reviews':
                console.log("see reviews");
                this.setState({
                    userState: userStates.SEE_REVIEWS
                });
                break;
            case 'post_review':
                console.log("post a review");
                console.log("props:");
                console.log(this.props);
                if (this.props.userReviewIndex === -1) {
                    this.setState({
                        userState: userStates.POST_REVIEW
                    });
                }
                else {
                    let userReview = this.props.reviews[this.props.userReviewIndex];
                    let currentReview = this.state.review;
                    currentReview.quote = userReview.quote;
                    currentReview.rating = userReview.rating;
                    currentReview._id = userReview._id;
                    this.setState({
                        review: currentReview,
                        userState: userStates.REVIEW_POSTED
                    });
                }
                break;
            case 'edit_review':
                this.setState({
                   userState: userStates.EDIT_REVIEW
                });
                break;
            case 'delete_review':
                //call a function that deletes the review here
                this.deleteReview();
                this.setState({
                    userState: userStates.POST_REVIEW
                });
                break;
            case 'edit_movie':
                console.log("edit details");
                this.setDetails();
                this.setState({
                    userState: userStates.EDIT_MOVIE
                });
                break;
            case 'add_roles':
                console.log("add roles");
                if (this.state.newRoles.length === 0) {
                    this.addNewRole();
                }
                this.setState({
                    userState: userStates.ADD_ROLES
                });
                break;
            case 'edit_roles':
                console.log("edit roles");
                //do deep copy of array to avoid pointer issues
                let editedRoles = [];
                editedRoles = this.props.movieRoles.map( (role) => {
                   let editedRole = {
                       actor_id : role.actor_id,
                       actor_name : role.actor_name,
                       char_name : role.char_name,
                       _id : role._id,
                       img_url : role.img_url,
                       movie_id : this.props.movieId
                   };
                   return editedRole;
                });
                this.setState({
                   editedRoles : editedRoles
                });
                this.setState({
                    userState: userStates.EDIT_ROLES
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

    buttonSwitch() {
        console.log("user state:");
        console.log(this.state.userState);
        switch (this.state.userState) {
            case 'see_reviews':
                return (
                    <div>
                        <button onClick={this.buttonHandler}> Hide reviews</button>
                        <h3>
                            <b>
                                {this.props.selectedMovie ? this.props.selectedMovie.title + " reviews:" :
                                    <p>...loading reviews</p>}
                            </b>
                        </h3>
                        <ReviewList
                            reviews={this.props.reviews}
                            itemHeader="name"
                            imageField="profile_pic"
                            linkRoute="/user/"
                            linkParamField="name"
                        />
                    </div>
                );
            case 'post_review':
                return (
                    <SubmitReviewForm
                        movie={this.props.selectedMovie}
                        review={this.state.review}
                        updateReview={this.updateReview}
                        changeRating={this.changeRating}
                        postReview={this.postReview}
                        putMovie={this.putMovie}
                        buttonHandler={this.buttonHandler}
                    />
                );
            case 'edit_review':
                return (
                    <SubmitReviewForm
                        movie={this.props.selectedMovie}
                        review={this.state.review}
                        updateReview={this.updateReview}
                        changeRating={this.changeRating}
                        postReview={this.putReview}
                        putMovie={this.putMovie}
                        buttonHandler={this.buttonHandler}
                    />
                );
            case 'review_posted':
                if (this.props.userReviewIndex !== -1){
                    let userReview = this.props.reviews[this.props.userReviewIndex];
                    return (
                        <div>
                            <h3>You have posted a review for this movie</h3>
                            <p>
                                <StarRatings
                                    rating={userReview.rating}
                                    starSpacing="0px"
                                    starRatedColor="blue"
                                />
                            </p>
                            <p key={userReview.quote}>
                                {"\""+ userReview.quote +  "\""}
                            </p>
                            <ButtonToolbar>
                                <ButtonGroup>
                                    <button
                                        id="edit_review"
                                        className="btn btn-primary btn-sm"
                                        onClick={this.buttonHandler}
                                    >
                                        Edit Review
                                    </button>
                                    <button
                                        id="delete_review"
                                        className="btn btn-primary btn-sm"
                                        onClick={this.buttonHandler}
                                    >
                                        Delete Review
                                    </button>
                                </ButtonGroup>
                            </ButtonToolbar>

                        </div>
                    );
                }
                else {
                    return (
                        <h3>You have posted a review for this movie</h3>
                    );
                }
                case 'edit_movie':
                    return (
                            <MovieEditForm
                                movie={this.state.movieDetails}
                                updateDetails={this.updateDetails}
                                putMovie={this.putMovie}
                                buttonHandler={this.buttonHandler}
                                changeGenres={this.changeGenres}
                            />
                    );
                case 'add_roles':
                    if (this.state.newRoles && this.props.actors) {
                        return (
                            <AddMovieRolesForm rolesArray={this.state.newRoles} updateNewRoles={this.updateNewRoles}
                                      actors={this.props.actors} addNewRole={this.addNewRole}
                                      updateSelectedActor={this.updateSelectedActor}
                                      selectValues={this.state.selectValues} submitNewRoles={this.submitNewRoles}
                                      deleteRole={this.deleteRole}/>
                        )
                    }
                    else {
                        return (
                            <p>...loading</p>
                        )
                    }
                case 'edit_roles':
                    console.log("edit roles");
                    console.log("edited roles:");
                    console.log(this.state.editedRoles);
                    return (
                      <EditMovieRolesForm
                          editedRoles={this.state.editedRoles}
                          actors={this.props.actors}
                          updateEditedRoles={this.updateEditedRoles}
                          submitEditedRoles ={this.submitEditedRoles}
                          updateSelectedActor2 ={this.updateSelectedActor2}
                      />
                    );
                case 'no_state':
                    console.log("no state selected");
                    break;
                default:
                    console.log("no cases met");
                    this.setState({
                        userState: userStates.NO_STATE
                    });
                break;
        }
    }

    deleteReview(){
        let newReview = this.state.review;
        newReview.quote = "";
        newReview.rating = 0;
        this.setState({
           review : newReview
        });
        const {dispatch} = this.props;
        dispatch(newDeleteReview(this.props.reviews[this.props.userReviewIndex]._id, this.props.selectedMovie._id));

    };

    deleteRole() {
        let updatedRoles = this.state.newRoles;
        updatedRoles.pop();
        if (updatedRoles.length == 0) {
            this.setState({
                userState: userStates.NO_STATE
            });
        }
        this.setState({
            newRoles: updatedRoles
        })
    }

    addNewRole() {
        let updateRoles = this.state.newRoles;
        updateRoles.push({
            actor_id: this.props.actors[0]._id,
            actor_name: this.props.actors[0].name,
            char_name: "",
            movie_id: this.props.movieId
        });
        //let updateSelectValues = this.state.selectValues;
        //updateSelectValues.push(this.props.actors[1].name);
        this.setState({
            newRoles: updateRoles
        });
        //this.setState({
        //selectValues : updateSelectValues
        //});
    }

    toggleSeeingReviews() {
        console.log("props:");
        console.log(this.props);
        console.log("state:");
        console.log(this.state);
        this.setState({seeReviews: !this.state.seeReviews})
    }

    hidePostReview() {
        this.setState({
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
        let selectedGenres = [];
        if (this.props.selectedMovie.genres) {
            selectedGenres = this.props.selectedMovie.genres.map (genre => {
                return { label: genre, value: genre }
            });
        }

        let movieDetails = {
            movie_id: this.props.movieId,
            title: this.props.selectedMovie.title,
            year: this.props.selectedMovie.year,
            image_url: this.props.selectedMovie.image_url,
            trailer_url: this.props.selectedMovie.trailer_url,
            selectedGenres: selectedGenres
        };
        this.setState({
            movieDetails: movieDetails
        })
    }

    updateEditing() {
        console.log("changing state");
        console.log(this.state.editingMovieDetails);
        this.setDetails();
        this.setState({editingMovieDetails: !this.state.editingMovieDetails})
    }

    updateReview(event) {
        let updateDetails = Object.assign({}, this.state.review);
        updateDetails[event.target.id] = event.target.value;
        this.setState({
            review: updateDetails
        });
    }

    updateDetails(event) {
        let updateDetails = Object.assign({}, this.state.movieDetails);
        updateDetails[event.target.id] = event.target.value;
        this.setState({
            movieDetails: updateDetails
        });
    }

    changeRating(newRating, name) {
        let updateDetails = Object.assign({}, this.state.review);
        updateDetails.rating = newRating;
        this.setState({
            review: updateDetails
        });
    }

    submitNewRoles() {
        console.log("props");
        console.log(this.props);
        console.log("state");
        console.log(this.state);
        this.setState({addingRoles: false});
        const {dispatch} = this.props;
        let responses = this.state.newRoles.map((role, i) => dispatch(postRole(role, this.props.movieId)));
        console.log("responses:");
        console.log(responses);
        this.setState({
            newRoles: []
        });
    }

    submitEditedRoles() {
        console.log("props");
        console.log(this.props);
        console.log("state");
        console.log(this.state);
        this.setState({
            userState : userStates.NO_STATE
        });
        const {dispatch} = this.props;
        this.state.editedRoles.forEach( (role) => {
            dispatch(putRole(role, true));
        });
    }

    postReview() {
        console.log("props");
        console.log(this.props);
        console.log("state");
        console.log(this.state);
        const {dispatch} = this.props;
        this.state.review.movie_id = this.props.movieId;
        dispatch(postNewReview(this.state.review));
        this.setState({
            userState : userStates.REVIEW_POSTED
        });
    }

    putReview() {
        console.log("props");
        console.log(this.props);
        console.log("state");
        console.log(this.state);
        const {dispatch} = this.props;
        this.state.review.movie_id = this.props.movieId;
        dispatch(putNewReview(this.state.review));
        this.setState({
            userState : userStates.REVIEW_POSTED
        });
    }

    putMovie() {
        console.log("put movie called");
        console.log("movie details:");
        console.log(this.state.movieDetails);
        this.setState({userState: userStates.NO_STATE});
        const {dispatch} = this.props;
        let genres = this.state.movieDetails.selectedGenres.map( genre => genre.value);
        console.log("genres:");
        console.log(genres);
        let updatedDetails = this.state.movieDetails;
        updatedDetails.genres = genres;
        this.setState({
            movieDetails : updatedDetails
        }, () => dispatch(newPutMovie(this.state.movieDetails)));
    }

    componentDidMount() {
        console.log("component did mount");
        console.log("props:");
        console.log(this.props);
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null || this.props.selectedMovie.genres == null ) {
            console.log("calling fetch movie");
            dispatch(fetchMovie(this.props.movieId));
        }
        console.log("calling fetch review");
        dispatch(fetchMovieReviews(this.props.movieId));
        console.log("calling fetch movie roles");
        dispatch(fetchMovieRoles(this.props.movieId));
        console.log("calling fetch actors");
        dispatch(fetchActors());
        console.log("calling fetch watchlist");
        dispatch(fetchMovieWatchlist(this.props.movieId));

    }

    updateNewRoles(event) {
        console.log("event target value");
        console.log(event.target.value);
        console.log("event target id");
        console.log(event.target.id);
        console.log("array position");
        console.log(event.target.id.substring(event.target.id.length - 1));
        console.log("field");
        console.log(event.target.id.substring(0, event.target.id.length - 1));
        let index = parseInt(event.target.id.substring(event.target.id.length - 1));
        let field = event.target.id.substring(0, event.target.id.length - 1);
        let updatedArray = Object.assign([], this.state.newRoles);
        updatedArray[index][field] = event.target.value;
        this.setState({
            newRoles: updatedArray
        });
    }

    updateEditedRoles(event) {
        console.log("event target value");
        console.log(event.target.value);
        console.log("event target id");
        console.log(event.target.id);
        console.log("array position");
        console.log(event.target.id.substring(event.target.id.length - 1));
        console.log("field");
        console.log(event.target.id.substring(0, event.target.id.length - 1));
        let index = parseInt(event.target.id.substring(event.target.id.length - 1));
        let field = event.target.id.substring(0, event.target.id.length - 1);
        let updatedArray = Object.assign([], this.state.editedRoles);
        updatedArray[index][field] = event.target.value;
        this.setState({
            editedRoles: updatedArray
        });
    }

    updateSelectedActor(event) {
        console.log("in update selected actor:")
        console.log("event:");
        console.log(event);
        console.log("event target:");
        console.log(event.target);
        console.log("event target value");
        console.log(event.target.value);
        console.log("event target id");
        console.log(event.target.id);
        let updatedRoles = Object.assign([], this.state.newRoles);
        updatedRoles[event.target.id].actor_name = this.props.actors[event.target.value].name;
        updatedRoles[event.target.id].actor_id = this.props.actors[event.target.value]._id;
        this.setState({
            newRoles: updatedRoles
        }, () => {
            console.log("new roles:");
            console.log(this.state.newRoles);
        })
    }

    updateSelectedActor2(event) {
        console.log("in update selected actor:")
        console.log("event:");
        console.log(event);
        console.log("event target:");
        console.log(event.target);
        console.log("event target value");
        console.log(event.target.value);
        console.log("event target id");
        console.log(event.target.id);
        let updatedRoles = Object.assign([], this.state.editedRoles);
        updatedRoles[event.target.id].actor_name = this.props.actors[event.target.value].name;
        updatedRoles[event.target.id].actor_id = this.props.actors[event.target.value]._id;
        this.setState({
            editedRoles: updatedRoles
        }, () => {
            console.log("edited roles:");
            console.log(this.state.editedRoles);
        })
    }

    changeGenres(event) {
        console.log("in change genres:")
        console.log("event:");
        console.log(event);
        let updatedDetails = this.state.movieDetails;
        updatedDetails.selectedGenres = event;
        this.setState({
            movieDetails : updatedDetails
        });
        console.log("movieDetails:");
        console.log(this.state.movieDetails);
    }

    toggleWatchlist(){
        console.log("toggle watchlist called");
        const {dispatch} = this.props;
        if (this.props.onUsersWatchlist === true) {
            dispatch(deleteWatchlist(this.props.movieId));
        }
        else{
            dispatch(postWatchlist(this.props.movieId));
        }
    }

    render() {

        const MovieHeading = () => {
            return (
                <div>
                    <h1>
                        <b>
                            {this.props.selectedMovie.title}
                        </b>

                    </h1>
                    {this.props.selectedMovie.genres ? this.props.selectedMovie.genres.join(", ") + " (" + this.props.selectedMovie.year + ")" : "genres not found"}
                </div>
            )
        };

        return (
            <Panel className="panel">
                <Panel.Heading>
                    {this.props.selectedMovie ? <MovieHeading/> : <p>loading details...</p>}
                </Panel.Heading>
                <Panel.Body>
                    <Image
                        className="image"
                        src={this.props.selectedMovie ? this.props.selectedMovie.image_url : this.state.empty_photo}
                        thumbnail
                    />
                </Panel.Body>
                <Panel.Body>
                    {
                        typeof this.props.onUsersWatchlist !== "undefined" ?
                            <button
                                id="watchlist"
                                className="btn btn-primary btn-sm"
                                onClick={this.toggleWatchlist}
                            >
                                {
                                    this.props.onUsersWatchlist === true ?
                                        "Remove from watchlist"
                                        :
                                        "Add to Watchlist"
                                }
                            </button>
                            :
                            <p></p>
                    }
                    <p>
                        <i>
                            {
                                this.props.watchlistCount || this.props.watchlistCount === 0 ?
                                    "on " + this.props.watchlistCount + " users' watchlists"
                                    :
                                    ""
                            }
                        </i>
                    </p>
                </Panel.Body>
                <ListGroup>
                    <ListGroupItem>
                        <StarRatings
                            rating={this.props.selectedMovie ? this.props.selectedMovie.avg_rating : 0}
                            starRatedColor="blue"
                        />
                        <p>
                            <i>
                                {
                                    this.props.reviews && this.props.reviews.length > 0 && this.props.selectedMovie?
                                        "Community Rating: " + this.props.selectedMovie.avg_rating + " stars from " + this.props.reviews.length + " users"
                                        :
                                        "Be the first to post a review for this movie!"

                                }
                            </i>
                        </p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <MovieRoleScroller
                            movieRoles={this.props.movieRoles}
                            handleClick={this.handleActorClick}
                        />
                    </ListGroupItem>
                    <TrailerDisplay selectedMovie={this.props.selectedMovie} />
                </ListGroup>
                <Panel.Body>
                    <ButtonToolbar>
                        <ButtonGroup>
                            <button id="see_reviews" class="btn btn-primary btn-sm" onClick={this.buttonHandler}>See Reviews</button>
                            <button id="post_review" class="btn btn-primary btn-sm" onClick={this.buttonHandler}>Post Review</button>
                            <button id="edit_movie" class="btn btn-primary btn-sm" onClick={this.buttonHandler}>Edit Movie Details</button>
                            <button id="add_roles" class="btn btn-primary btn-sm" onClick={this.buttonHandler}>Add Roles</button>
                            <button id="edit_roles" class="btn btn-primary btn-sm" onClick={this.buttonHandler}>Edit Roles</button>
                        </ButtonGroup>
                    </ButtonToolbar>
                    {this.buttonSwitch()}
                </Panel.Body>
            </Panel>
        )
    }
}

class TrailerDisplay extends Component {
    constructor(props) {
        super(props);
        console.log("RoleForm props:");
        console.log(props);
        console.log("roles array");
        console.log(props.rolesArray);
    }

    render(){
        if (this.props.selectedMovie && this.props.selectedMovie.trailer_url) {
            return (
                <ListGroupItem>
                    <Panel.Body >
                            <h3>
                                <b>
                                    {"Watch trailer for " + this.props.selectedMovie.title}
                                </b>
                            </h3>
                            <div className="Trailer">
                                <ReactPlayer
                                    url={this.props.selectedMovie.trailer_url}
                                />
                            </div>

                    </Panel.Body>
                </ListGroupItem>
            )
        }
        else {
            return (
                <p>No trailer available</p>
            )
        }
    }
}

const ReviewInfo = ({reviews}) => {
    return (
        reviews.map((review, i) =>
            <div className="review-list">
                <Col sm={3}>
                    <LinkContainer
                        to={'/user/'+review.name}
                    >
                        <Image
                            className="reviewPic"
                            src={review.profile_pic}
                            thumbnail
                        />
                    </LinkContainer>

                </Col>
                <Col sm={9} className="review-info">
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
                </Col>

                <br></br>
            </div>
        )
    )
};

const mapStateToProps = (state, ownProps) => {
    console.log("map state to props called");
    console.log("state");
    console.log(state);
    console.log("ownProps");
    console.log(ownProps);
    return {
        selectedMovie: state.movie.selectedMovie,
        movieId: ownProps.match.params.movieId,
        reviews: state.movie.reviews,
        userReviewIndex: state.movie.userReviewIndex,
        movieRoles: state.movie.movieRoles,
        actors: state.movie.actors,
        watchlistCount: state.movie.watchlistCount,
        onUsersWatchlist: state.movie.onUsersWatchlist
    }
};

export default withRouter(connect(mapStateToProps)(Movie));
