import constants from '../constants/actionTypes'

var initialState = {
    movies: [],
    selectedMovie: null
}

export default (state = initialState, action) => {
    var updated = Object.assign({}, state);

    switch(action.type) {
        case constants.FETCH_MOVIES:
            updated['movies'] = action.movies;
            updated['selectedMovie'] = action.movies[0];
            return updated;
        case constants.SET_MOVIE:
            console.log("selected movie in set movie:");
            console.log(action.selectedMovie);
            updated['selectedMovie'] = action.selectedMovie;
            return updated;
        case constants.SET_ACTOR:
            console.log("selected actor in set actor:");
            console.log(action.selectedActor);
            updated['selectedActor'] = action.selectedActor;
            return updated;
        case constants.FETCH_MOVIE:
            console.log("in movie reducer:");
            console.log(action.selectedMovie);
            console.log("state beforehand:");
            console.log(state);
            updated['selectedMovie'] = action.selectedMovie;
            console.log("updated in fetch movie");
            console.log(updated);
            return updated;
        case constants.FETCH_REVIEWS:
            console.log("in fetch review movie reducer:");
            updated['reviews'] = action.reviews;
            console.log("updated:");
            console.log(updated);
            return updated;
        case constants.FETCH_MOVIE_ROLES:
            console.log("in fetch movie roles");
            updated['movieRoles'] = action.movieRoles;
            console.log("updated:");
            console.log(updated);
            return updated;
        case constants.FETCH_ACTOR_ROLES:
            updated['actorRoles'] = action.actorRoles;
            console.log("updated actor roles:");
            console.log(updated);
            return updated;
        case constants.FETCH_ACTORS:
            console.log("in fetch actors");
            updated['actors'] = action.actors;
            console.log("updated");
            console.log(updated);
            return updated;
        case constants.FETCH_ACTOR:
            console.log("in fetch actor reducer");
            updated["selectedActor"] = action.selectedActor;
            return updated;
        default:
            return state;
    }
}