import { pool } from "../../config/db.js";
import { v4 as uuidv4 } from "uuid";

export const createAccount = async (account_name) => {
  const id = uuidv4();

  try {
    const newAccount = await pool.query(
      `INSERT INTO accounts(id, name) 
            VALUES ($1, $2) RETURNING id, name;`,
      [id, account_name]
    );

    const data = newAccount.rows[0];

    return { success: true, data };
  } catch (error) {
    throw new Error(
      `Insert into database failed for new account ${account_name} Message: ${error}`
    );
  }
};
