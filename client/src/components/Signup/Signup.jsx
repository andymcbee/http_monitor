import "./Signup.css";
import React, { useState, useEffect } from "react";
import BasicInput from "../BasicInput/BasicInput";
import BasicButton from "../BasicButton/BasicButton";

export default function Signup({ handleCreateAccount, serverResponse }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [serverResponseMessage, setServerResponseMessage] = useState(null);

  useEffect(() => {
    setServerResponseMessage(serverResponse);
  }, [serverResponse]);

  let handleInputEmail = (value) => {
    setEmail(value);
  };

  let handleInputPassword = (value) => {
    setPassword(value);
  };

  let handleInputConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const handleFormSubmit = () => {
    console.log("FORM SUBMIT IN SIGNUP COMP TRIGGERED!");
    if (!email) setEmailError(true);
    if (!password) setPasswordError(true);
    if (!confirmPassword) setConfirmPasswordError(true);

    if (email && password && confirmPassword) {
      setEmailError(false);
      setPasswordError(false);
      setConfirmPasswordError(false);

      handleCreateAccount(email, password, confirmPassword);
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Sign Up</span>
      <div className="loginForm">
        <BasicInput
          handleInput={handleInputEmail}
          error={emailError}
          labelText="Username"
          placeholderText="Enter your username"
          inputType="text"
          inputText={email}
        />
        <BasicInput
          handleInput={handleInputPassword}
          error={passwordError}
          labelText="Password"
          placeholderText="Enter your password"
          inputType="password"
        />
        <BasicInput
          handleInput={handleInputConfirmPassword}
          error={confirmPasswordError}
          labelText="Confirm password"
          placeholderText="Re-enter your password"
          inputType="password"
        />
        <BasicButton
          handleClick={handleFormSubmit}
          buttonText="Create Account"
        />

        {serverResponseMessage && (
          <div className="loginErrorMessage">{serverResponseMessage}</div>
        )}
      </div>
    </div>
  );
}
