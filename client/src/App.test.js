import { render, screen } from '@testing-library/react';
import App from './App';

test('renders create post interface', () => {
  render(<App />);
  // Example: Check for a specific part of your CreatePost component.
  // Adjust this to match something specific in your CreatePost or App component.
  const headerElement = screen.getByText(/create post/i);
  expect(headerElement).toBeInTheDocument();
});
