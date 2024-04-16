import express from "express";
import { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import logger from "morgan";
import { routes } from "./routes";
import { AppError } from "./utils/AppError";

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger("dev"));

app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
      });
    }

    console.error(error);

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);
export { app };
