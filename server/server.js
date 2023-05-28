import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";
import connectDB from "./database/connect.js";
import authRouter from "./routes/authRoutes.js";
import chatGPTRouter from "./routes/chatGPTRoutes.js";

const app = express();

dotenv.config();

// middleware
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chatGPT", chatGPTRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 4040;

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(port, () => console.log(`Server is running on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
