import { createMonitor as createMonitorInDb } from "../services/db/createMonitor.js";
import { deleteMonitor as deleteMonitorInDb } from "../services/db/deleteMonitor.js";
import { updateMonitor as updateMonitorInDb } from "../services/db/updateMonitor.js";
import { fetchMonitors } from "../services/db/fetchAllMonitors.js";
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

export const deleteMonitor = async (req, res) => {
  const { monitorId } = req.params;

  try {
    const data = await deleteMonitorInDb(monitorId);

    console.log(data);

    const { countDeleted, monitorId: monitorIdFromDb } = data.data;

    res.status(200).json({
      success: true,
      data: {
        countDeleted,
        monitorId: monitorIdFromDb,
      },
    });
  } catch (error) {
    logger.error(error);
    res
      .status(400)
      .json({ success: false, message: "Error deleting monitor." });
  }
};

export const updateMonitor = async (req, res) => {
  const data = req.body;
  const { monitorId } = req.params;

  try {
    const updateMonitor = await updateMonitorInDb(monitorId, data);

    res.status(200).json({
      success: true,
      message: `Monitor ${updateMonitor.data.monitorId} updated!`,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error updating monitor." });
  }
};

export const fetchAllMonitors = async (req, res) => {
  try {
    const fetchAllMonitors = await fetchMonitors();

    res.status(200).json({
      success: true,
      monitors: fetchAllMonitors.monitors,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error updating monitor." });
  }
};
