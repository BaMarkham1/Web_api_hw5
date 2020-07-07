import React, {Component} from "react";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, ListGroup, Panel} from "react-bootstrap";
import GenreSelector from "./GenreSelector";

class MovieEditForm extends Component {
    constructor(props) {
        super(props);
        console.log("props for movie edit form:")
        console.log(this.props);
        this.state = {
            startingTitle : this.props.movie.title
        };
    }

    render() {
        console.log("props for movie edit form:")
        console.log(this.props);
        if (!this.props.movie){
            return (
                <p>...loading</p>
            )
        }
        else {
            return (
                <ListGroup>
                    <Panel.Body>
                        <h3><b>Edit {this.state.startingTitle} details</b></h3>
                        <Form horizontal>
                            <FormGroup controlId="title">
                                <Col componentClass={ControlLabel} sm={2}>Title:</Col>
                                <Col sm={10}>
                                    <FormControl
                                        onChange={this.props.updateDetails} value={this.props.movie.title} type="text"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="year">
                                <Col componentClass={ControlLabel} sm={2} >Year:</Col>
                                <Col sm={10} >
                                    <FormControl
                                        onChange={this.props.updateDetails} value={this.props.movie.year} type="text"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="genre">
                                <Col componentClass={ControlLabel} sm={2} >Genre:</Col>
                                <Col sm={10} >
                                    <FormControl
                                        onChange={this.props.updateDetails} value={this.props.movie.genre} type="text"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2} >Genre: </Col>
                                <Col sm={10} >
                                    <GenreSelector
                                        genres={this.props.movie.genres}
                                        updateGenres={this.props.updateGenres}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="image_url">
                                <Col componentClass={ControlLabel} sm={2} >Cover image:</Col>
                                <Col sm={10} >
                                    <FormControl
                                        onChange={this.props.updateDetails} value={this.props.movie.image_url} type="text"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="trailer_url">
                                <Col componentClass={ControlLabel} sm={2} >Trailer video:</Col>
                                <Col sm={10} >
                                    <FormControl
                                        onChange={this.props.updateDetails} value={this.props.movie.trailer_url} type="text"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Button onClick={this.props.putMovie}> Submit Changes </Button>
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

export default MovieEditForm;