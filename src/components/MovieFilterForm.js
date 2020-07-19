import React, {Component} from "react";
import {Button, Row, Checkbox, Col, ControlLabel, Form, FormControl, FormGroup, ListGroup, Panel} from "react-bootstrap";
import GenreSelector from "./GenreSelector";
//import ReactBootstrapSlider from 'react-bootstrap-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';


class MovieFilterForm extends Component {
    constructor(props) {
        super(props);
        console.log("props for movie filter form:");
        console.log(this.props);
    }

    render() {
        return (
            <Form horizontal>
                <h3>Filter Movies:</h3>
                <FormGroup
                    className="slider"
                >
                    <Col
                        className="sliderLabel"
                        componentClass={ControlLabel}
                        sm={4}>Lowest Rating:
                    </Col>
                    <Col
                        className="sliderCol"
                        sm={12}>
                        <input
                            id="minRating"
                           type="range"
                           min={0}
                           max={5}
                           step={0.1}
                           value={this.props.filters.minRating}
                           onChange={this.props.changeSlider}
                        />
                    </Col>
                    <Col
                        className="sliderText"
                        sm={2}>
                        <output
                            className="sliderOutput"
                        >
                            {this.props.filters.minRating + " stars"}
                        </output>
                    </Col>
                </FormGroup>
                <FormGroup
                    className="slider"
                >
                    <Col
                        className="sliderLabel"
                        componentClass={ControlLabel}
                        sm={4}
                    >
                        Highest Rating:</Col>
                    <Col
                        className="sliderCol"
                        sm={12}>
                        <input
                                id="maxRating"
                               type="range"
                               min={0}
                               max={5}
                               step={0.1}
                               value={this.props.filters.maxRating}
                               onChange={this.props.changeSlider}
                        />
                    </Col>
                    <Col
                        className="sliderText"
                        sm={2}>
                        <output
                            className="sliderOutput"
                        >
                            {this.props.filters.maxRating + " stars"}
                        </output>
                    </Col>
                </FormGroup>
                <FormGroup
                    className="slider"
                >
                    <Col
                        className="sliderLabel"
                        componentClass={ControlLabel}
                        sm={4}
                    >
                        Earliest Year:
                    </Col>
                    <Col
                        className="sliderCol"
                        sm={12}>
                        <input
                            id="minYear"
                            type="range"
                            min={1888}
                            max={2020}
                            step={1}
                            value={this.props.filters.minYear}
                            onChange={this.props.changeSlider}
                        />
                    </Col>
                    <Col
                        className="sliderText"
                        sm={2}>
                        <output
                            className="sliderOutput"
                        >
                            {this.props.filters.minYear}
                        </output>
                    </Col>
                </FormGroup>
                <FormGroup
                    className="slider"
                >
                    <Col
                        className="sliderLabel"
                        componentClass={ControlLabel}
                        sm={4}
                    >
                        Latest Year:
                    </Col>
                    <Col
                        className="sliderCol"
                        sm={12}>
                        <input
                            id="maxYear"
                            type="range"
                            min={1888}
                            max={2020}
                            step={1}
                            value={this.props.filters.maxYear}
                            onChange={this.props.changeSlider}
                        />
                    </Col>
                    <Col
                        className="sliderText"
                        sm={2}>
                        <output
                            className="sliderOutput"
                        >
                            {this.props.filters.maxYear}
                        </output>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col
                        className="sliderLabel"
                        componentClass={ControlLabel}
                        sm={2}
                    >
                        Genre:
                    </Col>
                    <Col sm={10} >
                        <GenreSelector
                            selectedGenres={this.props.filters.selectedGenres}
                            changeGenres={this.props.changeGenres}
                        />
                    </Col>
                </FormGroup>
                <FormGroup
                    controlId="selectedSort"
                >
                    <Col componentClass={ControlLabel} sm={2}>
                        Sort by:
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            componentClass="select"
                            onChange={this.props.updateSelectedSort}
                        >
                            {
                                this.props.filters.sortOptions.map( (option) => {
                                    return (
                                        <option
                                            value={option}
                                        >
                                            {option}
                                        </option>
                                    )
                                })
                            }
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Checkbox
                        checked={this.props.filters.ascendingOrder}
                        id="ascendingOrder"
                        onChange={this.props.toggleCheckbox}
                    >
                        Ascending Order
                    </Checkbox>
                </FormGroup>
                <FormGroup>
                    <Checkbox
                        checked={this.props.filters.excludeUnreviewed}
                        id="excludeUnreviewed"
                        onChange={this.props.toggleCheckbox}
                    >
                        Exclude movies with no reviews
                    </Checkbox>
                </FormGroup>
                <FormGroup>
                    <Button onClick={this.props.applyFilters}> Apply Filters </Button>
                </FormGroup>
                <FormGroup>
                    <Button onClick={this.props.buttonHandler}> hide </Button>
                </FormGroup>
            </Form>
        )
    }
}

export default MovieFilterForm