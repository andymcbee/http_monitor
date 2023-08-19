import jwt from "jsonwebtoken";
import { logger } from "../../logger/index.js";

export const verifyJwt = async (req, res, next) => {
  try {
    if (req.headers.authorization === undefined) {
      req.headers.authorization = "";
    }

    //JWT: Authorization: Bearer (token)
    console.log("JWT MIDDLEWARE FUNCTION...");
    console.log(req.headers);

    const token = req.headers.authorization.split(" ")[1];

    console.log(token);

    let decodedToken;

    if (token) {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    }

    next();
  } catch (error) {
    logger.error(error);
    return res.status(401).json({
      success: false,
      message: `Authorization denied. Log in to continue.`,
    });
  }
};
