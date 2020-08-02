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

} from "../actions/movieActions";

class UserProfile extends Component {

    constructor(props) {
        super(props);
        console.log("props in user profile:");
        console.log(this.props);
        const {dispatch} = this.props;
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
        currentUser: state.auth.username
    }
};

export default withRouter(connect(mapStateToProps)(UserProfile));
