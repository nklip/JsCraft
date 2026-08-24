// Home contains Opening hours, Address, Phone, Price range and Promotion news
import '../assets/css/Home.css';

import address from '../assets/img/home/address.png';
import hours from '../assets/img/home/opening-hours.png';
import phone from '../assets/img/home/phone.webp';
import money from '../assets/img/home/money.webp';

function Home() {
    return (
        <div id="home">
            <article>
                <b>We are providing a discount of 30% on your Birthday!</b><br/>
            </article>
            <article>
                <img src={hours} alt="Working hours"/><br/>
                <b>Opening hours</b><br/><br/>
                Monday-Friday:<br/>2pm - 10pm<br/><br/>
                Saturday:<br/>2pm - 11pm<br/><br/>
                Sunday:<br/>2pm - 9pm
            </article>
            <article>
                <img src={address} alt="Address"/><br/>
                <b>Address</b><br/><br/>
                75 W North Ave<br/>
                Elmwood Park<br/>
                60707<br/>
                Chicago
            </article>
            <article>
                <img src={phone} alt="Phone"/><br/>
                <b>Phone</b><br/><br/>
                708-452-6000
            </article>
            <article>
                <img src={money} alt="Money"/><br/>
                <b>Price</b><br/><br/>
                $
            </article>
        </div>
    );
}

export default Home;