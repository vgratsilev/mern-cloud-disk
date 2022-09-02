import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import userReducer from 'reducers/userReducer';
import fileReducer from 'reducers/fileReducer';

const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
