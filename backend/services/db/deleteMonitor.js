import { pool } from "../../config/db.js";

export const deleteMonitor = async (monitorId, accountId) => {
  console.log(accountId);
  try {
    const data = await pool.query(
      `DELETE FROM monitors WHERE id = $1 AND accountId = $2`,
      [monitorId, accountId]
    );

    if (data.rowCount === 0) {
      throw new Error(`Monitor ${monitorId} does not exist`);
    }

    return { success: true, data: { countDeleted: data.rowCount, monitorId } };
  } catch (error) {
    throw new Error(`Delete monitor failed for ${monitorId} Message: ${error}`);
  }
};
