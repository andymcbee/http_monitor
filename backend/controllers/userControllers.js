import { fetchUserPasswordHash } from "../services/db/fetchUserPasswordHash.js";
import { fetchUserDetails } from "../services/db/fetchUserDetails.js";

import { logger } from "../logger/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  try {
    console.log("Back end JWT:::");
    console.log(req.headers.authorization);
    //get uid from jwt
    //pass into fetchUsers
    //return to front end email, uid, accid

    const { jwt: jwtToken } = req.cookies;

    const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET);

    console.log(decodedToken);
    const user = await fetchUserDetails(decodedToken.key);

    if (user.success) {
      res.status(200).json({
        success: true,
        message: `User found!`,
        data: {
          userId: user.userId,
          accountId: user.accountId,
          userEmail: user.userEmail,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: `User was not found.`,
        data: {
          user,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Denied access." });
  }
};

export const login = async (req, res) => {
  console.log("LOGIN ENDPOINT HIT. (CONTROLLER)");
  console.log(req.body);
  const { user_email, user_password } = req.body;

  try {
    //Check if PW is correct

    //If so, return jwt

    //Otherwise return error

    //get user password hash from DB
    const userPasswordHash = await fetchUserPasswordHash(user_email);

    console.log("RESULT FROM DB IN USER CONTROLLER::");
    console.log(userPasswordHash);

    //check if hash and provided password match
    let match;
    let jwtToken;
    let jwtExpiry = 86400;

    if (userPasswordHash.success) {
      match = await bcrypt.compare(user_password, userPasswordHash.password);

      jwtToken = await jwt.sign(
        { key: userPasswordHash.userId },
        process.env.JWT_SECRET,
        {
          expiresIn: jwtExpiry,
        }
      );
    } else {
      match = false;
    }

    if (match && userPasswordHash.success) {
      res.cookie("jwt", jwtToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: jwtExpiry * 1000, //maxAge is in MS, jwt initially stored in seconds
      });
      res.status(200).json({
        success: true,
        message: `Password and email match!`,
        data: {
          userEmail: userPasswordHash.userEmail,
          userId: userPasswordHash.userId,
          accountId: userPasswordHash.accountId,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(400).json({ success: false, message: "Error logging in user." });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      success: true,
      message: `User logged out!`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "An error has occurred." });
  }
};
