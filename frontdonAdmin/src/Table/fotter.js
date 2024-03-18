import React, { useState, useContext } from "react";
import AuthContext from "../session";
import { useNavigate } from "react-router-dom";
function Header({ setSidebarOpen }) {
  const { user, logout } = useContext(AuthContext);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(); // Appeler la fonction de déconnexion du contexte d'authentification
    navigate("/login"); // Rediriger l'utilisateur vers la page de connexion après la déconnexion
  };
  if (!user) {
    return null;
  }
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
      <div className="flex items-center">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-gray-500 focus:outline-none lg:hidden"
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* <div className="relative mx-4 lg:mx-0">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-5 h-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <input
            className="w-32 pl-10 pr-4 rounded-md form-input sm:w-64 focus:border-indigo-600"
            type="text"
            placeholder="Search"
          />
        </div> */}
      </div>

      <div className="flex items-center">
        

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="relative block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
          >
            <img
              className="object-cover w-full h-full"
              src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
              alt="Your avatar"
            />
          </button>

          {dropdownOpen && (
            <div
              onClick={() => setDropdownOpen(false)}
              className="fixed inset-0 z-10 w-full h-full"
            ></div>
          )}

          {dropdownOpen && (
            <div className="absolute right-0 z-10 w-48 mt-2 overflow-hidden bg-white rounded-md shadow-xl">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
              >
                Profile
              </a>
              <button
                onClick={handleLogout}
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
              >
                Logout
              </button>
              {/* Other dropdown items */}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
