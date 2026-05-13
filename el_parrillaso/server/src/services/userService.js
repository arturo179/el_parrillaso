import express from "express";
import dotenv from "dotenv";

import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: '../.env.backend'});
const app = express();


const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.post("/signup", async (req, res) => {
    const { email, password } = req.body; 
    const { data, error } = await supabase.auth.users({
        email,
        password
    });
    if (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
    return res.json({ message: "User registered successfully", data });
});

