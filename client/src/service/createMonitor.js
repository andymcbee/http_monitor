import axios from "axios";

export const createMonitor = async (url, websiteName, accountId) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const newMonitor = await axios.post(
      `http://localhost:3000/api/v1/monitor`,
      {
        name: websiteName,
        domain_name: url,
        accountId: accountId,
      },
      config
    );

    console.log(newMonitor);
    return {
      success: true,
    };
  } catch (error) {
    //login failed
    // Add conditional logic here to ensure undefined doesn't get passed through to frontend client
    return {
      success: error.response.data.success,
      message: error.response.data.message,
    };
  }
};
