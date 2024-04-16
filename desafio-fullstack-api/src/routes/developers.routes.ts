import { Router } from "express";
import { DevelopersController } from "../controllers/developersController";

const developersController = new DevelopersController();

const developersRouter = Router();

developersRouter.get("/", developersController.index);
developersRouter.post("/", developersController.create);
developersRouter.put("/:id", developersController.update);
developersRouter.patch("/:id", developersController.update);
developersRouter.delete("/:id", developersController.delete);

export { developersRouter };
