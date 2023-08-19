import { useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import { userLoginService } from "./service/userLoginService";
import { fetchUserDetails } from "./service/fetchUserDetails";
import TopMenu from "./components/TopMenu/TopMenu";
import LoadingModal from "./components/LoadingModal/LoadingModal";
import { createNewAccount } from "./service/createNewAccount";

function App() {
  const [user, setUser] = useState(null);
  const [globalLoading, setGlobalLoading] = useState(true);
  const [userAuthErrorMessage, setUserAuthErrorMessage] = useState(null);
  const [userSignupErrorMessage, setUserSignupErrorMessage] = useState(null);

  const navigate = useNavigate();

  async function setGlobalLoadingAsync(value) {
    setGlobalLoading(value);
  }

  useEffect(() => {
    //Optimize this later. It'll call LocalStorage every time, even if we know a user is present.

    let jwt;

    if (user) setGlobalLoading(false);
    if (!user) {
      jwt = localStorage.getItem("jwt");
    }
    if (jwt) {
      //get user info with jwt
      (async function () {
        console.log("Before user details...");
        const userDetails = await fetchUserDetails(jwt);
        await setGlobalLoadingAsync(false);
        console.log("After user details...");

        if (userDetails.success) {
          setUser({
            userEmail: userDetails.userEmail,
            userId: userDetails.userId,
            accountId: userDetails.accountId,
          });
        }
      })();
    } else {
      console.log("Else...");
      setUser(false);
      setGlobalLoading(false);
    }
  }, []);

  const handleCreateAccount = async (email, password, confirmPassword) => {
    console.log("HANDLE CREATE ACCOUNT TRIGGERED IN /APP/...");
    //Hit Create Account endpoint
    //Return response...
    //make sure error msg is returned if needed (Eg. if PWs dont match or email is taken already)
    //pass res via prop back to Signup to ensure it shows erros as needed.
    console.log(email);
    console.log(password);
    console.log(confirmPassword);

    try {
      const newAccount = await createNewAccount(
        email,
        password,
        confirmPassword
      );
      console.log("In app::");
      console.log(newAccount);

      if (newAccount.success) {
        console.log("IF STATEMENT...");
        //Store JWT in Lstore
        localStorage.setItem("jwt", newAccount.jwtToken);

        setUser({
          userEmail: newAccount.userEmail,
          userId: newAccount.userId,
          accountId: newAccount.accountId,
        });

        navigate("/");
        console.log("After..");
      } else {
        setUserSignupErrorMessage(newAccount.message);
        console.log("Signup failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserLogin = async (email, password) => {
    try {
      //NOTE: Dummy credentials hard coded in the service for testing. Be sure to pass from component through to backend (from form)
      console.log("Handle submit triggered!");
      console.log("This should fire before userLoginService...");
      const userAuth = await userLoginService(email, password);
      console.log("This should fire after......");
      console.log(userAuth);
      if (userAuth.success) {
        console.log("IF STATEMENT...");
        //Store JWT in Lstore
        localStorage.setItem("jwt", userAuth.jwtToken);

        setUser({
          userEmail: userAuth.userEmail,
          userId: userAuth.userId,
          accountId: userAuth.accountId,
        });

        navigate("/");
        console.log("After..");
      } else {
        setUserAuthErrorMessage(userAuth.message);
        console.log("Login failed.");
      }
    } catch (error) {
      console.log(error);
    }

    /* setUser(true); */
  };

  const handleUserLogout = async () => {
    console.log("Handle user logout...");
    //remove JWT
    //set user to null
    localStorage.removeItem("jwt");
    setUser(null);
    navigate("/login");
  };

  if (globalLoading) {
    return <LoadingModal />;
  }

  return (
    <>
      <div className="main">
        <div className="topBar">
          <TopMenu user={user} handleUserLogout={handleUserLogout} />
        </div>
        <div className="pageContent">
          {user && !globalLoading && <div className="sidebar">LeftSidebar</div>}
          <div className="page">
            <Routes>
              <Route
                path="/"
                element={
                  user && !globalLoading ? (
                    <HomePage />
                  ) : (
                    <LoginPage
                      handleUserLogin={handleUserLogin}
                      credentialsValid={userAuthErrorMessage}
                    />
                  )
                }
              />
              <Route
                path="/login"
                element={
                  <LoginPage
                    handleUserLogin={handleUserLogin}
                    credentialsValid={userAuthErrorMessage}
                  />
                }
              />
              <Route
                path="/signup"
                element={
                  !user !== null ? (
                    <SignupPage
                      handleCreateAccount={handleCreateAccount}
                      serverResponse={userSignupErrorMessage}
                    />
                  ) : (
                    <HomePage />
                  )
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
