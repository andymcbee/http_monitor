import axios from "axios";

export const userLogout = async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    await axios.post(`http://localhost:3000/api/v1/user/logout`, {}, config);

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
