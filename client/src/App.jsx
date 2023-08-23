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
import SidebarMenu from "./components/SidebarMenu/SidebarMenu";
import { userLogout } from "./service/userLogout";
import AddMonitor from "./pages/AddMonitor";
import MonitorEventHistory from "./pages/MonitorEventHistory";

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

    if (user) setGlobalLoading(false);
    if (!user) {
      (async function () {
        console.log("Before user details...");
        const userDetails = await fetchUserDetails();
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
    try {
      const newAccount = await createNewAccount(
        email,
        password,
        confirmPassword
      );

      if (newAccount.success) {
        setUser({
          userEmail: newAccount.userEmail,
          userId: newAccount.userId,
          accountId: newAccount.accountId,
        });

        navigate("/");
      } else {
        setUserSignupErrorMessage(newAccount.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserLogin = async (email, password) => {
    try {
      //NOTE: Dummy credentials hard coded in the service for testing. Be sure to pass from component through to backend (from form)
      const userAuth = await userLoginService(email, password);
      if (userAuth.success) {
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
    await userLogout();
    setUser(null);
    navigate("/login");
  };

  if (globalLoading) {
    return <LoadingModal />;
  }

  return (
    <>
      <div className="screen">
        {user && !globalLoading && (
          <div className="sidebar">
            <SidebarMenu />
          </div>
        )}
        <div className="main">
          <div className="topBar">
            <TopMenu user={user} handleUserLogout={handleUserLogout} />
          </div>
          <div className="pageContent">
            <div className="page">
              <Routes>
                <Route
                  path="/"
                  element={
                    user && !globalLoading ? (
                      <HomePage user={user} />
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
                    !user ? (
                      <LoginPage
                        handleUserLogin={handleUserLogin}
                        credentialsValid={userAuthErrorMessage}
                      />
                    ) : (
                      <HomePage user={user} />
                    )
                  }
                />
                <Route
                  path="/signup"
                  element={
                    !user ? (
                      <SignupPage
                        handleCreateAccount={handleCreateAccount}
                        serverResponse={userSignupErrorMessage}
                      />
                    ) : (
                      <HomePage user={user} />
                    )
                  }
                />
                <Route
                  path="/add-monitor"
                  element={
                    user ? (
                      <AddMonitor user={user} />
                    ) : (
                      <LoginPage
                        handleUserLogin={handleUserLogin}
                        credentialsValid={userAuthErrorMessage}
                      />
                    )
                  }
                />
                <Route
                  path="/monitor-history/:monitorId"
                  element={
                    user ? (
                      <MonitorEventHistory user={user} />
                    ) : (
                      <LoginPage
                        handleUserLogin={handleUserLogin}
                        credentialsValid={userAuthErrorMessage}
                      />
                    )
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
