import "./Login.css";
import React, { useState, useEffect } from "react";
import BasicInput from "../BasicInput/BasicInput";
import BasicButton from "../BasicButton/BasicButton";

export default function LoginPage({ handleUserLogin, credentialsValid }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [invalidCredentials, setInvalidCredentials] = useState(null);

  useEffect(() => {
    setInvalidCredentials(credentialsValid);
  }, [credentialsValid]);

  let handleInputEmail = (value) => {
    setEmail(value);
  };

  let handleInputPassword = (value) => {
    setPassword(value);
  };

  const handleFormSubmit = () => {
    if (!email) setEmailError(true);
    if (!password) setPasswordError(true);

    if (email && password) {
      setEmailError(false);
      setPasswordError(false);
      handleUserLogin(email, password);
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
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

        <BasicButton handleClick={handleFormSubmit} buttonText="Login" />

        {invalidCredentials && (
          <div className="loginErrorMessage">{invalidCredentials}</div>
        )}
      </div>
    </div>
  );
}
