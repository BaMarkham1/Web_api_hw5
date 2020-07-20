import React, {Component} from "react";
import {Image} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

class ActorRoleScroller extends Component {
    constructor(props) {
        super(props);
        console.log("Actor RoleScroll props:");
        console.log(props);
    }

    render() {
        if (this.props.actorRoles) {
            return (
                <div class="RoleScroll">
                    {this.props.actorRoles.map( (role, index) =>
                        <div class="RoleScrollItem">
                            <LinkContainer
                                to={'/movies/'+role.movie_id}
                                onClick={()=>this.props.handleClick(role)}
                            >
                                <Image
                                    className="image"
                                    src={role.movie_img}
                                />
                            </LinkContainer>
                            <p>
                                <b>
                                    {role.char_name}
                                </b>
                                {" in " + role.movie_name}
                            </p>
                        </div>
                    )}
                </div>
            )
        }
        else {
            return (
                <p>No roles for this actor</p>
            )
        }
    }
}

export default ActorRoleScroller