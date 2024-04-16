import { Router } from "express";
import { LevelsController } from "../controllers/levelsController";

const levelsController = new LevelsController();

const levelsRouter = Router();

levelsRouter.get("/", levelsController.index);
levelsRouter.post("/", levelsController.create);
levelsRouter.put("/:id", levelsController.update);
levelsRouter.delete("/:id", levelsController.delete);

export { levelsRouter };
