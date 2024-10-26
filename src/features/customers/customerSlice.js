import { createSlice } from '@reduxjs/toolkit';

// Initial state object
const initialState = {
	fullName: '',
	nationalId: '',
	createdAt: '',
};

// Modern way of writing slice using (RTK)
const customerSlice = createSlice({
	name: 'customer',
	initialState,
	reducers: {
		// These automatically created action creaters can recive only 1 argument, and that then become actione.payload (In this case we have 2 arguments, so in this situation we have to write like this: using prepare method)
		createCustomer: {
			// Prepare that data(createCustomer arguments) using prepare method
			prepare(fullName, nationalId) {
				return {
					payload: {
						fullName,
						nationalId,
						createdAt: new Date().toISOString(),
					},
				};
			},

			reducer(crrState, action) {
				crrState.fullName = action.payload.fullName;
				crrState.nationalId = action.payload.nationalId;
				crrState.createdAt = action.payload.createdAt;
			},
		},

		updateName(crrState, action) {
			crrState.fullName = action.payload;
		},
	},
});

// Creating Action creater functions
export const { createCustomer, updateName } = customerSlice.actions;

// Exporting reducer function to get access in the store
export default customerSlice.reducer;
