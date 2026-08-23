// Testimonial renders a single testimonial.
import '../assets/css/Testimonial.css';

const Testimonial = ({ pic, name, text}) => {
    return (
        <li className="testimonial">
            <img className="testimonial-pic" src={pic} alt={"Testimonial from " + name}/>
            <span className="testimonial-name">{name}</span>
            <span className="testimonial-description">{text}</span>
        </li>
    );
}

export default Testimonial;