import supabase from "../services/supabaseClient.js"

export default async function requireAuth(req,res,next){
    try {
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.satus(401).json({error: 'Missing token'});
        }
        const token = authHeader.split(' ')[1];
        const {data, error} = await supabase.auth.getUser(token);

        if(error || !data.user){
            return res.status(401).json({ error:'Invalid or expired token'
            });
        }
        req.user = data.user;
        next();

    }catch(err){
        next(err);
    }
}
