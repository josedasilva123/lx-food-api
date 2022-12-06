import { Request, Response } from "express";
import { iAuthenticateBody } from "../../@types/types";
import { FavoriteCreate } from "../../services/Favorite/Create.service";
import { FavoriteDelete } from "../../services/Favorite/Delete.service";
import { iFavoriteCreateBody, iFavoriteDeleteParams } from "./@types";

export default class FavoriteControllers {
   static async Create(req: Request<{}, {}, iFavoriteCreateBody, {}>, res: Response) {
      const create = new FavoriteCreate();
      const response = await create.execute(req.body);

      res.status(200).json(response);
   }

   static async Delete(req: Request<iFavoriteDeleteParams, {}, iAuthenticateBody, {}>, res: Response) {
      const remove = new FavoriteDelete();
      const response = await remove.execute(req.params, req.body);

      res.status(200).json(response);
   }
}
