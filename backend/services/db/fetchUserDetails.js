import { pool } from "../../config/db.js";

export const fetchUserDetails = async (user_id) => {
  try {
    console.log("IN FETCH USER DETAILS SERVICE");
    console.log(user_id);
    const data = await pool.query(
      `SELECT id, email, accountId FROM users WHERE id=$1`,
      [user_id]
    );

    console.log(data);

    const userId = data?.rows[0]?.id;
    const userEmail = data?.rows[0]?.email;
    const accountId = data?.rows[0]?.accountid;
    console.log(userEmail);
    console.log(userId);

    console.log(accountId);

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
