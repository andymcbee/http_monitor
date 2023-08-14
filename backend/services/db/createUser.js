import { pool } from "../../config/db.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export const createUser = async (
  user_name,
  email,
  accountId,
  user_password
) => {
  const id = uuidv4();

  try {
    //hash user password prior to storing.
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(user_password, salt);

    const newUser = await pool.query(
      `INSERT INTO users(id, name, email, accountId, password) 
            VALUES ($1, $2, $3, $4, $5) RETURNING id;`,
      [id, user_name, email, accountId, passwordHash]
    );

    const data = newUser.rows[0];

    return { success: true, data };
  } catch (error) {
    throw new Error(
      `Insert into database failed for new user ${email} Message: ${error}`
    );
  }
};
