// Special renders a single special.
import '../assets/css/Special.css';

const Special = ({ pic, dish, oldPrice, newPrice, desc }) => {
    return (
        <li className="special">
            <img className="special-pic" src={pic} alt={dish}/>
            <span className="special-dish">{dish}</span>
            <span className="special-price-old">{oldPrice}</span>
            <span className="special-price-new">{newPrice}</span>
            <span className="special-description">{desc}</span>
        </li>
    );
}

export default Special;