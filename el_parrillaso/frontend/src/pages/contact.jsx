import { useState } from "react";
import { useNavigate } from "react-router-dom";



function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    return (

    <div className="contact-page">
        <h2>Contact Us</h2>
        <form onSubmit={(e) => {
            e.preventDefault();
            // Handle form submission logic here
            console.log("Name:", name);
            console.log("Email:", email);
            console.log("Message:", message);
            setName("");
            setEmail("");
            setMessage("");
        }}>
            <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            />
            <button type="submit">Send Message</button>
        </form>
    </div>  
    );
} 
export default Contact;