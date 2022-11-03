import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function Authenticate(req: Request, res: Response, next: NextFunction) {
  const { auth } = req.headers;

  if (auth) {
    jwt.verify(
      auth as string,
      process.env.JWT_SECRETKEY as string,
      (err, decoded: any) => {
        try {
          if (err) {
            throw new Error("Sua token expirou ou é inválida.");
          }
          
          req.body.id = decoded?.id,

          next();
        } catch (error) {
          res.status(400).json({ error: "Sua token expirou ou é inválida!" });
        }
      }
    );
  } else {
    res.status(400).json({ error: "Está rota precisa de autorização." });
  }
}
