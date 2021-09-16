import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import '@testing-library/jest-dom';

import App from '../App';

test('app starts with login page, showing Loading at first, then users', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  await expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  setTimeout(() => {
    expect(screen.getByText(/Choose your user/i)).toBeInTheDocument();
  }, 3000);
});
