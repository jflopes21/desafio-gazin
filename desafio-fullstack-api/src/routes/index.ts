import { Router } from "express";
import { levelsRouter } from "./levels.routes";
import { developersRouter } from "./developers.routes";

const routes = Router();
routes.use("/api/niveis", levelsRouter);
routes.use("/api/desenvolvedores", developersRouter);

export { routes };
