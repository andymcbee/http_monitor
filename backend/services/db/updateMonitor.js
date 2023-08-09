import { pool } from "../../config/db.js";

//Main
export const updateMonitor = async (monitorId, data) => {
  const { domain_name, name } = data;

  if (!domain_name || !name || !monitorId) {
    throw "Update monitor failed. Please provide domain_name, name and monitorId to update.";
  }

  try {
    const updateMonitor = await pool.query(
      `UPDATE monitors SET domain_name=$2, name=$3 WHERE id=$1`,
      [monitorId, domain_name, name]
    );

    return { success: true, data: { countUpdated: data.rowCount, monitorId } };
  } catch (error) {
    throw new Error(`Update monitor failed for ${monitorId} Message: ${error}`);
  }
};
