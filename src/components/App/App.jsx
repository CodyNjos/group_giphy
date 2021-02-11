import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";

import FavoritesComponent from '../FavoritesComponent/FavoritesComponent.jsx';

function App() {
  const [category, setNewCategory] = useState('');
  const dispatch = useDispatch();
  const store = useSelector(store => store);

  const retriveGihpy = (event) => {
    event.preventDefault();
    dispatch({ type: 'NEW_GIPHY', payload: category });
  };

  return (
    <Router>
      <div>
        <h1>Giphy Search!</h1>
        <nav>
          <Link to='/'></Link>
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
            <img src={store.giphyReducer} />
            <p>{console.log(store)}</p>
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