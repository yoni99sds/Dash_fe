
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import redirectAfterLogoutMiddleware from '../middleware/redirectAfterLogout';

const store = createStore(rootReducer, applyMiddleware(redirectAfterLogoutMiddleware));

export default store;
