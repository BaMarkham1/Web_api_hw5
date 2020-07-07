import React, {Component} from "react";
//import MultiSelect from "@khanacademy/react-multi-select";

import Select from 'react-select';

class GenreSelector extends Component {
    constructor(props) {
        super(props);
        console.log("Genre selector props:");
        console.log(props);
        this.state = {
            genres : [
                {label: "Action", value: "Action"},
                {label: "Horror", value: "Horror"},
                {label: "Comedy", value: "Comedy"},
                {label: "Adventure", value: "Adventure"},
                {label: "Science Fiction", value: "Science Fiction"},
                {label: "Romance", value: "Romance"},
                {label: "Fantasy", value: "Fantasy"},
                {label: "Sports", value: "Sports"},
                {label: "Drama", value: "Drama"}
            ]
        };

    }

    render() {
        return(
            <Select
                defaultValue={this.props.selectedGenres}
                isMulti
                name="genres"
                options={this.state.genres}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={this.props.changeGenres}
            />
        )
    }
}

/*
class GenreSelector extends Component {
    constructor(props) {
        super(props);
        console.log("Genre selector props:");
        console.log(props);
        this.state = {
            genres : [
                "Action",
                "Horror",
                "Comedy",
                "Adventure",
                "Science Fiction",
                "Romance",
            ]
        };
    }

    render() {
        return (
            <select id="genre_select" multiple={true}>
                {
                    this.state.genres.map( genre => {
                        return (
                            <option
                                value={genre}
                            >
                                {genre}
                            </option>
                        )
                    })
                }
            </select>
        )
    }
}


                   this.state.genres.map( (genre, index)  => {
                       if (this.props.selectedGenres.includes(genre)) {
                           return (
                               <option selected
                                       value={genre}
                               >
                                   {genre}
                               </option>
                           )
                       }
                       else {
                           return (
                               <option
                                   value={genre}
                               >
                                   {genre}
                               </option>
                           )
                       }

                   })
                   */


/*
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
        const {selected} = this.props.genres;
        console.log("genres");
        console.log(this.props.genres);
        return <MultiSelect
            options={this.state.genres}
            selected={this.props.genres}
            onSelectedChanged={(selected) => this.props.updateGenres()}
        />
    }
}
 */

export default GenreSelector