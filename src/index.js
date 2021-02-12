import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

function* fetchGiphyListSaga(action) {
    console.log('newGif', action.payload)
    try {
        let response = yield axios.get(`/api/favorite/search/${action.payload}`)
        yield put({ type: 'SET_LIST', payload: response.data })
    } catch (error) {
        console.log(`Error getting new gif`, error);
    };
};

function* fetchFavoritesSaga() {
    try {
        let response = yield axios.get('/api/favorite');
        yield put({ type: 'SET_FAVORITES', payload: response.data });
    } catch (error) {
        console.log('Error in fetch', error);
    };
};

function* removeFavoriteSaga(action) {
    try {
        yield axios.delete(`/api/favorite/delete/${action.payload}`);
        yield put({ type: 'FETCH_FAVORITES' });
    } catch (error) {
        console.log('Error in delete', error);
    };
};

function* fetchCategorySaga() {
    try {
        let response = yield axios.get('/api/category');
        yield put({ type: 'SET_CATEGORIES', payload: response.data });
    } catch (error) {
        console.log('Error in fetch', error);
    };
};

function* addFavoriteSaga(action) {
    try {
        yield axios.post(`api/favorite/addfavorite`, {payload: action.payload});
    } catch (error) {
        console.log('Error in add', error);
    };
};

function* rootGiphySaga() {
    yield takeEvery('NEW_GIPHY', fetchGiphyListSaga)
    yield takeEvery('FETCH_FAVORITES', fetchFavoritesSaga);
    yield takeEvery('REMOVE_FAVORITE', removeFavoriteSaga);
    yield takeEvery('FETCH_CATEGORIES', fetchCategorySaga);
    yield takeEvery('ADD_FAVORITE', addFavoriteSaga)
};

const sagaMiddleware = createSagaMiddleware();

const giphyListReducer = (state = { data: [] }, action) => {
    if (action.type === 'SET_LIST') {
        return action.payload;
    };
    return state;
};

const giphyReducer = (state = { url: '', categoryId: 0 }, action) => {
    let newState = { ...state };

    switch (action.type) {
        case 'SET_GIPHY':
            newState.url = action.payload;
            return newState;
        case 'SET_CATEGORYID':
            newState.categoryId = action.payload;
            return newState;
        case 'RESET_STATE':
            return { url: '', categoryId: 0 };
        default:
            return state;
    };
};

const categoryReducer = (state = [], action) => {
    if (action.type === 'SET_CATEGORIES') {
        return action.payload;
    };

    return state;
};

const favoritesReducer = (state = [], action) => {
    if (action.type === 'SET_FAVORITES') {
        return action.payload;
    };

    return state;
};


const storeInstance = createStore(
    combineReducers({
        giphyReducer,
        favoritesReducer,
        categoryReducer,
        giphyListReducer
    }),
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootGiphySaga);

ReactDOM.render(<Provider store={storeInstance}><App /> </Provider>, document.getElementById('root'));
