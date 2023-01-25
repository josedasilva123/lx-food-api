import { ObjectId } from "mongodb";
import Recipe from "../../models/Recipes";
export class ReviewDelete {
   async execute(body: any, params: any) {
      const { id } = body;
      const { recipeId, reviewId } = params;

      const recipeObjectId = new ObjectId(recipeId);

      const recipe = await Recipe.findOne({ _id: recipeObjectId });

      if (!recipe) {
         throw new Error("A receita que você referenciou não existe.");
      }

      const reviewList = recipe?.reviews ? recipe?.reviews : [];

      const review = reviewList.find(review => review._id === reviewId);

      if(!review){
        throw new Error("A revisão que você está tentando excluir não existe.")
      }

      if(review.userId !== id){
        throw new Error("Somente o autor da revisão pode exclui-la.")
      }

      const newReviewsList = reviewList.filter(review => review._id !== reviewId);

      await Recipe.updateOne(
         { _id: recipeObjectId },
         {
            $set: {
               reviews: newReviewsList,
            },
         }
      );

      return { message: "Revisão removida com sucesso!" };
   }
}
