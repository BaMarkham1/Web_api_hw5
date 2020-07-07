import React, {Component} from "react";
import {Image} from "react-bootstrap";

class MovieRoleScroller extends Component {
    constructor(props) {
        super(props);
        console.log("RoleScroll props:");
        console.log(props);
    }

    render() {
        if (this.props.movieRoles) {
            return (
                <div class="RoleScroll">
                    {this.props.movieRoles.map( (role, index) =>
                        <div class="RoleScrollItem">
                            <Image
                                className="image"
                                src={role.img_url}
                            />
                            <p>
                                <b>
                                    {role.actor_name}
                                </b>
                                {" as " + role.char_name}
                            </p>
                        </div>
                    )}
                </div>
            )
        }
        else {
            return (
                <p>No roles for this movie</p>
            )
        }
    }
}

export default MovieRoleScroller