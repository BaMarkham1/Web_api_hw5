import React, {Component} from "react";
import {Button, Form, FormGroup, ListGroup, Panel, ButtonGroup, ButtonToolbar} from "react-bootstrap";
import StarRatings from "react-star-ratings";

class SubmitReviewForm extends Component {
    constructor(props) {
        super(props);
        console.log("Review form props:")
        console.log(props)
        //this.handleChange = this.handleChange.bind(this);
    }

    render() {
        if (!this.props.movie){
            return (
                <p>...loading</p>
            )
        }
        else {
            return (
                <ListGroup>
                    <Panel.Body>
                        <Form horizontal>
                            <h3>
                                    Submit a Review for {this.props.movie.title}
                            </h3>
                            <FormGroup controlId="rating">
                                <StarRatings
                                    rating={this.props.review.rating}
                                    starRatedColor="blue"
                                    changeRating={this.props.changeRating}
                                    name='rating'
                                />
                            </FormGroup>
                            <FormGroup controlId="quote">
                                    <textarea
                                        id="quote" onChange={this.props.updateReview} value={this.props.review.quote} type="quote" placeholder="Write a review"
                                    />
                            </FormGroup>
                            <FormGroup>
                                <button
                                    onClick={this.props.postReview}
                                    className ="btn btn-primary btn-sm"
                                >
                                    Submit Review
                                </button>
                            </FormGroup>
                            <FormGroup>
                                <button
                                    onClick={this.props.buttonHandler}
                                    className="btn btn-primary btn-sm"
                                >
                                    Hide
                                </button>
                            </FormGroup>
                        </Form>
                    </Panel.Body>
                </ListGroup>
            )
        }

    }
}

export default SubmitReviewForm;
