import React, { Component } from 'react';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import {logoutUser} from "../actions/authActions";
import {setUser} from "../actions/movieActions";

class MovieHeader extends Component {

    logout(){
        this.props.dispatch(logoutUser());
    }



    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            WikiFlix
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <LinkContainer to="/movielist">
                            <NavItem eventKey={1} disabled={!this.props.loggedIn}>Movie List </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/movies/'+ (this.props.selectedMovie ? this.props.selectedMovie._id : '')}>
                            <NavItem eventKey={2} disabled={!this.props.loggedIn}>Movie Detail</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/signin">
                            <NavItem eventKey={3}>{this.props.loggedIn ? <button onClick={this.logout.bind(this)}>Logout</button> : 'Login'}</NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/actorlist'}>
                            <NavItem eventKey={4} disabled={!this.props.loggedIn}>Actor List</NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/user/' + this.props.username}>
                            <NavItem onClick={() => this.props.dispatch(setUser(this.props.username))} eventKey={4} disabled={!this.props.loggedIn}>Profile</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar>
                <header className="App-header">
                    <h1 className="App-title">{(this.props.selectedMovie ? this.props.selectedMovie.title : '')}</h1>
                </header>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        username: state.auth.username,
        selectedMovie: ''//state.movie.selectedMovie,
    }
}

export default withRouter(connect(mapStateToProps)(MovieHeader));
