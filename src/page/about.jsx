import { useParams } from "react-router-dom";

const About = () => {
    const { id } = useParams(); // Example of using useParams if needed
    return ( <div>
        <h1>About Us</h1>
        <h2> {id} </h2>
    </div> );
}
 
export default About;