import React from 'react';
import './App.css';
import MovieHeader from './components/movieheader';
import MovieList from './components/movielist';
import Actor from './components/Actor';
import Movie from './components/movie';
import UserProfile from './components/userProfile';
import Authentication from './components/authentication';
import {HashRouter,Route} from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './stores/store'
//import "bootstrap/dist/css/bootstrap.css";
//import "bootstrap-slider/dist/css/bootstrap-slider.css"

function App() {
  return (
      <div className="App">
        <Provider store={store}>
          <HashRouter>
            <div>
              <MovieHeader />
              <Route exact path="/" render={()=><MovieList />}/>
              <Route exact path="/movielist" render={()=><MovieList />}/>
              <Route exact path="/movies/:movieId" render={(props)=><Movie />}/>
              <Route path="/signin" render={()=><Authentication />}/>
              <Route exact path="/actors/:actorId" render={()=><Actor/>}/>
              <Route exact path="/user/:username" render={()=><UserProfile/>}/>
            </div>
          </HashRouter>
        </Provider>
      </div>
  );
}

export default App;
