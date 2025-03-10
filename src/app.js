import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from 'cookie-parser';

import { config, connectDB } from './config/index.js';

import indexRoutes from './routes/index.js';
import authRoutes from "./routes/auth.routes.js";
import technologyRoutes from "./routes/technology.routes.js";
import documentRoutes from "./routes/document.routes.js";
import linkRoutes from "./routes/link.routes.js";
import userRoutes from "./routes/user.routes.js";


const app = express();

// Database connection
connectDB();

// Middlewares
app.use(express.json());
app.use(cors({ origin: config.corsOrigin }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads/documents", express.static("uploads/documents"));

// Routes
app.use('/', indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/technologies", technologyRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/users", userRoutes);

export default app;