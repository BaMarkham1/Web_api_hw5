import React, {Component} from "react";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, ListGroup, Panel} from "react-bootstrap";
import GenreSelector from "./GenreSelector";

class ActorEditForm extends Component {
    constructor(props) {
        super(props);
        console.log("props for actor edit form:")
        console.log(this.props);
        this.state = {
            startingName : this.props.actor.name
        };
    }

    render() {
        console.log("props for actor edit form:")
        console.log(this.props);
        if (!this.props.actor){
            return (
                <p>...loading</p>
            )
        }
        else {
            return (
                <ListGroup>
                    <Panel.Body>
                        <h3><b>Edit {this.state.startingName} details</b></h3>
                        <Form horizontal>
                            <FormGroup controlId="name">
                                <Col componentClass={ControlLabel} sm={2}>Name:</Col>
                                <Col sm={10}>
                                    <FormControl
                                        onChange={this.props.updateDetails} value={this.props.actor.name} type="text"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="img_url">
                                <Col componentClass={ControlLabel} sm={2} >Head shot:</Col>
                                <Col sm={10} >
                                    <FormControl
                                        onChange={this.props.updateDetails} value={this.props.actor.img_url} type="text"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Button onClick={this.props.putActor}> Submit Changes </Button>
                            </FormGroup>
                            <FormGroup>
                                <Button onClick={this.props.buttonHandler}> hide </Button>
                            </FormGroup>
                        </Form>
                    </Panel.Body>
                </ListGroup>
            )
        }
    }
}

export default ActorEditForm;
