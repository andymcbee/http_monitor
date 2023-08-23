import "dotenv/config";
import express from "express";
import monitorRoute from "./routes/monitorRoutes.js";
import monitorEventRoute from "./routes/monitorEventRoutes.js";

import accountRoute from "./routes/accountRoutes.js";
import userRoute from "./routes/userRoutes.js";
import bodyParser from "body-parser";
import { logger } from "./logger/index.js";
import { verifyJwt } from "./services/middleware/verifyJwt.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

let corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));

//Middleware
//app.use(verifyJwt);

app.use("/api/v1/monitor", verifyJwt, monitorRoute);
app.use("/api/v1/account", accountRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/monitor-event", monitorEventRoute);

app.listen(port, () => {
  logger.info(`Server running on port: ${port}`);
  logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);
});
