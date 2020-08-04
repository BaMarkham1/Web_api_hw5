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
            updated['userReviewIndex'] = action.userReviewIndex;
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
        case constants.FETCH_WATCHLIST:
            console.log("in fetch watchlist reducer");
            updated["watchlistCount"] = action.watchlistCount;
            updated["onUsersWatchlist"] = action.onUsersWatchlist;
            return updated;
        case constants.SET_USER:
            console.log("in set user");
            updated["user"] = action.user;
            return updated;
        case constants.FETCH_USER_REVIEWS:
            console.log("in fetch user reviews reducer");
            updated["userReviews"] = action.userReviews;
            return updated;
        case constants.FETCH_USER_WATCHLIST:
            console.log("in fetch user watchlist reducer");
            updated["userWatchlist"] = action.userWatchlist;
            return updated;
        case constants.FETCH_USER_PIC:
            console.log("in fetch user pic reducer");
            updated["userProfilePic"] = action.userProfilePic;
            return updated;
        case constants.FETCH_USER_MOVIE:
            console.log("in fetch user movie reducer");
            console.log("user movie:");
            console.log(action.userMovie);
            let field = "";
            if (action.forWatchlist === true) field = "userWatchlist";
            else field = "userReviews";
            updated[field][action.index]["title"] = action.userMovie.title;
            updated[field][action.index]["image_url"] = action.userMovie.image_url;
            updated[field][action.index]["trailer_url"] = action.userMovie.trailer_url;
            updated[field][action.index]["avg_rating"] = action.userMovie.avg_rating;
            updated[field][action.index]["genres"] = action.userMovie.genres;
            return updated;
        case constants.FETCH_REVIEW_PIC:
            console.log("in fetch review pic reducer");
            updated["reviews"][action.index]["profile_pic"] = action.profile_pic
            return updated;
        default:
            return state;
    }
}
