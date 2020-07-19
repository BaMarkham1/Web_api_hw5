import React, {Component} from "react";
import {Image} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

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
                            <LinkContainer
                                to={'/actors/'+role.actor_id}
                                onClick={()=>this.props.handleClick(role)}
                                >
                                <Image
                                    className="image"
                                    src={role.img_url}
                                />
                            </LinkContainer>
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