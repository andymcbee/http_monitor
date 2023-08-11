import { createAccount as createAccountInDb } from "../services/db/createAccount.js";
import { createUser as createUserInDb } from "../services/db/createUser.js";

import { logger } from "../logger/index.js";

export const createAccount = async (req, res) => {
  const { account_name, user_email, user_name } = req.body;

  try {
    const newAccount = await createAccountInDb(account_name);

    const accountId = newAccount.data.id;

    const newUser = await createUserInDb(user_name, user_email, accountId);

    res.status(200).json({
      success: true,
      message: `New account created for user ${user_email}`,
      data: {
        accountId,
      },
    });
  } catch (error) {
    logger.error(error);
    res
      .status(400)
      .json({ success: false, message: "Error creating monitor." });
  }
};
