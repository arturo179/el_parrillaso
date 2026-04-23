import express from "express"
import multer from "multer"
import requireAuth from "../middleware/requireAuth.js"
import path from "path"
import supabase from "../services/supabaseClient.js"
import {createReview,getReviews} from "../services/reviewService.js"

import fs from "fs"

const router = express.Router();

if(!fs.existsSync("uploads")){
    fs.mkdirSync("uploads");
}




const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req,file,cb) => {
        if(file.mimetype.startsWith("image/")){
        cb(null, true);
    } else{
        cb(new Error('Only images are allowed'), false);
    }
    },
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});



router.get("/",async(req,res,next)=>{
     try{
        const reviews = await getReviews();
        res.json(reviews);

     }catch (err) {
        next(err);
     }
});


router.post("/",requireAuth,upload.single("image"), async (req,res,next) => {
    try {
        let image_url = null;
        if(req.file){
        const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${req.file.originalname}`;


        const {error: uploadError} = await supabase.storage
            .from("uploads")
            .upload(filename,req.file.buffer, {
                contentType: req.file.mimetype,
            });
            if(uploadError) throw new Error(uploadError.message);

            const {data} = supabase.storage
                .from("uploads")
                .getPublicUrl(filename);
            image_url = data.publicUrl;
        }
        console.log("req.file:", req.file)       
        console.log("image_url:", image_url) 

    const review = await createReview({
        userId: req.user.id,
        comment: req.body.comment,
        rating: req.body.rating,
        image_url,
    });
            res.status(201).json({
                message: "Review created",
                review,
            });
        } catch(err) {
            console.log("MOre shit broke")
           next(err);
        }
    }
);
export default router; 