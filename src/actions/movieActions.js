import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env';

function moviesFetched(movies) {
    return {
        type: actionTypes.FETCH_MOVIES,
        movies: movies
    }
}

function actorsFetched(actors) {
    return {
        type: actionTypes.FETCH_ACTORS,
        actors: actors
    }
}

function movieFetched(movie) {
    console.log("in movieFetched");
    console.log(movie);
    return {
        type: actionTypes.FETCH_MOVIE,
        selectedMovie: movie
    }
}

function actorFetched(actor) {
    console.log("in actorFetched");
    console.log(actor);
    return {
        type: actionTypes.FETCH_ACTOR,
        selectedActor: actor
    }
}

function reviewsFetched(reviews) {
    console.log("in reviews fetched");
    console.log(reviews);
    return {
        type: actionTypes.FETCH_REVIEWS,
        reviews: reviews
    }
}

function movieRolesFetched(movieRoles) {
    console.log("in movieRolesFetched");
    console.log(movieRoles);
    return {
        type: actionTypes.FETCH_MOVIE_ROLES,
        movieRoles: movieRoles
    }
}

function actorRolesFetched(actorRoles) {
    console.log("in actorRolesFetched");
    console.log(actorRoles);
    return {
        type: actionTypes.FETCH_ACTOR_ROLES,
        actorRoles: actorRoles
    }
}


function movieSet(movie) {
    return {
        type: actionTypes.SET_MOVIE,
        selectedMovie: movie
    }
}

export function setMovie(movie) {
    return dispatch => {
        dispatch(movieSet(movie))
    }
}

function actorSet(actor) {
    return {
        type: actionTypes.SET_ACTOR,
        selectedActor: actor
    }
}

export function setActor(actor) {
    return dispatch => {
        dispatch(actorSet(actor))
    }
}

export function fetchMovies(queryString) {
    const env = runtimeEnv();
    return dispatch => {
        console.log("in fetch movies");
        return fetch(`${env.REACT_APP_API_URL}/movies` + queryString, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                dispatch(moviesFetched(res.movies));
            })
            .catch( (e) => console.log(e) );
    }
}

export function fetchActors() {
    const env = runtimeEnv();
    return dispatch => {
        console.log("in fetch movies");
        return fetch(`${env.REACT_APP_API_URL}/actors?sort=name`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                dispatch(actorsFetched(res.actors));
            })
            .catch( (e) => console.log(e) );
    }
}

export function fetchMovie(movieId){
    const env = runtimeEnv();
    console.log("in fetchMovie");
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies/${movieId}?reviews=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                dispatch(movieFetched(res.movie));
            })
            .catch( (e) => console.log(e) );
    }
}

export function fetchActor(actorId){
    const env = runtimeEnv();
    console.log("in fetchActor");
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/actors/${actorId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                dispatch(actorFetched(res.actor));
            })
            .catch( (e) => console.log(e) );
    }
}

export function fetchReviews(movieId){
    const env = runtimeEnv();
    console.log("in fetch review");
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/reviews/${movieId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                dispatch(reviewsFetched(res.reviews));
            })
            .catch( (e) => console.log(e) );
    }
}

export function fetchMovieRoles(movieId){
    const env = runtimeEnv();
    console.log("in fetch review");
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/roles/movie/${movieId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                dispatch(movieRolesFetched(res.movieRoles));
            })
            .catch( (e) => console.log(e) );
    }
}

export function fetchActorRoles(actorId){
    const env = runtimeEnv();
    console.log("in fetch actor roles");
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/roles/actor/${actorId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                dispatch(actorRolesFetched(res.actorRoles));
            })
            .catch( (e) => console.log(e) );
    }
}

export function postNewReview(newReview){
    console.log("review:");
    console.log(JSON.stringify(newReview));
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/reviews/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(newReview),
            mode: 'cors'})
            .then( (response) => {
                console.log(response);
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                console.log("response:");
                console.log(response.json);
                if (response.status == 200) {
                    console.log("status was 200");
                    console.log(newReview);
                    dispatch(fetchReviews(newReview.movie_id));
                    dispatch(fetchMovie(newReview.movie_id));
                }
                return response.json;
            })
            .catch( (e) => {
                console.log(e)
            })
    }
}

export function putRole(editedRole) {
    console.log("edited role:");
    console.log(editedRole);
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/role/`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(editedRole),
            mode: 'cors'
        })
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                console.log("response:");
                console.log(response);
                if (response.status == 200) {
                    console.log("status was 200");
                    dispatch(fetchMovieRoles(editedRole.movie_id));
                }
                return response;

            })
            .catch((e) => {
                console.log(e)
            })
    }
}

export function postRole(newRole, movieId){
    console.log("role:");
    console.log(JSON.stringify(newRole));
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/role/`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(newRole),
            mode: 'cors'})
            .then( (response) => {
                console.log(response);
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                console.log("response:");
                console.log(response);
                if (response.status == 200) {
                    console.log("status was 200");
                    dispatch(fetchMovieRoles(movieId));
                }
                return response;

            })
            .catch( (e) => {
                console.log(e)
            })
    }
}

export function newPutMovie(movieDetails){
    const env = runtimeEnv();
    console.log(movieDetails);
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies/`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(movieDetails),
            mode: 'cors'})
            .then( (response) => {
                console.log(response);
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                console.log("response:")
                console.log(response.json);
                if (response.status == 200) {
                    console.log("status was 200");
                    dispatch(fetchMovie(movieDetails.movie_id));
                }
                return response.json;
            })
            .catch( (e) => {
                console.log(e)
        })
    }
}