import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Login } from '../../../src/auth/pages';

describe('Component <Login/>', () => { 

	test('should render correctly', () => { 

		render(
			<MemoryRouter>
				<Login/>
			</MemoryRouter>
		)

		expect(screen.getByText('Login')).toBeTruthy();
	});

})
