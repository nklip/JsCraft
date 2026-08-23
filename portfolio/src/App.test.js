import { render, screen } from '@testing-library/react';
import App from './App';

// The generated CRA test looked for "learn react", text this app never had, so
// it had failed since the initial commit. These assert on what App actually
// renders instead. The section titles are matched by role, because the nav
// links repeat the same words and a plain text match finds both.

test('renders the landing introduction', () => {
  render(<App />);
  expect(screen.getByText(/Hello, I am Nick Milano!/i)).toBeInTheDocument();
});

test('renders the projects section', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Featured Projects/i })).toBeInTheDocument();
});

test('renders the contact section', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Contact me/i })).toBeInTheDocument();
});
