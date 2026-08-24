// Specials (the component that loops over the specials that come from a data source)
import React, {useState, useEffect} from "react";

import Special from "./Special";

function Specials() {

    const [specials, setSpecials] = useState([]);

    const fetchData = () => {
        fetch(import.meta.env.VITE_DB + "/specials")
          .then((response) => response.json())
          .then((data) => setSpecials(data))
          .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ul>
            {
                specials.map((special) => (
                    <Special
                        key={special.id}
                        pic={special.pic}
                        dish={special.dish}
                        oldPrice={special.oldPrice}
                        newPrice={special.newPrice}
                        desc={special.desc}/>
                ))
            }
        </ul>
    );
}

export default Specials;