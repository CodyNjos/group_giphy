import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";

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
      <div>
        <h1>Giphy Search!</h1>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/favorites'>Favorites</Link>
        </nav>

        <Switch>
          <Route exact path='/'>
            <form onSubmit={retriveGihpy}>
              <input
                placeholder="category"
                value={category}
                onChange={event => setNewCategory(event.target.value)}
              />
              <button type="submit">ENTER</button>
            </form>
            <div>
              {store.categoryReducer.map(category => {
                return (
                  <>
                    <input type="radio" name="category" id={category.id} checked={store.giphyReducer.categoryId === category.id} onChange={() => dispatch({ type: 'SET_CATEGORYID', payload: category.id })} />
                    <label htmlFor={category.id}>{category.name}</label>
                  </>
                );
              })}
            </div>
            {store.giphyReducer.url &&
              <div>
                <img src={store.giphyReducer.url} />
                <button onClick={addToFavorites}>Favorite</button>
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