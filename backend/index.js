import "dotenv/config";
import express from "express";
import monitorRoute from "./routes/monitorRoutes.js";
import accountRoute from "./routes/accountRoutes.js";
import bodyParser from "body-parser";
import { logger } from "./logger/index.js";

const app = express();
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/api/v1/monitor", monitorRoute);
app.use("/api/v1/account", accountRoute);

app.listen(port, () => {
  logger.info(`Server running on port: ${port}`);
  logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);
});
