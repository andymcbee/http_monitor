import { pool } from "../../config/db.js";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (user_name, email, accountId) => {
  const id = uuidv4();

  try {
    const newUser = await pool.query(
      `INSERT INTO users(id, name, email, accountId) 
            VALUES ($1, $2, $3, $4) RETURNING id;`,
      [id, user_name, email, accountId]
    );

    const data = newUser.rows[0];

    return { success: true, data };
  } catch (error) {
    throw new Error(
      `Insert into database failed for new user ${email} Message: ${error}`
    );
  }
};
