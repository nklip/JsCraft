// Menu (contains food, beverages and deserts)
import React, {useState, useEffect} from "react";

import '../assets/css/Menu.css';

import MenuItem from "./MenuItem";

import food1 from '../assets/img/menu/food_1.jpg';
import food2 from '../assets/img/menu/food_2.jpg';
import drink1 from '../assets/img/menu/drink_1.jpg';
import drink2 from '../assets/img/menu/drink_2.jpg';
import desert1 from '../assets/img/menu/desert_1.jpg';
import desert2 from '../assets/img/menu/desert_2.jpg';

function Menu() {

    const [food, setFood] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [deserts, setDeserts] = useState([]);

    const fetchFoodData = () => {
        fetch(import.meta.env.VITE_DB + "/food")
          .then((response) => response.json())
          .then((data) => setFood(data))
          .catch((error) => console.log(error));
    };

    const fetchDrinksData = () => {
        fetch(import.meta.env.VITE_DB + "/drinks")
          .then((response) => response.json())
          .then((data) => setDrinks(data))
          .catch((error) => console.log(error));
    };

    const fetchDesertsData = () => {
        fetch(import.meta.env.VITE_DB + "/deserts")
          .then((response) => response.json())
          .then((data) => setDeserts(data))
          .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchFoodData();
    }, []);

    useEffect(() => {
        fetchDrinksData();
    }, []);

    useEffect(() => {
        fetchDesertsData();
    }, []);

    return (
        <div id="menu" >
            <div className="menu">
                <div className="intro-menu">
                    <img src={food1} alt="tasty food"/>
                    <img src={food2} alt="tasty food"/>
                </div>
                <section className="home-menu">
                    <h2>FOOD MENU</h2>
                    <h3>Entrees, mains, and handhelds</h3>
                    <ul>
                    {
                        food.map((item) => (
                            <MenuItem key={item.id} dish={item.dish} price={item.price} desc={item.desc}/>
                        ))
                    }
                    </ul>
                </section>
            </div>
            <div className="menu">
                <div className="intro-menu">
                    <img src={drink1} alt="cold drink"/>
                    <img src={drink2} alt="cold drink"/>
                </div>
                <section className="home-menu">
                    <h2>DRINK MENU</h2>
                    <h3>Sprits, wine, and beer</h3>
                    <ul>
                        {
                            drinks.map((item) => (
                                <MenuItem key={item.id} dish={item.dish} price={item.price} desc={item.desc}/>
                            ))
                        }
                    </ul>
                </section>
            </div>
            <div className="menu">
                <div className="intro-menu">
                    <img src={desert1} alt="super sweet desert"/>
                    <img src={desert2} alt="super sweet desert"/>
                </div>
                <section className="home-menu">
                    <h2>DESERT MENU</h2>
                    <h3>Deserts and sweets</h3>
                    <ul>
                        {
                            deserts.map((item) => (
                                <MenuItem key={item.id} dish={item.dish} price={item.price} desc={item.desc}/>
                            ))
                        }
                    </ul>
                </section>
            </div>
        </div>
    );
}

export default Menu;