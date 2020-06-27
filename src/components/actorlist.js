import React, { Component } from 'react';
import {fetchActors, fetchMovies} from '../actions/movieActions';
import { setActor } from '../actions/movieActions';
import {connect} from "react-redux";
import { Image } from 'react-bootstrap'
import { Carousel } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';

class ActorList extends Component {
    constructor(props) {
        super(props);
        console.log("In actor list")
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchActors());
    }

    render() {
        return (
            <h1>Hello actors</h1>
        )
    }
}

const mapStateToProps = state => {
    return {
        actors: state.movie.actors
    }
}

export default connect(mapStateToProps)(ActorList);