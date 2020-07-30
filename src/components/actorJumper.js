import React, {Component} from "react";
import {Button, Col, Checkbox, ControlLabel, Form, FormControl, FormGroup, ListGroup, Panel, Row} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
//import { useHistory } from "react-router-dom";

//function jump(url) {
    //let history = useHistory();
    //history.push(url)
//}

class ActorJumper extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    constructor(props, context) {
        super(props, context);
        console.log("actorJumper props:");
        console.log(props);
        console.log("actorJumper context");
        console.log(context);
        console.log("React version");
        console.log(React.version);
        this.goToActor = this.goToActor.bind(this);

    }

    goToActor(event) {
        console.log("in go to actor:");
        console.log("event:");
        console.log(event);
        console.log("event target:");
        console.log(event.target);
        console.log("event target value");
        console.log(event.target.value);
        console.log("event target id");
        console.log(event.target.id);
        //jump(`/actors/${event.target.value}`)
        //this.context.router.history.push(`/actors/${event.target.value}`);
    }

    render() {
        console.log("actors in actor jumper:");
        console.log(this.props.actors);
        console.log("current actor in actor jumper:");
        console.log(this.props.currentActorId);
        return (
            <form>
                <h4>Current actor</h4>
                <FormGroup>
                        <select
                            id={"actor_jumper"}
                            onChange={this.goToActor}
                        >
                            {
                                this.props.actors ?
                                    this.props.actors.map( (actor)  => {
                                    if (this.props.currentActorId === actor._id) {
                                        return (
                                            <option
                                                selected
                                                value={actor._id}
                                            >
                                                {actor.name}
                                            </option>
                                        )
                                    }
                                    else {
                                        return (
                                            <option
                                                value={actor._id}
                                            >
                                                {actor.name}
                                            </option>
                                        )
                                    }
                                }) : <p>loading actors</p>


                            }
                        </select>
                </FormGroup>
            </form>
        )
    }
}

export default ActorJumper;
