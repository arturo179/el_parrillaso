import React from "react";
const About = () => {
    return (<div className="about">

        <section className="top-section">

            <div>
                <h1>
                    What makes us Good, is the Authentic real mexican cuisine found from Michcan.
                </h1>
            </div>
        </section>

        <section className="footer-section">
            <footer className="footer">
                <div className="footer-inner">
                    <div className="footer-brand">
                        <h3>El Parrillaso</h3>
                        <p>Authentic Mexican cuisine in Salinas, CA</p>
                    </div>
                    <div className="footer-links">
                        <a href="/menu">Menu</a>
                        <a href="/reviews">Reviews</a>
                        <a href="/about">About</a>
                    </div>
                    <p className="footer-copy">© 2026 El Parrillaso All rights reserved.</p>
                </div>
            </footer>
        </section>
    </div>
    );


};
export default About;