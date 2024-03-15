import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login and registration prompts if not logged in', () => {
  render(<App />);
  // Assuming "Please log in" is unique to the unauthenticated state
  const loginPrompt = screen.getByText(/please log in to view posts and create new ones./i);
  expect(loginPrompt).toBeInTheDocument();
});
