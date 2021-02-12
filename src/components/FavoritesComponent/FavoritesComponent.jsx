import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';

function FavoritesComponent() {
    const dispatch = useDispatch();
    const reduxStore = useSelector(store => store);

    useEffect(() => {
        dispatch({ type: 'FETCH_FAVORITES' });
    }, []);

    return (
        <>
            {reduxStore.favoritesReducer.map(favorite =>
                <div key={favorite.id}>
                    <img src={favorite.url} />
                    <p>Category: {favorite.name ? favorite.name :
                        reduxStore.categoryReducer.map(category => {
                            return (
                                <>
                                    <input type="radio" name="category" id={category.id} onChange={() => dispatch({ type: 'SET_CATEGORYID', payload: {categoryId: category.id, gifId: favorite.id }})} />
                                    <label htmlFor={category.id}>{category.name}</label>
                                </>
                            );
                        })
                    }</p>
                    <Button variant="contained" color="primary" onClick={() => dispatch({ type: 'REMOVE_FAVORITE', payload: favorite.id })}>Remove From Favorites</Button>
                </div>
            )}
        </>
    );
};

export default FavoritesComponent;