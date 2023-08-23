import "./SidebarMenu.css";
import { useNavigate } from "react-router-dom";

export default function SidebarMenu() {
  const navigate = useNavigate();
  function handleNavigation(path) {
    navigate(path);
  }

  return (
    <div className="sidebarMenu">
      <ul className="testing">
        <li onClick={() => handleNavigation("/")}>Dashboard</li>
        <li onClick={() => handleNavigation("/add-monitor")}>Create Monitor</li>
      </ul>
    </div>
  );
}
