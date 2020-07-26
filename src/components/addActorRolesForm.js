import React, {Component} from "react";
import {Button, Col, Checkbox, ControlLabel, Form, FormControl, FormGroup, ListGroup, Panel, Row} from "react-bootstrap";

class AddActorRolesForm extends Component {
    constructor(props) {
        super(props);
        console.log("RoleForm props:");
        console.log(props);
        console.log("roles array");
        console.log(props.rolesArray);
    }

    render() {
        console.log("movies in role form:");
        console.log(this.props.movies);
        return (
            <ListGroup>
                <Panel.Body>
                    <h3>
                        <b>
                            {this.props.rolesArray.length > 0 ? "Add roles" : <p></p> }
                        </b>
                    </h3>
                    <Form horizonal>
                        {
                            this.props.rolesArray.map((role, i) => {
                                return (
                                    <div>
                                        <FormGroup controlId={i}>
                                            <Col componentClass={ControlLabel} sm={2}>
                                                Movie:
                                            </Col>
                                            <Col sm={10}>
                                                <FormControl componentClass="select" onChange={this.props.updateSelectedMovie}>
                                                    {
                                                        this.props.movies.map( (movie, j)  => {
                                                            return (
                                                                <option
                                                                    value={j}
                                                                >
                                                                    {movie.title}
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </FormControl>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup controlId={"char_name" + i.toString()}>
                                            <Row>
                                                <Col componentClass={ControlLabel} sm={2}>Character:
                                                </Col>
                                                <Col sm={10}>
                                                    <FormControl
                                                        onChange={this.props.updateNewRoles}
                                                        value={this.props.rolesArray[i].char_name} type="text"
                                                    />
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </div>
                                )
                            })
                        }
                        <FormGroup>
                            {this.props.rolesArray.length > 0
                                ?
                                <Button
                                    onClick={this.props.deleteRole}
                                >
                                    Delete Role
                                </Button>
                                :
                                <p></p> }
                        </FormGroup>
                        <FormGroup>
                            <Button onClick={this.props.addNewRole}>Add role</Button>
                        </FormGroup>
                        <FormGroup>
                            {this.props.rolesArray.length >0 ? <Button onClick={this.props.submitNewRoles}> Submit Roles </Button> : <p></p>}
                        </FormGroup>
                    </Form>
                </Panel.Body>
            </ListGroup>
        )
    }
}

export default AddActorRolesForm;
