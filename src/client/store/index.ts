import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import blogsReducer from '../app/ducks/blogs';
import modalManagerReducer from '../app/ducks/modal-manager';

const rootReducer = combineReducers({
    blogs: blogsReducer,
    modalManager: modalManagerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
});

export default store;
