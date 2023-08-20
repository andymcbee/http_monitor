import axios from "axios";

export const createNewAccount = async (email, password, confirmPassword) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const newAccount = await axios.post(
      `http://localhost:3000/api/v1/account`,
      {
        user_email: email,
        user_password: password,
        user_confirm_password: confirmPassword,
        user_name: "Drew",
      },
      config
    );

    console.log("USer data from SIGN UP API call::");

    console.log(newAccount);

    const { userId, userEmail } = newAccount.data.data;
    return {
      success: true,
      userId,
      userEmail,
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
