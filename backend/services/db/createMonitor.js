import { pool } from "../../config/db.js";
import { v4 as uuidv4 } from "uuid";

export const createMonitor = async (name, domain_name) => {
  const id = uuidv4();

  try {
    const newMonitor = await pool.query(
      `INSERT INTO monitors(id, name, domain_name) 
            VALUES ($1, $2, $3) RETURNING id, name, domain_name;`,
      [id, name, domain_name]
    );

    const data = newMonitor.rows[0];

    return { success: true, data };
  } catch (error) {
    throw new Error(
      `Insert into database failed for domain_name ${domain_name} Message: ${error}`
    );
  }
};
