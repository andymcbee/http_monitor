import { pool } from "../../config/db.js";

export const fetchMonitors = async () => {
  try {
    const data = await pool.query(`SELECT * FROM monitors`);

    return { success: true, monitors: data.rows };
  } catch (error) {
    throw new Error(`Fetching monitors failed`);
  }
};
