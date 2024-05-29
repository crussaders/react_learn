import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import Employees from "./Employees";

// eslint-disable-next-line no-undef
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: Promise.resolve([
            { id:457896, name:'Makesh'},
            {id:457836, name:'Manish'}
        ]),
    })
);

describe("Employer table component", () => {
    beforeEach(() => {
        fetch.mockClear();
    })
});

test("fetch and display data", async () => {
    render(<Employees />);
    
    expect(screen.getByText('Employee Table')).toBeInTheDocument();

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(screen.getByText('Manish')).toBeInTheDocument();
});
test('displays error message on fetch failure', async () => {
    // Mock fetch to reject
    fetch.mockImplementationOnce(() => Promise.reject('API is down'));

    render(<DataTable />);

    // Wait for the fetch call
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Check if the error is logged to the console
    // You might want to spy on console.error to verify this
  });