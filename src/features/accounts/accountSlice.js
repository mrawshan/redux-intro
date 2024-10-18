import { createSlice } from '@reduxjs/toolkit';

// Initial state object
const initialState = {
	balance: 0,
	loan: 0,
	loanPurpose: '',
	isLoading: false,
};

// Modern way of writing slice using (RTC)
const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		deposit(crrState, action) {
			// crrState.balance = crrState.balance + action.payload;
			crrState.balance += action.payload;
			crrState.isLoading = false;
		},
		withdraw(crrState, action) {
			// crrState.balance = crrState.balance - action.payload;
			crrState.balance -= action.payload;
		},
		// These automatically created action creaters can recive only 1 argument, and that then become actione.payload (In this case we have 2 arguments, so in this situation we have to write like this)
		requestLoan: {
			// Prepare that data(requestLoan arguments) with prepare method
			prepare(amount, purpose) {
				return { payload: { amount, purpose } };
			},

			reducer(crrState, action) {
				if (crrState.loan > 0) return;

				crrState.loan = action.payload.amount;
				crrState.loanPurpose = action.payload.purpose;
				crrState.balance += action.payload.amount;
			},
		},

		payLoan(crrState) {
			crrState.balance -= crrState.loan;
			crrState.loan = 0;
			crrState.loanPurpose = '';
		},

		convertingCurrency(crrState) {
			crrState.isLoading = true;
		},
	},
});

// Creating Action creater functions
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

// Thunk (Middleware) using action creater function
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

export default accountSlice.reducer;
