import { configureStore } from '@reduxjs/toolkit'; // Modern Redux toolkit (RTK)

// Slice files (Which has reducer and action creater functions)
import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

// 02) Creating the store
const store = configureStore({
	reducer: {
		account: accountReducer,
		customer: customerReducer,
	},
});

export default store;
