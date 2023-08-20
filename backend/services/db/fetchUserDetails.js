import { pool } from "../../config/db.js";

export const fetchUserDetails = async (user_id) => {
  try {
    const data = await pool.query(
      `SELECT id, email, accountId FROM users WHERE id=$1`,
      [user_id]
    );

    const userId = data?.rows[0]?.id;
    const userEmail = data?.rows[0]?.email;
    const accountId = data?.rows[0]?.accountid;

    if (userId && userEmail && accountId) {
      return { success: true, userId, userEmail, accountId };
    } else {
      return {
        success: false,
        accountId: null,
        userId: null,
        userEmail: null,
        message: "Could not fetch user.",
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};
