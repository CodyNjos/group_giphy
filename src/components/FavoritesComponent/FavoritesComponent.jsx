import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function FavoritesComponent() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_FAVORITES' });
    }, []);

    return (
        <img src="https://media1.giphy.com/media/26n7b7PjSOZJwVCmY/giphy.gif?cid=ecf05e47apbe3ix8h1tl6tbomhxov9ostvm90kuc2edttcbc&rid=giphy.gif" />
    );
};

export default FavoritesComponent;