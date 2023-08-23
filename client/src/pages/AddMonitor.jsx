import React, { useState } from "react";
import "./AddMonitor.css";
import BasicButton from "../components/BasicButton/BasicButton";
import BasicInput from "../components/BasicInput/BasicInput";
import { createMonitor } from "../service/createMonitor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddMonitor({ user }) {
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState(false);

  const [websiteName, setWebsiteName] = useState("");
  const [websiteNameError, setWebsiteNameError] = useState(false);

  const [formSubmitErrorMessage, setFormSubmitErrorMessage] = useState("");

  const handleUrlInput = (value) => {
    setUrl(value);
  };

  const handWebsiteNamelInput = (value) => {
    setWebsiteName(value);
  };

  const handleFormSubmit = () => {
    console.log("Form submit clicked");
    if (!url) {
      setUrlError(true);
      setFormSubmitErrorMessage("Url cannot be blank.");
    }
    if (!websiteName) {
      setWebsiteNameError(true);
      setFormSubmitErrorMessage("Name cannot be blank.");
    }

    if (websiteName && url) {
      setFormSubmitErrorMessage("");
      setUrlError("");
      setWebsiteNameError("");

      //createMonitor(url, websiteName, user.accountId)

      (async function () {
        const newMonitor = await createMonitor(
          url,
          websiteName,
          user.accountId
        );
        console.log(newMonitor);

        if (!newMonitor.success) {
          console.log("Error!");
          setFormSubmitErrorMessage(newMonitor.message);
        }

        if (newMonitor.success) {
          setWebsiteName("");
          setUrl("");
          toast("Success!");
        }
      })();

      //submit form to api

      //if success... clear form

      //if error... set form sbmit error msg
    }
  };

  console.log(user);
  return (
    <>
      <div className="homePageContainer">
        <ToastContainer />
        <div className="pageTitle">Add Monitor</div>
        <div className="homePageContentContainer">
          <div className="addMonitorForm">
            <BasicInput
              handleInput={handleUrlInput}
              labelText="URL"
              placeholderText="Enter website URL"
              error={urlError}
              inputText={url}
            />
            <BasicInput
              handleInput={handWebsiteNamelInput}
              labelText="Name"
              placeholderText="Enter website name"
              error={websiteNameError}
              inputText={websiteName}
            />
            <BasicButton handleClick={handleFormSubmit} buttonText="Submit" />
            {formSubmitErrorMessage && (
              <div className="formSubmitErrorMessage">
                {formSubmitErrorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} /* 
<BasicInput
handleInput={handleInputPassword}
error={passwordError}
labelText="Password"
placeholderText="Enter your password"
inputType="password"
/>
<BasicButton handleClick={handleFormSubmit} buttonText="Login" />

{invalidCredentials && (
<div className="loginErrorMessage">{invalidCredentials}</div>
)} */
