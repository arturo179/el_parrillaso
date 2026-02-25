import React from "react";
import Asada_fries from "./images/Asada_fries.JPG"
import quese from "./images/quese_birria.JPG"
import menudo from "./images/menudo.JPG"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function Home(){
    return (<div className="home">
    <section className="hero">
        <h1> Authentic Mexican Flavor</h1>
            <h1>Fresh. Grilled. Delicious</h1>
        <button> Leave a Review</button>
    </section>

    <section className="featured">
        <h2> Popular Dishes </h2>

        <div className="dish-grid">
            <Carousel 
            autoPlay
            infiniteLoop
            showArrows={true}
            showThumbs={false}
            showStatus={false}
            
            >
            <div classname ="dish-card">
                <img src= {Asada_fries} />
                <h3> Asada Fries</h3>
            </div>

            <div classname ="dish-card">
                <img src={menudo} />
                <h3> Menudo</h3>
            </div>
            <div classname ="dish-card">
                <img src={quese} />
                <h3> Quese_birria</h3>
            </div>
            </Carousel>
            
        </div>
        
        

    </section>
    <section className ="footer"> 
            <h1>Super duper </h1>

        </section>
    </div>
);
}
export default Home;