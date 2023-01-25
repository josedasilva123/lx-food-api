import { ObjectId } from "mongodb";
import Recipe from "../../models/Recipes";
export class ReviewEdit {
   async execute(body: any, params: any) {
      const { recipeId, reviewId } = params;      
      const { id, content, score } = body;

      const newReview = {
         content,
         score,
      };

      const recipeObjectId = new ObjectId(recipeId);

      const recipe = await Recipe.findOne({ _id: recipeObjectId });

      if (!recipe) {
         throw new Error("A receita que você referenciou não existe.");
      }

      const reviewList = recipe?.reviews ? recipe?.reviews : [];

      const review = reviewList.find(review => review._id === reviewId);

      if(!review){
        throw new Error("A revisão que você está tentando editar não existe.")
      }

      if(review.userId !== id){
        throw new Error("Somente o autor da revisão pode edita-la.")
      } 
      const newReviewsList = reviewList.map(review => {
        if(review._id !== reviewId){
            return { ...review, ...newReview};
        } else {
            return review;
        }
      })

      await Recipe.updateOne(
         { _id: recipeObjectId },
         {
            $set: {
               reviews: newReviewsList,
            },
         }
      );

      return { message: "Revisão atualizada com sucesso!" };
   }
}
