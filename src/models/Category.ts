import { Schema, model } from "mongoose";

export interface iCategory{
    slug: string;
    name: string;
}

const categorySchema = new Schema<iCategory>(
   {
      slug: { type: String, required: true },
      name: { type: String, required: true },
   },
   {
      timestamps: true,
   }
);

const Category = model<iCategory>("Category", categorySchema, "categories");

export default Category;
