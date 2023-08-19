import "./TopMenu.css";
import { useNavigate } from "react-router-dom";

export default function TopMenu({ user, handleUserLogout }) {
  const navigate = useNavigate();

  function handleNavigation(path) {
    navigate(path);
  }
  return (
    <div className="topMenuParent">
      <div className="topMenuLeftSection">
        {user ? (
          <>
            <div>{user.userEmail}</div>
            <div>{user.userId}</div>
          </>
        ) : (
          <div>HTTP Monitor</div>
        )}
      </div>
      <div className="topMenuRightSection">
        {user ? (
          <>
            <div className="mainMenuItem" onClick={() => handleNavigation("/")}>
              Home
            </div>
            <div className="mainMenuItem" onClick={handleUserLogout}>
              Logout
            </div>
          </>
        ) : (
          <>
            <div
              className="mainMenuItem"
              onClick={() => handleNavigation("/signup")}
            >
              Signup
            </div>
            <div
              className="mainMenuItem"
              onClick={() => handleNavigation("/login")}
            >
              Login
            </div>
          </>
        )}
      </div>
    </div>
  );
}
