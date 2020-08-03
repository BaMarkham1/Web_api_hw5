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
import { withRouter } from "react-router-dom";
import {
    fetchUserReviews, fetchUserWatchlist, fetchUserProfilePic
} from "../actions/movieActions";
import {fetchMovie} from "../actions/movieActions";
import {fetchMovieReviews} from "../actions/movieActions";
import {fetchMovieRoles} from "../actions/movieActions";
import {fetchActors} from "../actions/movieActions";
import {fetchMovieWatchlist} from "../actions/movieActions";

class UserProfile extends Component {

    constructor(props) {
        super(props);
        console.log("props in user profile:");
        console.log(this.props);
        const {dispatch} = this.props;
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

    render(){
        return (
            <div>
                <h1>{this.props.user ? this.props.user : "User profile"}</h1>
                <button onClick={()=>console.log(this.props)}>Show props</button>
                <button onClick={()=>console.log(this.state)}>Show state</button>
            </div>
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
        userProfilePic: state.movie.userProfilePic,
        //userReviews[state.movie.userMovie[index]] : state.movie.userMovie
    }
};

export default withRouter(connect(mapStateToProps)(UserProfile));
