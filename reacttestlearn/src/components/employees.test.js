import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument" matcher
import Employees from './Employees';

describe('Employees Component', () => {
  beforeEach(() => {
    // Mock the global fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }]),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('fetches and displays employee data', async () => {
    render(<Employees />);

    // Check if the heading is rendered
    expect(screen.getByText('Employee Table')).toBeInTheDocument();

    // Wait for the employee data to be displayed
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });

    // Check if table headers are rendered
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();

    // Check if table data is rendered
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('handles fetch error', async () => {
    console.error = jest.fn(); // Mock console.error

    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to fetch'))
    );

    render(<Employees />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('fetching data', expect.any(Error));
    });
  });
});
