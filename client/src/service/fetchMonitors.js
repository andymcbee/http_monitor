import axios from "axios";

export const fetchMonitors = async (accountId) => {
  console.log("Getch user details");

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const monitors = await axios.get(
      `http://localhost:3000/api/v1/monitor/all/${accountId}`,
      config
    );

    return monitors.data.monitors;
  } catch (error) {
    console.log(error.message);
    //login failed
    // Add conditional logic here to ensure undefined doesn't get passed through to frontend client
    return {
      success: error.response.data.success,
      message: error.response.data.message,
    };
  }
};
