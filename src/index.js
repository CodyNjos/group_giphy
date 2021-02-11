import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';


function* fetchGiphySaga(action) {
    try {
        let response = yield axios.get('/api/category');

        yield put({ type: 'SET_GIPHY', payload: response.data });
    } catch (error) {
        console.log(`Error fetching giphy`, error);
    }
}


function* rootGiphySaga() {
    yield takeEvery('FETCH_GIPHY', fetchGiphySaga);
}

const sagaMiddleware = createSagaMiddleware();

const giphyReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GIPHY':
            return action.payload;
        default:
            return state;
    }
}

const storeInstance = createStore(
    combineReducers({
        giphyReducer
    }),
    applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(rootGiphySaga);

ReactDOM.render(<Provider store={storeInstance}><App /> </Provider>, document.getElementById('root'));
