import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import { TextField, Button } from '@material-ui/core';
import './App.css'
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
      <div className='app'>
        <div className='header'>
          <h1>Giphy Search!</h1>
          <nav>
            <Link to='/'></Link>
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
              <img src={store.giphyReducer} />

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