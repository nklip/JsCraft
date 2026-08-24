// MenuItem renders a dish from Menu.
import '../assets/css/MenuItem.css';

const MenuItem = ({dish, price, desc}) => {
    return (
        <li>
            <span className="dish">{dish}</span>
            <span className="price">{price}</span>
            <span className="description">{desc}</span>
        </li>
    );
}

export default MenuItem;