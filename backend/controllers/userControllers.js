import { fetchUserPasswordHash } from "../services/db/fetchUserPasswordHash.js";
import { logger } from "../logger/index.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
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

    if (userPasswordHash.success) {
      match = await bcrypt.compare(user_password, userPasswordHash.password);
    } else {
      match = false;
    }

    if (match && userPasswordHash.success) {
      res.status(200).json({
        success: true,
        message: `Password and email match!`,
        token: "Add a JWT token here.",
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
