import { render, screen } from '@testing-library/react';
import App from './App';

test('renders film app', () => {
  render(<App />);
  const linkElement = screen.getByText(/film app/i);
  expect(linkElement).toBeInTheDocument();
});
