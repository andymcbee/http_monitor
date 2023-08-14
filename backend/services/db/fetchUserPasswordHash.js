import { pool } from "../../config/db.js";

export const fetchUserPasswordHash = async (user_password) => {
  try {
    const data = await pool.query(`SELECT password FROM users WHERE email=$1`, [
      user_password,
    ]);

    const password = data?.rows[0]?.password;

    if (password) {
      return { success: true, password };
    } else {
      return {
        success: false,
        password: null,
        message: "Could not fetch password.",
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};
