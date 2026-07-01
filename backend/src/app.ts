import express from "express";
import cors from "cors";
import morgan from "morgan";

import routes from "./routes";
import { NotFoundError } from "./errors/NotFoundError";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/api", routes);

app.use((req, res, next) => next(new NotFoundError()));
app.use(errorHandler);

export default app;