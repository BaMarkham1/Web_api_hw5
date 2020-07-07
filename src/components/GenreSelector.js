import React, {Component} from "react";
import MultiSelect from "@khanacademy/react-multi-select";

class GenreSelector extends Component {
    constructor(props) {
        super(props);
        console.log("Genre selector props:");
        console.log(props);
        this.state = {
            selected: [],
            genres : [
                {label: "Action", value: "Action"},
                {label: "Horror", value: "Horror"},
                {label: "Comedy", value: "Comedy"},
                {label: "Adventure", value: "Adventure"},
                {label: "Science Fiction", value: "Science Fiction"},
                {label: "Romance", value: "Romance"}
            ]
        };
    }

    render() {
        const {selected} = this.state;

        return <MultiSelect
            options={this.state.genres}
            selected={this.props.genres}
            onSelectedChanged={(selected) => this.props.updateGenres()}
        />
    }
}

export default GenreSelector