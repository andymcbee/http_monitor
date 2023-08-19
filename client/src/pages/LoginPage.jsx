import "./LoginPage.css";

import Login from "../components/Login/Login";

export default function LoginPage({ handleUserLogin, credentialsValid }) {
  return (
    <>
      <div className="loginPageMain">
        <Login
          handleUserLogin={handleUserLogin}
          credentialsValid={credentialsValid}
        />
      </div>
    </>
  );
}
