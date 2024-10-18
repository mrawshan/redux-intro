import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // To connect the redux app with react

// Style
import './index.css';

// Components
import App from './App';

//Redux store
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
