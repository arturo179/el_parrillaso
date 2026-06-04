import React from "react";
import Asada_fries from "./images/Asada_fries.JPG"
import quese from "./images/quese_birria.JPG"
import menudo from "./images/menudo.JPG"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Navigate, useNavigate } from "react-router-dom";


const dishes = [
  {
    img: Asada_fries,
    name: "Asada Fries",
    description: "Crispy fries topped with grilled carne asada, guac & crema",
    rating: 4.9,
    reviews: 64,
  },
  {
    img: menudo,
    name: "Menudo",
    description: "Traditional slow-cooked tripe soup with hominy & red chile",
    rating: 4.7,
    reviews: 38,
  },
  {
    img: quese,
    name: "Quesa Birria",
    description: "Crispy quesatacos filled with braised birria & melted cheese",
    rating: 4.9,
    reviews: 91,
  },
];

function StarRating({ rating}) {
    return (
        <span className="stars">
            {"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))}
            <span className="rating-number"> {rating} </span>
        </span>
    );
}



function Home(){
  const navigate = useNavigate();
    return (<div className="home">
    <section className="hero">
        <div className="hero-content">
          <h1>Authentic Mexican Flavor</h1>
          <p className="hero-sub">Fresh. Grilled. Delicious.</p>
          <div className="hero-actions">
            <a href="/menu"><button className="btn-primary">View Menu</button></a>
            <a href="/reviews"><button className="btn-secondary">Leave a Review</button></a>
          </div>
        </div>
      </section>

    {/* Featured Dishes Carousel */}
      <section className="featured">
        <h2>Popular Dishes</h2>
        <p className="section-sub">What our customers can't stop ordering</p>

        <Carousel
          autoPlay
          infiniteLoop
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          interval={3500}
          transitionTime={500}
        >
          {dishes.map((dish) => (
            <div className="dish-card" key={dish.name}>
              <img src={dish.img} alt={dish.name} />
              <div className="dish-info">
                <h3>{dish.name}</h3>
                <p className="dish-desc">{dish.description}</p>
                <div className="dish-meta">
                  <StarRating rating={dish.rating} />
                  <span className="review-count">({dish.reviews} reviews)</span>
                </div>
                <button onClick={() => navigate("/reviews")}>
                  See reviews →
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Review CTA */}
      <section className="review-cta">
        <h2>Tried something you loved?</h2>
        <p>Help other guests discover their next favorite dish.</p>
        <button className="btn-primary" onClick={() => navigate("/reviews")}>Write a Review</button>
      </section>

      {/* Footer */}
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
    </div>
  );
}

export default Home;