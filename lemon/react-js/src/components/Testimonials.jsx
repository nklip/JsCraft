// Testimonials (testimonials, including star ratings, customer images and customer details)
import React, {useState, useEffect} from "react";

import Testimonial from "./Testimonial";

function Testimonials() {

    const [testimonials, setTestimonials] = useState([]);

    const fetchData = () => {
        fetch(import.meta.env.VITE_DB + "/testimonials")
          .then((response) => response.json())
          .then((data) => setTestimonials(data))
          .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ul>
        {
            testimonials.map((testimonial) => (
                <Testimonial
                    key={testimonial.id}
                    pic={testimonial.pic}
                    name={testimonial.name}
                    text={testimonial.text}/>
            ))
        }
        </ul>
    );
}

export default Testimonials;