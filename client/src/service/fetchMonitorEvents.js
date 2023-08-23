import axios from "axios";

export const fetchMonitorEvents = async (monitorId) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const monitorEvents = await axios.get(
      `http://localhost:3000/api/v1/monitor-event/all/${monitorId}`,
      config
    );

    return monitorEvents.data.monitorEvents;
  } catch (error) {
    console.log(error.message);
    // Add conditional logic here to ensure undefined doesn't get passed through to frontend client
    return {
      success: error.response.data.success,
      message: error.response.data.message,
    };
  }
};
