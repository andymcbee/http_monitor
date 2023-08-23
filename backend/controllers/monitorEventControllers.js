import { fetchMonitorEvents } from "../services/db/fetchAllMonitorEvents.js";

export const fetchAllMonitorEvents = async (req, res) => {
  try {
    const { monitorId } = req.params;
    console.log(monitorId);
    const allMonitorEvents = await fetchMonitorEvents(monitorId);
    console.log("IN CONTROLLER::");
    console.log(allMonitorEvents);

    res.status(200).json({
      success: true,
      monitorEvents: allMonitorEvents.monitorEvents,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
