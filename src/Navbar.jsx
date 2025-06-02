import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const hideLogout =
    location.pathname === "/login" || location.pathname === "/";

  return (
    <nav className="flex justify-end bg-gray-800 p-4">
      {!hideLogout && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </nav>
  );
}
