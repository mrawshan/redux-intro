import { createSlice } from '@reduxjs/toolkit';

// Initial state object
const initialState = {
	fullName: '',
	nationalId: '',
	createdAt: '',
};

// Modern way of writing slice using (RTC)
const customerSlice = createSlice({
	name: 'customer',
	initialState,
	reducers: {
		createCustomer: {
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

export default customerSlice.reducer;
