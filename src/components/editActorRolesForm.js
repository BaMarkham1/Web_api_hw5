import React, {Component} from "react";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, ListGroup, Panel, Row} from "react-bootstrap";

class EditActorRolesForm extends Component {
    constructor(props) {
        super(props);
        console.log("edit roles props:");
        console.log(this.props);
    };

    render() {
        console.log("actor roles:");
        console.log(this.props.editedRoles);
        if (!this.props.editedRoles) {
            return (
                <p>loading roles</p>
            );
        } else {
            return (
                <ListGroup>
                    <Panel.Body>
                        <h3>
                            <b>
                                {this.props.editedRoles.length > 0 ? "Edit roles" : <p>There are no roles submited for this movie. Add some by pressing the "Add role(s)" button </p> }
                            </b>
                        </h3>
                        <Form horizonal>
                            {
                                this.props.editedRoles.map((role, i) => {
                                    return (
                                        <div>
                                            <FormGroup>
                                                <Col componentClass={ControlLabel} sm={2}>
                                                    Movie:
                                                </Col>
                                                <Col sm={10}>
                                                    <select id={i} className="form-control" onChange={this.props.updateSelectedMovie} >
                                                        {
                                                            this.props.movies.map( (movie, j)  => {
                                                                if (role.movie_name === movie.title) {
                                                                    console.log("found a match");
                                                                    console.log("movie name:");
                                                                    console.log(movie.title);
                                                                    console.log("movie role");
                                                                    console.log(role);
                                                                    return (
                                                                        <option selected
                                                                                value={j}
                                                                        >
                                                                            {movie.title}
                                                                        </option>
                                                                    )
                                                                }
                                                                else {
                                                                    return (
                                                                        <option
                                                                            value={j}
                                                                        >
                                                                            {movie.title}
                                                                        </option>
                                                                    )
                                                                }

                                                            })
                                                        }
                                                    </select>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup controlId={"char_name" + i.toString()}>
                                                <Row>
                                                    <Col componentClass={ControlLabel} sm={2}>Character:
                                                    </Col>
                                                    <Col sm={10}>
                                                        <FormControl
                                                            value={this.props.editedRoles[i].char_name} type="text"
                                                            onChange={this.props.updateEditedRoles}
                                                        />
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                        </div>
                                    )
                                })
                            }
                            <FormGroup>
                                {this.props.editedRoles.length >0 ? <Button onClick={this.props.submitEditedRoles}> Submit Roles </Button> : <p></p>}
                            </FormGroup>
                        </Form>
                    </Panel.Body>
                </ListGroup>
            )
        }
    }
}

export default EditActorRolesForm;
