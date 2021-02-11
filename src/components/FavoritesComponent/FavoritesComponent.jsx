import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function FavoritesComponent() {
    const dispatch = useDispatch();
    const reduxStore = useSelector(store => store.favoritesReducer);

    useEffect(() => {
        dispatch({ type: 'FETCH_FAVORITES' });
    }, []);

    return (
        <>
            {reduxStore.map(favorite => 
                <div key={favorite.id}>
                    <img src={favorite.url}/>
                    <p>Category: {favorite.name}</p>
                    <button onClick={() => dispatch({type: 'REMOVE_FAVORITE', payload: favorite.id})}>Remove From Favorites</button>
                </div>
            )}
        </>
    );
};

export default FavoritesComponent;