import express from "express";
import userRoutes from "./routes/user.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import authUser from "./routes/auth.routes.js";

import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import logger from "./utils/logger.js";


import swaggerUi from "swagger-ui-express";

import swaggerSpec from "./config/swagger.js";

const app = express();

app.use(express.json());


app.use(helmet());

app.use(cors());
//morgan
app.use(
  morgan("dev", {
    stream: {
      write: (message) => {
        logger.info(message.trim());
      }
    }
  })
);


const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: {
        status: "fail",
        message: "Too many requests, try again later",
    },
});

app.use("/api", userRoutes);

app.use("/api/auth", authLimiter, authUser);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

export default app;