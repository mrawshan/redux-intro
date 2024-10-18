import { combineReducers, createStore } from 'redux'; // Importing createStore method from redux

// Initial state object (Account)
const initialStateAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: '',
};

// Initial state object (Customer)
const initialStateCustomer = {
	fullName: '',
	nationalId: '',
	createdAt: '',
};

// Reducer function (Account)
function accountReducer(crrState = initialStateAccount, action) {
	switch (action.type) {
		case 'account/deposit':
			return {
				...crrState,
				balance: crrState.balance + action.payload,
			};

		case 'account/withdraw':
			return {
				...crrState,
				balance: crrState.balance - action.payload,
			};

		case 'account/requestLoan':
			if (crrState.loan > 0) return;
			return {
				...crrState,
				//LATER
				loan: action.payload.amount,
				loanPurpose: action.payload.purpose,
				balance: crrState.balance + action.payload.amount,
			};

		case 'account/payLoan':
			return {
				...crrState,
				loan: 0,
				loanPurpose: '',
				balance: crrState.balance - crrState.loan,
			};

		default:
			return crrState;
	}
}

// Combine all the reducer that we have
const rootReducer = combineReducers({
	account: accountReducer,
	customer: customerReducer,
});

// Creating the store
const store = createStore(rootReducer);

// store.dispatch({ type: 'account/deposit', payload: 500 });
// store.dispatch({ type: 'account/withdraw', payload: 200 });
// console.log(store.getState());

// store.dispatch({
// 	type: 'account/requestLoan',
// 	payload: { amount: 1000, purpose: 'Buy a car' },
// });
// console.log(store.getState());
// store.dispatch({ type: 'account/payLoan' });
// console.log(store.getState());

// Action creater functions for Account
function deposit(amount) {
	return { type: 'account/deposit', payload: amount };
}

function withdraw(amount) {
	return { type: 'account/withdraw', payload: amount };
}

function requestLoan(amount, purpose) {
	return {
		type: 'account/requestLoan',
		payload: { amount, purpose },
	};
}

function payLoan() {
	return {
		type: 'account/payLoan',
	};
}

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(1000, 'Buy a cheap car'));
store.dispatch(payLoan());
console.log(store.getState());

// Reducer function (customer)
function customerReducer(crrState = initialStateCustomer, action) {
	switch (action.type) {
		case 'customer/createCustomer':
			return {
				...crrState,
				fullName: action.payload.fullName,
				nationalId: action.payload.nationalId,
				createdAt: action.payload.createdAt,
			};

		case 'account/UpdateName':
			return {
				...crrState,
				fullName: action.payload.fullName,
			};

		default:
			return crrState;
	}
}

// Action creater functions for customer
function createCustomer(fullName, nationalId) {
	return {
		type: 'customer/createCustomer',
		payload: { fullName, nationalId, createdAt: new Date().toISOString() },
	};
}

function updateName(fullName) {
	return {
		type: 'account/UpdateName',
		payload: fullName,
	};
}

// Creating the customer
store.dispatch(createCustomer('Muhammadu Rawshan', '2345678'));
console.log(store.getState());
