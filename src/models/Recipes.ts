import { Schema, model, ObjectId } from "mongoose";

interface iReview{
    userID: string;
    userName: string;
    content: string;
    score: number;
}

export interface iRecipe{
   _id?: ObjectId;
   title: string;
   content: string;
   thumbnail_url: string;
   reviews?: iReview[];
   categories?: string[];
}

const recipeSchema = new Schema<iRecipe>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    thumbnail_url: { type: String, required: true },
    reviews: { type: Array<iReview>, required: true },
    categories: { type: Array<String>, required: true }
}, {
    timestamps: true,
})


const User = model<iRecipe>("Recipe", recipeSchema, "recipes");

export default User;