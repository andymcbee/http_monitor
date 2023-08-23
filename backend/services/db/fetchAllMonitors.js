import { pool } from "../../config/db.js";

export const fetchMonitors = async (accountId) => {
  try {
    const data = await pool.query(
      `
      SELECT m.id, m.name, m.domain_name, me.responsetimems, me.httpstatus, me.httpstatustext
      FROM monitors m
      JOIN (
          SELECT
              me1.*,
              ROW_NUMBER() OVER (PARTITION BY monitorId ORDER BY created_at DESC) AS rn
          FROM monitor_events me1
          WHERE me1.accountId = $1
      ) me ON m.id = me.monitorId AND me.rn = 1
      WHERE m.accountId = $1;
  `,
      [accountId]
    );

    console.log("DATA:::");
    console.log(data);

    return { success: true, monitors: data.rows };
  } catch (error) {
    console.log(error);
    throw new Error(`Fetching monitors failed`);
  }
};
