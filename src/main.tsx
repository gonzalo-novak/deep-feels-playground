import React from 'react';
import ReactDOM from 'react-dom/client'
import { DeepFeelsApp } from './DeepFeelsApp';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<DeepFeelsApp/>
		</BrowserRouter>
	</React.StrictMode>
)
