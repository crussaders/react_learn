import { render, screen } from '@testing-library/react';
import {describe, expect, test} from '@jest/globals';
import App from './App';
import Employees from './components/Employees';

jest.mock('./components/Employees', () => () => <div data-testid="employees-component">Employees Component</div>);

test('renders Employees component', () => {
  render(<App />);
  const employeesElement = screen.getByTestId('employees-component');
  expect(employeesElement).toBeInTheDocument();
});
