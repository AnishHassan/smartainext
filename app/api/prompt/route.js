import { connectToDb } from "@utils/Database";
import Prompt from "@models/prompt";


export const GET = async (request) => {
try {
    await connectToDb();
    
    const prompts = await Prompt.find({}).populate('creator');

    return new Response(JSON.stringify(prompts), {
        status : 200 
    });

} catch (error) {
    return new Response('Failed to fetch the prompts',{status:500})
}
}