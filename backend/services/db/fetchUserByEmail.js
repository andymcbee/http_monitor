import { pool } from "../../config/db.js";

export const fetchUserByEmail = async (email) => {
  // LOCK THIS DOWN FOR ADMIN ONLY LATER
  try {
    const data = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);

    return { success: true, data };
  } catch (error) {
    throw new Error(`Fetching user failed ${error}`);
  }
};
