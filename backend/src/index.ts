import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv"

import productRoute from "./routes/ProductType.route"
import serviceTierRoute from "./routes/serviceTier.routes"
import includesRoute from "./routes/includes.routes"
import comparativeRoute from "./routes/comparative.routes"
import importantRoute from "./routes/important.routes"
import transferRoute from "./routes/transfer.routes"
import serviceRoute from "./routes/service.routes";
import cartRoute from "./routes/cart.routes"

dotenv.config();

import database from "./config/database";

const app: Application = express();

app.use(express.json());

app.use(express.json());

app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON format in request body",
    });
  }
  next();
});

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("api is running");
});

app.use("/product",productRoute);
app.use("/servicetier",serviceTierRoute);
app.use("/includes",includesRoute);
app.use("/comparative",comparativeRoute);
app.use("/important",importantRoute);
app.use("/transfer",transferRoute);
app.use("/service", serviceRoute);
app.use("/cart",cartRoute);

app.use((req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const startServer = async () => {
  try {
    await database();

    const port = Number(process.env.PORT) || 5000;

    app.listen(port, () => {
      console.log(`Server Listening @ http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
