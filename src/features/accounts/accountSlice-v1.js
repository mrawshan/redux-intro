// Initial state object
const initialStateAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: '',
	isLoading: false,
};

// Reducer function
export default function accountReducer(crrState = initialStateAccount, action) {
	switch (action.type) {
		case 'account/deposit':
			return {
				...crrState,
				balance: crrState.balance + action.payload,
				isLoading: false,
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

		case 'account/convertingCurrency':
			return {
				...crrState,
				isLoading: true,
			};

		default:
			return crrState;
	}
}

// Action creater functions
export function deposit(amount, currency) {
	if (currency === 'USD') return { type: 'account/deposit', payload: amount };

	// Asynchronous action, befor dispacthing anything to the store (Basically Middlewhere, (using thunk))
	return async function (dispatch, getState) {
		// Loading indication
		dispatch({ type: 'account/convertingCurrency' });

		// API call (Money convertion)
		const res = await fetch(
			`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
		);
		const data = await res.json();
		const converted = data.rates.USD;

		// Dispatch action
		dispatch({ type: 'account/deposit', payload: converted });
	};
}

export function withdraw(amount) {
	return { type: 'account/withdraw', payload: amount };
}

export function requestLoan(amount, purpose) {
	return {
		type: 'account/requestLoan',
		payload: { amount, purpose },
	};
}

export function payLoan() {
	return {
		type: 'account/payLoan',
	};
}
