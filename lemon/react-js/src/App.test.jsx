import { fireEvent, render, screen } from '@testing-library/react';

import App from './App';

test('Main page', () => {
  render(<App />);
  const hours = screen.getByText('Opening hours');
  expect(hours).toBeInTheDocument();

  const address = screen.getByText("Address");
  expect(address).toBeInTheDocument();

  const phone = screen.getByText('708-452-6000');
  expect(phone).toBeInTheDocument();

  const price = screen.getByText('Price');
  expect(price).toBeInTheDocument();

  const main = screen.getByText('Main');
  expect(main).toBeInTheDocument();

  const menu = screen.getByText('Menu');
  expect(menu).toBeInTheDocument();
});
