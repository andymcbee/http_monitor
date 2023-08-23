import jwt from "jsonwebtoken";
import { logger } from "../../logger/index.js";

export const verifyJwt = async (req, res, next) => {
  try {
    const { jwt: jwtToken } = req.cookies;
    if (!jwtToken) {
      throw "No jwt found.";
    }

    let decodedToken;

    if (jwtToken) {
      decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET);
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
