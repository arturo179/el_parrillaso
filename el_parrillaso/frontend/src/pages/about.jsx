import React from "react";
const About = () => {
    return (<div className="about">
        <container className="about-info"> 
        <section className="top-section">

            <div>
                <h1>
                    What makes us Good, is the Authentic real mexican cuisine found from Michocan.
                </h1>
            </div>
        </section>

        <section className="middle-section"> 
            <div> <h1>We are a family ran buisness that seeks to bring the culture we lived through for everyone to enjoy.</h1></div>
        </section>

        <section className="right-section"> 
            <div> <h1>Together we hope to bring a small taste of the life we have lived from one Mexico to the United States</h1></div>
        </section>
        </container>

        

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