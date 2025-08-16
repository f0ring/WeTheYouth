import { useEffect, useState } from "react";
import Footer from "../components/footer";

const Home = () => {
    const [uni, setUni] = useState('AUST');
    const [city, setCity] = useState('Dhaka');

    const handleClick = () => {
        setUni('BUET');
        console.log('Button clicked!');

    }

    const handleCityChange = () => {
        setCity('Chittagong');
      



    }

    useEffect(() => {
        console.log("useEffect called");

    }, [city]);

    return (
        <div>
            <h1>This is Home</h1>
            <button onClick={handleClick}>
                Click me
            </button>
            <br />
            {uni}
            <br /><br />
            <button onClick={handleCityChange}>
                Change City
            </button>

            <br /><br />
            {city}

            <br /><br />
            <Footer name={uni} country="bd"></Footer>
        </div>
    );
}

export default Home;