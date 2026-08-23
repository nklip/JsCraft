// Nav (the component provides navigational links, should be in synch with Main component)
import '../assets/css/Nav.css';

function Nav() {
    return (
        <nav>
            <ul>
                <li><a className="nav-btn" href="/">Main</a></li>
                <li><a className="nav-btn" href="/menu" >Menu</a></li>
                <li><a className="nav-btn" href="/specials">Specials</a></li>
                <li><a className="nav-btn" href="/testimonials">Testimonials</a></li>
                <li><a className="nav-btn" href="/booking">Booking</a></li>
                <li><a className="nav-btn" href="/about">About</a></li>
                <li><a className="nav-btn" href="mailto:example@example.com">Email</a></li>
            </ul>
        </nav>
    );
}

export default Nav;