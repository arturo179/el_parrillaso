import { useState } from "react";

function Reviews() {
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const [image, setImage] = useState(null);
    const [reviews, setReviews] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReview = {
            text: reviewText,
            rating: rating,
            image: preview
        }
        setReviews((prev) => [...reviews, newReview]);
        setReviewText("");
        setRating(0);
        setImage(null);
        setPreview(null);
    };

    const [preview, setPreview] = useState(null);

    const HandleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file))
        }
    };

    return (<div className="review-page">
        <form onSubmit={handleSubmit}>

            <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        onClick={() => setRating(star)}
                        style={{
                            cursor: "pointer",
                            fontSize: "24px",
                            color: star <= rating ? "#FFD166" : "#ccc"
                        }}> ★ </span>
                ))}
            </div>
            <div classname="write">
                <span>
                    <textarea
                        placeholder="Write your review..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)} />

                    <input type="file"
                        accept="image/*"
                        onChange={HandleImageChange}
                    />
                </span>

            </div >
            <div className="submit-reviews">
                <span>
                    {preview && (

                        <img src={preview} className="preview-image" />
                    )}

                    <button type="submit">Submit Review</button>
                </span>
            </div>

        </form>

        <div className="review-list">
            {reviews.map((r, index) => (
                <div key={index} className="review-card">

                    <div className="review-header">
                        <div className="review-rating">
                            {"⭐".repeat(r.rating)}
                        </div>
                        <span className="review-date">Today</span>
                    </div>

                    <p className="review-text">{r.text}</p>

                    {r.image && (
                        <img
                            src={r.image}
                            alt="Review"
                            className="review-image"
                        />
                    )}

                </div>
            ))}
        </div>



    </div>
    );

}
export default Reviews;