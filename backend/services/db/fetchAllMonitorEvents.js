import { pool } from "../../config/db.js";

export const fetchMonitorEvents = async (monitorId) => {
  try {
    const data = await pool.query(
      `
      SELECT responsetimems, httpstatus, httpstatustext, created_at, id as monitor_event_id
      FROM monitor_events
      WHERE monitorId = $1;
  `,
      [monitorId]
    );

    console.log("DATA:::");
    console.log(data);

    return { success: true, monitorEvents: data.rows };
  } catch (error) {
    console.log(error);
    throw new Error(`Fetching monitors failed`);
  }
};
