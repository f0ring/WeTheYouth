import { Outlet, Link } from "react-router-dom";

const Contact = () => {
    const id = "sjhdgsh"; // Example ID, replace with actual logic if needed
    return ( 
        <div>
            <h1>
                This is Contact
            </h1>
            <Link to={`/contact/about/${id}`}>Go to about</Link>

            <Outlet/>
        </div>
     );
}
 
export default Contact;