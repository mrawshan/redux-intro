// Initial state object
const initialStateCustomer = {
	fullName: '',
	nationalId: '',
	createdAt: '',
};

// Reducer function
export default function customerReducer(
	crrState = initialStateCustomer,
	action
) {
	switch (action.type) {
		case 'customer/createCustomer':
			return {
				...crrState,
				fullName: action.payload.fullName,
				nationalId: action.payload.nationalId,
				createdAt: action.payload.createdAt,
			};

		case 'customer/UpdateName':
			return {
				...crrState,
				fullName: action.payload.fullName,
			};

		default:
			return crrState;
	}
}

// Action creater functions
export function createCustomer(fullName, nationalId) {
	return {
		type: 'customer/createCustomer',
		payload: { fullName, nationalId, createdAt: new Date().toISOString() },
	};
}

export function updateName(fullName) {
	return {
		type: 'customer/UpdateName',
		payload: fullName,
	};
}
