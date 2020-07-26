import React, { Component }  from 'react';
import {connect} from "react-redux";
import {
    Panel,
    ListGroup,
    ListGroupItem,
    ButtonGroup,
    ButtonToolbar,
} from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import {
    fetchActor,
    fetchActorRoles,
    setMovie,
    fetchMovies,
    putRole,
    postRole,
    newPutActor
} from "../actions/movieActions";
import ActorRoleScroller from "./ActorRoleScroller";
import EditActorRolesForm from "./editActorRolesForm";
import ActorEditForm from "./actorEditForm";
import AddActorRolesForm from "./addActorRolesForm";

const userStates = {
    NO_STATE : "no_state",
    EDIT_ACTOR : "edit_actor",
    ADD_ROLES : "add_roles",
    EDIT_ROLES : "edit_roles"
};

class Actor extends Component {

    constructor(props) {
        super(props);
        console.log("props in actor constructor:");
        console.log(this.props);
        this.state = {
            empty_photo: "data:image/jpeg;base64,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",
            userState: userStates.NO_STATE,
            newRoles: []
        };
        this.handleMovieClick = this.handleMovieClick.bind(this);
        this.buttonHandler = this.buttonHandler.bind(this);
        this.updateEditedRoles = this.updateEditedRoles.bind(this);
        this.updateSelectedMovie = this.updateSelectedMovie.bind(this);
        this.updateSelectedMovie2 = this.updateSelectedMovie2.bind(this);
        this.submitEditedRoles = this.submitEditedRoles.bind(this);
        this.submitNewRoles = this.submitNewRoles.bind(this);
        this.updateNewRoles = this.updateNewRoles.bind(this);
        this.addNewRole = this.addNewRole.bind(this);
        this.deleteRole = this.deleteRole.bind(this);
        this.updateDetails = this.updateDetails.bind(this);
        this.putActor = this.putActor.bind(this);
    }

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

    handleMovieClick(role) {
        const {dispatch} = this.props;
        console.log("role after click");
        console.log(role);
        let movie = {
            _id : role.movie_id,
            image_url : role.movie_img,
            title : role.movie_name
        };
        console.log("movie after handleActorClick")
        console.log(movie);
        dispatch(setMovie(movie));
    }

    componentDidMount() {
        console.log("component did mount");
        console.log("props:");
        console.log(this.props);
        const {dispatch} = this.props;
        if (this.props.selectedActor == null) {
            console.log("calling fetch actor");
            dispatch(fetchActor(this.props.actorId));
        }
        dispatch(fetchActorRoles(this.props.actorId));
        dispatch(fetchMovies(""));
    }

    buttonHandler(button) {
        switch (button.target.id) {
            case 'edit_actor':
                console.log("edit details");
                this.setActorDetails();
                this.setState({
                    userState: userStates.EDIT_ACTOR
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
                editedRoles = this.props.actorRoles.map( (role) => {
                    let editedRole = {
                        actor_id : this.props.selectedActor._id,
                        actor_name : this.props.selectedActor.name,
                        char_name : role.char_name,
                        _id : role._id,
                        movie_id : role.movie_id,
                        movie_name : role.movie_name
                    };
                    return editedRole;
                });
                this.setState({
                    editedRoles : editedRoles
                }, console.log(editedRoles));
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
            case 'edit_actor':
                return (
                    <ActorEditForm
                        actor={this.state.actorDetails}
                        updateDetails={this.updateDetails}
                        putActor={this.putActor}
                        buttonHandler={this.buttonHandler}
                    />
                );
            case 'add_roles':
                if (this.state.newRoles && this.props.movies) {
                    return (
                        <AddActorRolesForm
                            rolesArray={this.state.newRoles}
                            updateNewRoles={this.updateNewRoles}
                            movies={this.props.movies}
                            addNewRole={this.addNewRole}
                            updateSelectedMovie={this.updateSelectedMovie2}
                            submitNewRoles={this.submitNewRoles}
                            deleteRole={this.deleteRole}
                        />
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
                console.log("props in edit roles:");
                console.log(this.props);
                return (
                    <EditActorRolesForm
                        editedRoles={this.state.editedRoles}
                        movies={this.props.movies}
                        updateEditedRoles={this.updateEditedRoles}
                        submitEditedRoles ={this.submitEditedRoles}
                        updateSelectedMovie ={this.updateSelectedMovie}
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

    putActor() {
        console.log("put actor called");
        console.log("actor details:");
        console.log(this.state.actorDetails);
        this.setState({userState: userStates.NO_STATE});
        const {dispatch} = this.props;
        dispatch(newPutActor(this.state.actorDetails));
    }

    submitNewRoles() {
        console.log("props");
        console.log(this.props);
        console.log("state");
        console.log(this.state);
        this.setState({addingRoles: false});
        const {dispatch} = this.props;
        let responses = this.state.newRoles.map((role, i) => dispatch(postRole(role, this.props.actorId)));
        console.log("responses:");
        console.log(responses);
        this.setState({
            newRoles: []
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

    updateSelectedMovie(event) {
        console.log("in update selected movie:");
        console.log("event:");
        console.log(event);
        console.log("event target:");
        console.log(event.target);
        console.log("event target value");
        console.log(event.target.value);
        console.log("event target id");
        console.log(event.target.id);
        let updatedRoles = Object.assign([], this.state.editedRoles);
        updatedRoles[event.target.id].movie_name = this.props.movies[event.target.value].title;
        updatedRoles[event.target.id].movie_id = this.props.movies[event.target.value]._id;
        this.setState({
            editedRoles: updatedRoles
        }, () => {
            console.log("edited roles:");
            console.log(this.state.editedRoles);
        })
    }

    updateSelectedMovie2(event) {
        console.log("in update selected movie:");
        console.log("event:");
        console.log(event);
        console.log("event target:");
        console.log(event.target);
        console.log("event target value");
        console.log(event.target.value);
        console.log("event target id");
        console.log(event.target.id);
        let updatedRoles = Object.assign([], this.state.newRoles);
        updatedRoles[event.target.id].movie_name = this.props.movies[event.target.value].title;
        updatedRoles[event.target.id].movie_id = this.props.movies[event.target.value]._id;
        this.setState({
            newRoles: updatedRoles
        }, () => {
            console.log("new roles:");
            console.log(this.state.newRoles);
        })
    }

    submitEditedRoles() {
        console.log("props");
        console.log(this.props);
        console.log("state");
        console.log(this.state);
        this.setState({
            userState : userStates.NO_STATE,
            newRoles: []
        });
        const {dispatch} = this.props;
        this.state.editedRoles.forEach( (role) => {
            dispatch(putRole(role, false));
        });
    }

    addNewRole() {
        let updateRoles = this.state.newRoles;
        updateRoles.push({
            movie_id: this.props.movies[0]._id,
            movie_name: this.props.movies[0].title,
            char_name: "",
            actor_id: this.props.actorId
        });
        this.setState({
            newRoles: updateRoles
        });
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

    setActorDetails() {
        let actorDetails = {
            _id: this.props.actorId,
            name: this.props.selectedActor.name,
            img_url: this.props.selectedActor.img_url,
        };
        this.setState({
            actorDetails: actorDetails
        })
    }

    updateDetails(event) {
        let updateDetails = Object.assign({}, this.state.actorDetails);
        updateDetails[event.target.id] = event.target.value;
        this.setState({
            actorDetails: updateDetails
        });
    }

    render() {
        console.log("props in render");
        console.log(this.props);
        return (
            <Panel className="panel">
                <Panel.Heading>
                    {
                        this.props.selectedActor ?
                            <h1>
                                <b>
                                    {this.props.selectedActor.name}
                                </b>
                            </h1>
                            :
                            <p>loading details...</p>
                    }
                </Panel.Heading>
                <Panel.Body>
                    <Image
                        className="image"
                        src={this.props.selectedActor ? this.props.selectedActor.img_url : this.state.empty_photo}
                        thumbnail
                    />
                </Panel.Body>
                <Panel.Body>
                    <ListGroup>
                        <ListGroupItem>
                            <h2>
                                {
                                    this.props.selectedActor ?
                                        "Movies featuring " + this.props.selectedActor.name
                                        :
                                        "Movies featuring this actor"
                                }
                            </h2>
                            <ActorRoleScroller
                                actorRoles={this.props.actorRoles}
                                handleClick={this.handleMovieClick}
                            />
                        </ListGroupItem>
                    </ListGroup>
                </Panel.Body>
                <Panel.Body>
                    <ButtonToolbar>
                        <ButtonGroup>
                            <button id="edit_actor" class="btn btn-primary btn-sm"onClick={this.buttonHandler}>Edit Actor</button>
                            <button id="edit_roles" class="btn btn-primary btn-sm" onClick={this.buttonHandler}>Edit Roles</button>
                            <button id="add_roles" class="btn btn-primary btn-sm" onClick={this.buttonHandler}>Add Roles</button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Panel.Body>
                <Panel.Body>
                    {this.buttonSwitch()}
                </Panel.Body>
            </Panel>

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("state:");
    console.log(state);
    console.log("own props");
    console.log(ownProps);
    return {
        selectedActor: state.movie.selectedActor,
        actorId: ownProps.match.params.actorId,
        actorRoles: state.movie.actorRoles,
        movies: state.movie.movies
    }
};

export default withRouter(connect(mapStateToProps)(Actor));
