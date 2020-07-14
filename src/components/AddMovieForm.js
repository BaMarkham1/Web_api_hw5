import React, {Component} from "react";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, ListGroup, Panel} from "react-bootstrap";
import GenreSelector from "./GenreSelector";

class AddMovieForm extends Component {
    constructor(props) {
        super(props);
        console.log("props for movie edit form:")
        console.log(this.props);
    }

    render() {
        console.log("props for add movie form:")
        console.log(this.props);
        return (
            <ListGroup>
                <Panel.Body>
                    <h3><b>Add New Movie:</b></h3>
                    <Form horizontal>
                        <FormGroup controlId="title">
                            <Col componentClass={ControlLabel} sm={2}>Title:</Col>
                            <Col sm={10}>
                                <FormControl
                                    onChange={this.props.updateNewMovie} value={this.props.newMovie.title} type="text"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="year">
                            <Col componentClass={ControlLabel} sm={2} >Year:</Col>
                            <Col sm={10} >
                                <FormControl
                                    onChange={this.props.updateNewMovie} value={this.props.newMovie.year} type="text"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2} >Genre: </Col>
                            <Col sm={10} >
                                <GenreSelector
                                    selectedGenres={this.props.newMovie.selectedGenres}
                                    changeGenres={this.props.changeGenres}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="image_url">
                            <Col componentClass={ControlLabel} sm={2} >Cover image:</Col>
                            <Col sm={10} >
                                <FormControl
                                    onChange={this.props.updateNewMovie} value={this.props.newMovie.image_url} type="text"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="trailer_url">
                            <Col componentClass={ControlLabel} sm={2} >Trailer video:</Col>
                            <Col sm={10} >
                                <FormControl
                                    onChange={this.props.updateNewMovie} value={this.props.newMovie.trailer_url} type="text"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Button onClick={this.props.postMovie}> Submit Changes </Button>
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

export default AddMovieForm;