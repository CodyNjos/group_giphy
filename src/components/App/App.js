import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';


function App(props) {
  const [category, setNewCategory] = useState('');
  const dispatch = useDispatch();

  const retriveGihpy = (event) => {
    event.preventDefault();
    dispatch ({type: 'NEW_GIPHY', payload: category})
    setNewCategory('')
  }

  return (
    <div>
      <h1>Giphy Search!</h1>
      <form onSubmit={retriveGihpy}>
        <input 
        placeholder = "category"
        value = {category}
        onChange={event => setNewCategory(event.target.value)}
        />
        <button type = "submit">ENTER</button>
      </form>
    </div>
  );
}


export default App;
