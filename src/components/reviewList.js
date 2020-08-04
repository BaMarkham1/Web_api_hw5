import React, {Component} from "react";
import {Button, ButtonGroup, ButtonToolbar, Col, Form, FormControl, FormGroup, Image} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import StarRatings from "react-star-ratings";

export default class ReviewList extends Component {
    constructor(props) {
        super(props);
        console.log("props for reviewList:")
        console.log(this.props);
    }

    render() {
        return(
            this.props.reviews.map((review, i) =>
                <div
                    className="review-list"
                    key="userReviewList"
                >
                    <Col sm={3}>
                        <LinkContainer
                            to={this.props.linkRoute+review[this.props.linkParamField]}
                        >
                            <Image
                                className="reviewPic"
                                src={review[this.props.imageField]}
                                thumbnail
                            />
                        </LinkContainer>
                    </Col>
                    <Col sm={9} className="review-info">
                        <p>
                            <h4><b>{review[this.props.itemHeader]}</b></h4>
                            <StarRatings
                                rating={review.rating}
                                starDimension="20px"
                                starSpacing="0px"
                                starRatedColor="blue"
                            />
                        </p>
                        <p key={review.quote}>
                            {"\""+ review.quote +  "\""}
                        </p>
                    </Col>
                    <br></br>
                </div>
            )
        )
    }
}
