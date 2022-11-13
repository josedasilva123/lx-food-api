import Category from "../../models/Category";
import { iCategoryCreateBody } from "../../routes/Category/@types";

export class CategoryCreate {
   async execute(body: iCategoryCreateBody) {
      const { slug, name } = body;

      const filteredSlug = slug.toLowerCase().replace(' ', '');

      const existingCategory = await Category.findOne({ slug: filteredSlug });

      if(existingCategory){
        throw new Error("Já existe uma categoria com o respectivo slug.");        
      }

      const category = await Category.create({ slug, name });

      return { category, message: "Categoria criada com sucesso." }
   }
}
