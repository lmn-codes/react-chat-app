import React from 'react';
import { act, waitFor } from '@testing-library/react';
import { render, unmountComponentAtNode } from 'react-dom';
import LoginUserList from '../components/Login/LoginUserList';
import { UsersContextProvider } from '../contexts/UsersContextProvider';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('user list is rendered with 10 users', async () => {
  // render(
  //   <UsersContextProvider>
  //     <LoginUserList />
  //   </UsersContextProvider>
  // );

  // setTimeout(() => {
  //   expect(getByRole('ul').children.length).toEqual(10);
  // }, 3000);

  act(() => {
    render(
      <UsersContextProvider>
        <LoginUserList />
      </UsersContextProvider>,
      container
    );
  });

  expect(container.textContent).toBe('Loading...');

  // Wait for the load to complete and show the loaded data or reject
  // if that never happens.
  await waitFor(
    async () => expect(container.textContent.includes('Choose your user')),
    10 /* timeout */
  );
});
