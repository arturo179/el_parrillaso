import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Contact Form:", formData);

        setSubmitted(true);

        setFormData({
            name: "",
            email: "",
            message: "",
        });

        // Optional: redirect after submit
        // navigate("/");
    };

    return (
        <main className="contact-page">
            <section className="contact-hero">
                <h1>Contact Us</h1>
                <p>
                    Have a question, catering request, or feedback? Send us a message.
                </p>
            </section>

            <section className="contact-content">
                <div className="contact-info">
                    <h2>El Parrillaso</h2>
                    <p>Authentic Mexican cuisine in Salinas, CA</p>
                    <p><strong>Phone:</strong> (831) 000-0000</p>
                    <p><strong>Email:</strong> contact@elparrillaso.com</p>
                    <p><strong>Location:</strong> Salinas, CA</p>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    {submitted && (
                        <p className="success-message">
                            Thank you! Your message has been received.
                        </p>
                    )}

                    <label>
                        Name
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Message
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <button type="submit">Send Message</button>
                </form>
            </section>
        </main>
    );
}

export default Contact;