import { createAccount as createAccountInDb } from "../services/db/createAccount.js";
import { createUser as createUserInDb } from "../services/db/createUser.js";
import jwt from "jsonwebtoken";
import { fetchUserByEmail } from "../services/db/fetchUserByEmail.js";

import { logger } from "../logger/index.js";

export const createAccount = async (req, res) => {
  console.log(req.body);
  const {
    account_name,
    user_email,
    user_name,
    user_password,
    user_confirm_password,
  } = req.body;

  try {
    if (user_password !== user_confirm_password)
      throw "Passwords do not match. Try again.";

    const emailAddressValidationRegex =
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*(\+[a-z0-9-]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;

    if (!emailAddressValidationRegex.test(user_email))
      throw "Invalid email. Try again.";

    const userExists = await fetchUserByEmail(req.body.user_email);

    if (userExists.data.rowCount > 0) throw "Email in use already.";

    const newAccount = await createAccountInDb(account_name);

    const accountId = newAccount.data.id;

    const newUser = await createUserInDb(
      user_name,
      user_email,
      accountId,
      user_password
    );

    const userId = newUser.data.id;

    const jwtExpiry = 86400;

    const jwtToken = await jwt.sign({ key: userId }, process.env.JWT_SECRET, {
      expiresIn: jwtExpiry,
    });

    res.cookie("jwt", jwtToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: jwtExpiry * 1000, //maxAge is in MS, jwt initially stored in seconds
    });

    res.status(200).json({
      success: true,
      message: `New account created for user ${user_email}`,
      data: {
        accountId,
        userId,
        userEmail: user_email,
      },
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ success: false, message: error });
  }
};
