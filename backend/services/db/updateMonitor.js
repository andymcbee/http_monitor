import { pool } from "../../config/db.js";

//Main
export const updateMonitor = async (
  monitorId,
  domain_name,
  name,
  accountId
) => {
  console.log("Test");

  if (!domain_name || !name || !monitorId) {
    throw "Update monitor failed. Please provide domain_name, name and monitorId to update.";
  }

  try {
    const updateMonitor = await pool.query(
      `UPDATE monitors SET domain_name=$2, name=$3 WHERE id=$1 AND accountId=$4`,
      [monitorId, domain_name, name, accountId]
    );
    console.log("Monitr...");
    console.log(updateMonitor);

    if (updateMonitor.rowCount > 0) {
      return {
        success: true,
        data: { countUpdated: updateMonitor.rowCount, monitorId },
      };
    } else {
      throw new Error(`No such monitor for id or acc id.`);
    }
  } catch (error) {
    throw new Error(`Update monitor failed for ${monitorId} Message: ${error}`);
  }
};
