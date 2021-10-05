import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import usersReducer from '../ducks/users';

const rootReducer = combineReducers({
    userSlice: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
});

export default store;
