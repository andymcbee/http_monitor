import { createMonitor as createMonitorInDb } from "../services/db/createMonitor.js";
import { getHttpStatus } from "../services/logic/getHttpStatus.js";
import { createMonitorEvent } from "../services/db/createMonitorEvent.js";
import { logger } from "../logger/index.js";

export const createMonitor = async (req, res) => {
  const { name, domain_name } = req.body;

  try {
    const newMonitor = await createMonitorInDb(name, domain_name);

    const monitorId = newMonitor.data.id;

    const httpStatus = await getHttpStatus(domain_name);

    const { status, statusText, responseTimeMs } = httpStatus;

    let eventSuccess = true;

    const newMonitorEvent = await createMonitorEvent(
      monitorId,
      status,
      statusText,
      responseTimeMs,
      eventSuccess
    );

    const monitorEventId = newMonitorEvent.data.id;

    res.status(200).json({
      success: true,
      data: {
        status,
        statusText,
        monitorId,
        monitorEventId,
        responseTimeMs,
      },
    });
  } catch (error) {
    logger.error(error);
    res
      .status(400)
      .json({ success: false, message: "Error creating monitor." });
  }
};
