import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer';
import action from '../action';

//自定义logger中间件
const logger = store => next => action => {
    if (typeof action === 'function') {
        console.log('dispatching is a function')
    } else {
        console.log('dispatching ', action)
    }
    const result = next(action);
    console.log('nextState',store.getState())
    return result;

}

const middlewares = [logger,thunk];

export default createStore(reducers, applyMiddleware(...middlewares));
