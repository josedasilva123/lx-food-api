import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import Recipe from "../../models/Recipes";
import User from "../../models/User";
import { iReviewCreateBody } from "../../routes/Review/@types";
export class ReviewCreate {
   async execute(body: iReviewCreateBody) {
      const reviewId = uuidv4();
      const { id, recipeId, content, score } = body;

      const objectUserId = new ObjectId(id);

      const user = await User.findOne({ _id: objectUserId });

      const newReview = {
         _id: reviewId,
         userId: user?._id,
         userName: user?.name,
         recipeId,
         content,
         score,
      };

      const recipeObjectId = new ObjectId(recipeId);

      const recipe = await Recipe.findOne({ _id: recipeObjectId });

      if (!recipe) {
         throw new Error("A receita que você está tentando avaliar não existe.");
      }

      const reviewList = recipe?.reviews ? recipe?.reviews : [];

      if (reviewList.some((review) => review.userId === user?.id)) {
         throw new Error("O respectivo usuário já avaliou está receita.");
      }

      const newReviewsList = [...reviewList, newReview];

      await Recipe.updateOne(
         { _id: recipeObjectId },
         {
            $set: {
               reviews: newReviewsList,
            },
         }
      );

      return { review: newReview, message: "Revisão cadastrada com sucesso!" };
   }
}
