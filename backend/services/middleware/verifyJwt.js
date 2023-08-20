import jwt from "jsonwebtoken";
import { logger } from "../../logger/index.js";

export const verifyJwt = async (req, res, next) => {
  try {
    console.log("JWT MIDDLEWEAR...");
    console.log(req.cookies);

    const { jwt: jwtToken } = req.cookies;
    if (!jwtToken) {
      throw "No jwt found.";
    }
    console.log(jwtToken);

    let decodedToken;

    if (jwtToken) {
      decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET);
    }

    console.log("JWT MIDDLEWARE PASSED!");
    next();
  } catch (error) {
    logger.error(error);
    return res.status(401).json({
      success: false,
      message: `Authorization denied. Log in to continue.`,
    });
  }
};
