import React from 'react';
import { act, waitFor } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  RoomContextProvider,
  RoomContextConsumer,
} from '../contexts/RoomContextProvider';

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

test('RoomContextConsumer shows default value', () => {
  render(
    <RoomContextProvider>
      <RoomContextConsumer />
    </RoomContextProvider>
  );
  expect(screen.getByText(/^Error:/)).toHaveTextContent('Error:');
});
