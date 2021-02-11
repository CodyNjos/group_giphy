import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";

import FavoritesComponent from '../FavoritesComponent/FavoritesComponent.jsx';

function App(props) {
  const [category, setNewCategory] = useState('');
  const dispatch = useDispatch();

  const retriveGihpy = (event) => {

  }

  return (
    <Router>
    <div>
      <h1>Giphy Search!</h1>
      <nav>
        <Link to='/'></Link>
        <Link to='/favorites'>Favorites</Link>
      </nav>
      <form onSubmit={retriveGihpy}>
        <input
          placeholder="category"
          value={category}
          onChange={event => setNewCategory(event.target.value)}
        />
        <button type="submit">ENTER</button>
      </form>
      <Switch>
        <Route exact path='/'>

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