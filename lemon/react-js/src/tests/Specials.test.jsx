import { render, screen } from '@testing-library/react';

import Specials from '../components/Specials';

const specialsResponse = [
    {
        "id" : 1,
        "pic" : "../assets/img/specials/special_1.jpg",
        "dish" : "Nachos",
        "oldPrice": "$12",
        "newPrice": "$10",
        "desc" : "Cheese, onions, tomotoes."
    },
    {
        "id" : 2,
        "pic" : "../assets/img/specials/special_2.jpg",
        "dish" : "Tacos",
        "oldPrice": "$12",
        "newPrice": "$10",
        "desc" : "Chicken or beef with your choice of side."
    },
    {
        "id" : 3,
        "pic" : "../assets/img/specials/special_3.jpg",
        "dish" : "Vodka 1oz",
        "oldPrice": "$6",
        "newPrice": "$5",
        "desc" : "Vodka and choice of juice or soda."
    },
    {
        "id" : 4,
        "pic" : "../assets/img/specials/special_4.jpg",
        "dish" : "Rum 1oz",
        "oldPrice": "$6",
        "newPrice": "$5",
        "desc" : "Rum and choice of juice or soda."
    }
]

async function mockFetch(url) {
    if (url.startsWith(import.meta.env.VITE_DB)) {
        return {
            ok: true,
            status: 200,
            json: async () => specialsResponse,
        };
    }

    throw new Error(`Unhandled request: ${url}`);
}

beforeEach(() => {
    vi.spyOn(window, 'fetch').mockImplementation(mockFetch);
})

afterEach(() => {
    vi.restoreAllMocks();
});

test('Specials page', async() => {
    render(<Specials />);

    expect(await screen.findByText('Nachos')).toBeInTheDocument();
    expect(await screen.findByText('Tacos')).toBeInTheDocument();
    expect(await screen.findByText('Vodka 1oz')).toBeInTheDocument();
    expect(await screen.findByText('Rum 1oz')).toBeInTheDocument();
});
