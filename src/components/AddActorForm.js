import React, {Component} from "react";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, ListGroup, Panel} from "react-bootstrap";

class AddActorForm extends Component {
    constructor(props) {
        super(props);
        console.log("props for add actor form:")
        console.log(this.props);
    }

    render() {
        return (
            <ListGroup>
                <Panel.Body>
                    <h3><b>Add Actor:</b></h3>
                    <Form horizontal>
                        <FormGroup controlId="name">
                            <Col componentClass={ControlLabel} sm={2}>Actor:</Col>
                            <Col sm={10}>
                                <FormControl
                                    onChange={this.props.updateNewActor} value={this.props.newActor.name} type="text"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="image_url">
                            <Col componentClass={ControlLabel} sm={2} >Head shot:</Col>
                            <Col sm={10} >
                                <FormControl
                                    onChange={this.props.updateNewActor} value={this.props.newActor.image_url} type="text"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Button onClick={this.props.postActor}> Submit New Actor </Button>
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

export default AddActorForm;