import { render, screen } from '@testing-library/react';

import Testimonials from '../components/Testimonials';

const TestimonialsResponse = [
    {
        "id" : 1,
        "pic" : "../assets/img/testimonials/user_1.jpg",
        "name" : "Yasemin Aydan",
        "text" : "My wife and I, vacationing in SD from Chicago, had lunch Fri 17th at TFG and we were both absolutely pleased with everything at your place. Your wait staff was so pleasant and helpfull. Your menu is classic French executed authentically. Do not change a thing!! The kitchen, the staff, the menu, the wine list, the bakery (I couldn’t eat another bite so I took a raspberry tart to go) are all the finest. I will recommend to everyone The French Gourmet. Don’t change a thing! You are spot on!"
    },
    {
        "id" : 2,
        "pic" : "../assets/img/testimonials/user_2.jpg",
        "name" : "Erica Alsvik",
        "text" : "We were at The French Gourmet a few weeks ago with some clients from Texas . I am finally getting back to tell you that we had a wonderful evening! The food, the service, the host, EVERYTHING was perfect! Thank you again for making TFG such a special place to be.We hope to see you again soon. Keep up the good work !"
    },
    {
        "id" : 3,
        "pic" : "../assets/img/testimonials/user_3.jpg",
        "name" : "Florence Johnson",
        "text" : "Thank you for dinner last night. It was amazing!! I have to say it’s the best meal I have had in quite some time. You will definitely be seeing more of me eating at your establishment. My husband was very impressed and we can’t wait for our parents to come visit so that we can share our new favorite place with them."
    },
    {
        "id" : 4,
        "pic" : "../assets/img/testimonials/user_4.jpg",
        "name" : "Julie Hopkins",
        "text" : "WOW!!! What an outstanding dinner you prepared at the Johnstons on Friday evening!!! It was an honor for me to be invited and experience firsthand your incredible culinary gift! MERCI BEAUCOUP seems soooooooo inadequate! Count on me for spreading the good word about THE FRENCH GOURMET! Thank you again for offering such a gift of self to support IVC San Diego’s Della Strada."
    }
]

async function mockFetch(url) {
    if (url.startsWith(process.env.REACT_APP_DB)) {
        return {
            ok: true,
            status: 200,
            json: async () => TestimonialsResponse,
        };
    }

    throw new Error(`Unhandled request: ${url}`);
}

beforeEach(() => {
    jest.spyOn(window, 'fetch').mockImplementation(mockFetch);
})

afterEach(() => {
    jest.restoreAllMocks();
});

test('Testimonials page', async() => {
    render(<Testimonials />);

    expect(await screen.findByText('Yasemin Aydan')).toBeInTheDocument();
    expect(await screen.findByText('Erica Alsvik')).toBeInTheDocument();
    expect(await screen.findByText('Florence Johnson')).toBeInTheDocument();
    expect(await screen.findByText('Julie Hopkins')).toBeInTheDocument();

});
