import express from "express";
import dotenv from "dotenv";
import multer from "multer"
import cors from "cors";
import fs from "fs";
import reviewRoutes from "./routes/reviewRoutes.js"
import path from "path"

import {createClient} from "@supabase/supabase-js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())

if(!fs.existsSync("uploads")){
  fs.mkdirSync("uploads");
}

app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/reviews",reviewRoutes);


app.use((err,req,res,next) => {
  res.status(500).json({error : err.message || "Some tupe of routing is the problem"});
});
app.listen(process.env.PORT, () => 
    console.log(`Server is running on port ${process.env.PORT}`)
);