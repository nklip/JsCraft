import { render, screen } from '@testing-library/react';

import Menu from '../components/Menu';

const foodResponse = [
  {
    "id": 1,
    "dish" : "Nachos",
    "price": "$12",
    "desc" : "Cheese, onions, tomotoes."
  },
  {
    "id": 2,
    "dish" : "Tacos",
    "price": "$12",
    "desc" : "Chicken or beef with your choice of side."
  }
]

const drinksResponse = [
  {
    "id": 1,
    "dish" : "Vodka 1oz",
    "price": "$6",
    "desc" : "Vodka and choice of juice or soda"
  },
  {
    "id": 2,
    "dish" : "Rum 1oz",
    "price": "$6",
    "desc" : "Rum and choice of juice or soda"
  }
]

const desertsResponse = [
  {
    "id": 1,
    "dish" : "Chocolate cake",
    "price": "$7",
    "desc" : "Loaded Chocolate cake with fudge topping"
  },
  {
    "id": 2,
    "dish" : "NY cheesecake",
    "price": "$12",
    "desc" : "NY cheesecake toped with strawberry topping"
  }
]

async function mockFetch(url) {
  if (url.startsWith(import.meta.env.VITE_DB + "/food")) {
    return {
      ok: true,
      status: 200,
      json: async () => foodResponse,
    };
  } else if (url.startsWith(import.meta.env.VITE_DB + "/drinks")) {
    return {
      ok: true,
      status: 200,
      json: async () => drinksResponse,
    };
  } else if (url.startsWith(import.meta.env.VITE_DB + "/deserts")) {
    return {
      ok: true,
      status: 200,
      json: async () => desertsResponse,
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

test('Menu page', async () => {
  render(<Menu />);

  expect(await screen.findByText('Nachos')).toBeInTheDocument();
  expect(await screen.findByText('Tacos')).toBeInTheDocument();

  expect(await screen.findByText('Vodka 1oz')).toBeInTheDocument();
  expect(await screen.findByText('Rum 1oz')).toBeInTheDocument();

  expect(await screen.findByText('Chocolate cake')).toBeInTheDocument();
  expect(await screen.findByText('NY cheesecake')).toBeInTheDocument();

});
