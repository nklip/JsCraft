import {Routes, Route } from "react-router-dom";

import Home from "./Home";
import Menu from "./Menu";
import Specials from "./Specials";
import Testimonials from "./Testimonials";
import Booking from "./Booking";
import About from "./About";

function Main() {
    return (

        <Routes>
            <Route path="/" element={<Home/>}>Home</Route>
            <Route path="/menu" element={<Menu/>}>Menu</Route>
            <Route path="/specials" element={<Specials/>}>Specials</Route>
            <Route path="/testimonials" element={<Testimonials/>}>Testimonials</Route>
            <Route path="/booking" element={<Booking/>}>Booking</Route>
            <Route path="/about" element={<About/>}>About</Route>
        </Routes>

    );
}

export default Main;