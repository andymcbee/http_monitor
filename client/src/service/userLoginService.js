import axios from "axios";

export const userLoginService = async (email, password) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const userAuth = await axios.post(
      `http://localhost:3000/api/v1/user/login`,
      {
        user_email: email,
        user_password: password,
      },
      config
    );

    console.log("USer data from API call::");

    console.log(userAuth);

    const { userId, userEmail, accountId } = userAuth.data.data;
    return {
      success: true,
      message: userAuth.data.message,
      userId,
      userEmail,
      accountId,
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
