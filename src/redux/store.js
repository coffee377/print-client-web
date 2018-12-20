import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';

const middleware = [];
const composeEnhancers = composeWithDevTools({
	// Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const store = createStore(
	reducer,
	composeEnhancers(
		applyMiddleware(...middleware)
		// other store enhancers if any
	)
);
// const store = createStore(reducer);
export default store;
