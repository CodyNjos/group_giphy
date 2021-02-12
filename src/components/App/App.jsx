import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import { TextField, Button } from '@material-ui/core';
import './App.css'
import FavoritesComponent from '../FavoritesComponent/FavoritesComponent.jsx';
import reduxSaga from 'redux-saga';

function App() {
  const [category, setNewCategory] = useState('');
  const dispatch = useDispatch();
  const store = useSelector(store => store);

  const retriveGihpy = (event) => {
    event.preventDefault();
    dispatch({ type: 'NEW_GIPHY', payload: category });
  };

  const addToFavorites = () => {
    dispatch({type: 'ADD_FAVORITE', payload: store.giphyReducer});
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_CATEGORIES' });
  }, [])

  return (
    <Router>

      <div className="app">
        <div className='header'>
        <h1>Giphy Search!</h1>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/favorites'>Favorites</Link>
        </nav>
        </div>
        <Switch>
          <Route exact path='/'>
          <div className='inputForm'>
              <form  onSubmit={retriveGihpy}>
                <TextField
                  id="outlined-basic"
                  label="Category"
                  variant="outlined"
                  value={category}
                  onChange={event => setNewCategory(event.target.value)}
                />
                <br/>
                <Button variant="contained" color="primary" type="submit">SEARCH</Button>
              </form>
            </div>
            <div>
              {store.categoryReducer.map(category => {
                return (
                  <>
                    <input type="radio" name="category" id={category.id} onChange={() => dispatch({ type: 'SET_CATEGORYID', payload: category.id })} />
                    <label htmlFor={category.id}>{category.name}</label>
                  </>
                );
              })}
            </div>
            {store.giphyReducer.url &&
              <div>
                <img src={store.giphyReducer.url} />
                <Button onClick={addToFavorites}>Favorite</Button>
              </div>}

          </Route>
          <Route path='/favorites'>
            <FavoritesComponent />
          </Route>
        </Switch>
      </div>
    </Router>
  )

};
export default App;