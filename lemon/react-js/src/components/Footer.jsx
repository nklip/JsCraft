// Footer display a small logo and a copyright text
import logo from '../assets/img/asset_18@4x.png';
import '../assets/css/Footer.css';

function Footer() {
    return (
        <footer>
            <div>
                <ul>
                    <li><img src={logo} alt="logo"/></li>
                    <li>Copyright Little Lemon</li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;