import supabase  from "./supabaseClient.js"

export async function createReview({userId,comment,rating,image_url}){
    const {data, error} = await supabase
    .from("reviews")
    .insert([
        {
            user_id: userId,
            rating: Number(rating),
            comment,
            image_url,
        }
    ])
    .select()
    .single();

    if(error){
        throw error;
    }
    return data;
}
export async function getReviews(){
    const {data, error} = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", {ascending: false});

if (error){
    throw error;

}
return data;
}