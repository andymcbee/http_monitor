import { pool } from "../../config/db.js";
import { v4 as uuidv4 } from "uuid";

export const createMonitor = async (name, domain_name, accountId) => {
  const id = uuidv4();

  try {
    const newMonitor = await pool.query(
      `INSERT INTO monitors(id, name, domain_name, accountId) 
            VALUES ($1, $2, $3, $4) RETURNING id, name, domain_name;`,
      [id, name, domain_name, accountId]
    );

    const data = newMonitor.rows[0];

    return { success: true, data };
  } catch (error) {
    throw new Error(
      `Insert into database failed for domain_name ${domain_name} Message: ${error}`
    );
  }
};
