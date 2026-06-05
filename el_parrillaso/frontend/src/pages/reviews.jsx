import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient"

import { Navigate, NavLink, useNavigate } from "react-router-dom";


function handle_reciew() {
    Navigate("/reviews");


}


function Reviews() {
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [formError, setFormError] = useState("");


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const res = await fetch(`${API_URL}/reviews`);
                const data = await res.json();
                setReviews(data);

            } catch (err) {
                console.error("load error:", err.message);
            }
        };
        fetchReviews();

    }, []);




    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");
        const { data: { session } } = await supabase.auth.getSession();




        if (!reviewText.trim() && rating === 0) {
            setFormError("Please add a rating and write a reivew before Submitting")
            return;
        }
        if (rating == 0) {
            setFormError("Please have all fienlds filled")
            return;
        }
        if (!reviewText.trim()) {
            setFormError("Please write something before Submitting");
            return;
        }


        const API_URL = import.meta.env.VITE_API_URL;

        try {

            if (!session) {
                setFormError("You must log in or create an account to submit a review.");
                return;
            }

            let uploadedUrl = null;
            if (image) {
                uploadedUrl = await uploadImage();
            }

            const formData = new FormData();
            formData.append("comment", reviewText);
            formData.append("rating", rating);
            if (image) {
                formData.append("image", image);
                console.log(formData.get("image"));
            }

            else {
                console.log("no image");
            }

            if (uploadedUrl) formData.append("image_url", uploadedUrl);
            const res = await fetch(`${API_URL}/reviews`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${session.access_token}`,
                },
                body: formData,
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to submit review");
            }

            setReviews((prev) => [data.review, ...prev]);
            setReviewText("");
            setRating(0);
            setImage(null);
            setPreview(null);
        } catch (err) {
            console.error("submit error:", err.message)
        }

    };
    const HandleImageChange = (e) => {
        const file = e.target.files[0];
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
            setFormError("Only JPG and PNG images are allowed.");
            return;
        }
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file))
        }


    };

    const uploadImage = async () => {
        const fileName = `${Date.now()}-${image.name}`;
        try {
            const { data: imageData, error: uploadError } = await supabase.storage
                .from("uploads")
                .upload(fileName, image);

            if (uploadError) {
                console.log("Supabase error", uploadError);
                return null;
            }

            if (imageData) {
                const { data: publicUrlData } = supabase.storage
                    .from("uploads")
                    .getPublicUrl(fileName);
                if (publicUrlData?.publicUrl) {
                    setImageUrl(publicUrlData.publicUrl);
                    return publicUrlData.publicUrl;
                }
            }
        } catch (error) {
            console.log("caught an error", error);
        }
        return null;
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
            <div className="write">
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
                    {formError && <p className="form-error">{formError}</p>}

                    <button type="submit">Submit Review</button>
                </span>
            </div>

        </form>

        <div className="review-list">
            {reviews.map((r, index) => {
                console.log("review data:", r.image_url);
                return (
                    <div key={r.id} className="review-card">

                        <div className="review-header">
                            <div className="review-rating">
                                {"⭐".repeat(r.rating)}
                            </div>
                            <span className="review-date">Today</span>
                        </div>

                        <p className="review-text">{r.comment}</p>

                        {(r.image_url || r.image_URL) && (
                            <img
                                src={r.image_url || r.image_URL}
                                alt="Review"
                                className="review-image"
                            />


                        )}


                    </div>

                )
            })}
        </div>



    </div>
    );
}
export default Reviews;