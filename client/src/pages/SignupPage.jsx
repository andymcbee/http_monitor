import "./SignupPage.css";

import Signup from "../components/Signup/Signup";

export default function SignupPage({ handleCreateAccount, serverResponse }) {
  return (
    <>
      <div className="loginPageMain">
        <Signup
          handleCreateAccount={handleCreateAccount}
          serverResponse={serverResponse}
        />
      </div>
    </>
  );
}
