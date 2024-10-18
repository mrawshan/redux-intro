import { connect } from 'react-redux'; // Connect API

function formatCurrency(value) {
	return new Intl.NumberFormat('en', {
		style: 'currency',
		currency: 'USD',
	}).format(value);
}

function BalanceDisplay({ balance }) {
	return <div className='balance'>{formatCurrency(balance)}</div>;
}

// Old way of connecting components to redux using Connect API
function mapStateToProps(state) {
	return {
		balance: state.account.balance,
	};
}

export default connect(mapStateToProps)(BalanceDisplay);
