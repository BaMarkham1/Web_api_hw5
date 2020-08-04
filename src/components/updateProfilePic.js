import React, {Component} from "react";
import {
    Button, ButtonGroup,
    ButtonToolbar,
    Form,
    FormControl,
    FormGroup,
} from "react-bootstrap";

export default class UpdateProfilePic extends Component {
    constructor(props) {
        super(props);
        console.log("props for UpdateProfilePic:")
        console.log(this.props);
    }

    render() {
        return(
            <div>
                <ButtonToolbar>
                    <ButtonGroup>
                        <button
                            id="change_profile_pic"
                            class="btn btn-primary btn-sm"
                            onClick={this.props.setProfilePic}
                        >
                            Set New Profile Pic
                        </button>
                    </ButtonGroup>
                </ButtonToolbar>
                {
                    this.props.changeProfilePic === true ?
                        <Form horizontal>
                            <FormGroup controlId="profilePic">
                                <FormControl
                                    onChange={this.props.updateProfilePic} value={this.props.updatedProfilePic} type="text"
                                />
                                <Button
                                    onClick={this.props.putProfilePic}
                                    className="btn btn-primary btn-sm"
                                >
                                    Submit Changes
                                </Button>
                                <Button
                                    onClick={this.props.setProfilePic}
                                    className="btn btn-primary btn-sm"
                                >
                                    Cancel
                                </Button>
                            </FormGroup>
                        </Form>
                        :
                        <p></p>
                }
            </div>

        )
    }
}
