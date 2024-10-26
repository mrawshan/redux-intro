import React from 'react';
import ReactDOM from 'react-dom/client';

// Style
import './index.css';

// Components
import App from './App';

// 03) Connecting redux and react app
import { Provider } from 'react-redux'; // To connect the redux app with react
import store from './store'; //Redux store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
