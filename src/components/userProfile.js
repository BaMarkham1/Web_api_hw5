import StarRatings from 'react-star-ratings';
import React, { Component }  from 'react';
import {connect} from "react-redux";
import {
    Panel,
    ListGroup,
    ListGroupItem,
    ButtonGroup,
    ButtonToolbar, FormGroup, Col, Row, ControlLabel, FormControl, Button, Form
} from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import {
    fetchUserReviews, fetchUserWatchlist, fetchUserProfilePic, newPutProfilePic
} from "../actions/movieActions";
import UpdateProfilePic from "./updateProfilePic"
import ReviewList from "./reviewList";


const userStates = {
    NO_STATE : "no_state",
    SEE_REVIEWS : "see_reviews",
    SEE_WATCHLIST : "see_watchlist",
    EDIT_REVIEW : "edit_review",
};

class UserProfile extends Component {

    constructor(props) {
        super(props);
        console.log("props in user profile:");
        console.log(this.props);
        this.state = {
            empty_photo : "https://www.thepeakid.com/wp-content/uploads/2016/03/default-profile-picture.jpg",
            userState : userStates.NO_STATE,
            changeProfilePic : false,
            updatedProfilePic : ""
        };
        this.setProfilePic = this.setProfilePic.bind(this);
        this.updateProfilePic = this.updateProfilePic.bind(this);
        this.putProfilePic = this.putProfilePic.bind(this);
    }

    componentDidMount() {
        console.log("UserProfile component did mount");
        console.log("props:");
        console.log(this.props);
        const {dispatch} = this.props;
        dispatch(fetchUserReviews(this.props.userPage));
        dispatch(fetchUserWatchlist(this.props.userPage));
        dispatch(fetchUserProfilePic(this.props.userPage));
    }

    putProfilePic(){
        const {dispatch} = this.props;
        dispatch(newPutProfilePic({profilePic : this.state.updatedProfilePic}, this.props.currentUser));
        this.setState({
            changeProfilePic : false
        })
    }

    updateProfilePic(event) {
        this.setState({
            updatedProfilePic: event.target.value
        });
    }

    setProfilePic() {
        this.setState({
            changeProfilePic : !this.state.changeProfilePic
        });
    }

    render(){
        return (
            <Panel>
                <Panel.Body>
                    <h1>{this.props.userPage ? this.props.userPage : "User profile"}</h1>
                    <Image
                        className="image"
                        src={this.props.userProfilePic ? this.props.userProfilePic : this.state.empty_photo}
                        thumbnail
                    />
                    {
                        this.props.userPage === this.props.currentUser?
                            <UpdateProfilePic
                                setProfilePic={this.setProfilePic}
                                changeProfilePic={this.state.changeProfilePic}
                                updatedProfilePic={this.state.updatedProfilePic}
                                updateProfilePic={this.updateProfilePic}
                                putProfilePic={this.putProfilePic}
                            />
                            :
                            <p></p>
                    }
                </Panel.Body>
                <Panel.Body>
                    <ButtonToolbar>
                        <ButtonGroup>
                            <button
                                id="see_reviews"
                                className="btn btn-primary btn-sm"
                            >
                                Reviews
                            </button>
                            <button
                                id="see_watchlist"
                                className="btn btn-primary btn-sm"
                            >
                                Watchlist
                            </button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Panel.Body>
                <Panel.Body>
                    {
                        this.props.userReviews ?
                            this.props.userReviews[0].image_url ?
                                <ReviewList
                                    reviews={this.props.userReviews}
                                    itemHeader="title"
                                    imageField="image_url"
                                    linkRoute="/movies/"
                                    linkParamField="movie_id"
                                />
                                :
                                console.log("second condition failed")
                            :
                            console.log("first condition failed")
                    }
                </Panel.Body>
                <Panel.Body>
                    {
                        this.props.userReviews && this.props.userReviews[0].image_url ?
                            <p>this.props.userReview[0].image_url</p>
                            :
                            <p>No image url yet</p>
                    }
                </Panel.Body>
                <Panel.Body>
                    <button onClick={()=>console.log(this.props)}>Show props</button>
                    <button onClick={()=>console.log(this.state)}>Show state</button>
                </Panel.Body>
            </Panel>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("map state to props called");
    console.log("state");
    console.log(state);
    console.log("ownProps");
    console.log(ownProps);
    return {
        userPage: ownProps.match.params.username,
        currentUser: state.auth.username,
        userReviews: state.movie.userReviews,
        userWatchlist: state.movie.userWatchlist,
        userProfilePic: state.movie.userProfilePic
        //userReviews[state.movie.userMovie[index]] : state.movie.userMovie
    }
};

export default withRouter(connect(mapStateToProps)(UserProfile));
