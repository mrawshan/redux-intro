import { applyMiddleware, combineReducers, createStore } from 'redux'; // Importing methods from redux
import { thunk } from 'redux-thunk'; // Middlewhere
import { composeWithDevTools } from 'redux-devtools-extension'; // Redux dev tool

// Slice files (Which has reducer and action creater functions)
import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

// Combine all the reducer that we have
const rootReducer = combineReducers({
	account: accountReducer,
	customer: customerReducer,
});

// Creating the store
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
); // From this function: applyMiddleware(thunk) we are telling redux or store that we want to use Middlewhere in our application

export default store;
