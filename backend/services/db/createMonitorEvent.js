import { pool } from "../../config/db.js";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../../logger/index.js";

export const createMonitorEvent = async (
  monitorId,
  httpStatus,
  httpStatusText,
  responseTimeMs,
  eventSuccess,
  accountId
) => {
  const id = uuidv4();

  try {
    const newMonitorEvent = await pool.query(
      `INSERT INTO monitor_events(id, httpStatus, httpStatusText, monitorId, responseTimeMs, success, accountId) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`,
      [
        id,
        httpStatus,
        httpStatusText,
        monitorId,
        responseTimeMs,
        eventSuccess,
        accountId,
      ]
    );

    const data = newMonitorEvent.rows[0];

    return { success: true, data };
  } catch (error) {
    throw new Error(
      `Insert into database failed for monitorId ${monitorId} Message: ${error}`
    );
  }
};
