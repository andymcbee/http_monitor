import axios from "axios";

export const fetchUserDetails = async () => {
  console.log("Getch user details");

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const userDetails = await axios.post(
      `http://localhost:3000/api/v1/user/me`,
      {},
      config
    );

    console.log("USer data from API call::");

    console.log(userDetails);
    console.log(userDetails.data.data);

    if (userDetails.data.success) {
      console.log("IF TRIGGERED! in fwetchUSD service");
      return {
        success: true,
        accountId: userDetails.data.data.accountId,
        userId: userDetails.data.data.userId,
        userEmail: userDetails.data.data.userEmail,
      };
    }
  } catch (error) {
    //login failed
    // Add conditional logic here to ensure undefined doesn't get passed through to frontend client
    return {
      success: error.response.data.success,
      message: error.response.data.message,
    };
  }
};
