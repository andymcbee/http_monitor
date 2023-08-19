import { pool } from "../../config/db.js";

export const fetchUserPasswordHash = async (user_email) => {
  try {
    const data = await pool.query(
      `SELECT password, id, email, accountId FROM users WHERE email=$1`,
      [user_email]
    );

    const password = data?.rows[0]?.password;
    const userId = data?.rows[0]?.id;
    const userEmail = data?.rows[0]?.email;
    const accountId = data?.rows[0]?.accountid;

    if (password) {
      return { success: true, password, userId, userEmail, accountId };
    } else {
      return {
        success: false,
        password: null,
        userId: null,
        accountId: null,

        message: "Could not fetch password.",
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};
