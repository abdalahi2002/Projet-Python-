import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../session";
import AgeCalculator from "./navbar";
function UserProfile() {
  const [userData, setUserData] = useState(null);
  let { authTokens, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      const acces = "Bearer " + String(authTokens.token);
      const response = await fetch("http://127.0.0.1:8000/user/", {
        method: "GET",
        headers: {
          Authorization: acces,
        },

        credentials: "include",
      });
      const data = await response.json();
      if (response.status === 200) {
        setUserData(data);
      } else {
        logout();
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div
      className="table-container"
      style={{
        marginTop: "60",
        overflowY: "scroll",
        height: "calc(100vh - 60px",
      }}
    >
      <div class="p-8 bg-white shadow mt-24">
        <div class="grid grid-cols-1 md:grid-cols-3">
          <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <button class="text-white py-2 px-4 uppercase rounded bg-white hover:bg-white shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"></button>
          </div>
          <div class="relative">
            <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-18 w-18"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button class="text-white py-2 px-4 uppercase rounded bg-white hover:bg-white shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"></button>
          </div>
        </div>

        <div class="mt-20 text-center border-b pb-12">
          <h1 class="text-4xl font-medium text-gray-700">
            {userData.first_name} {userData.last_name} ,
            <span class="font-light text-gray-500">
              <AgeCalculator dateOfBirth={userData.date_naissance} />
            </span>
          </h1>
          <p class="font-light text-gray-1000 mt-3">
            {userData.wilaya}, {userData.type_sang}
          </p>

          <p class="mt-8 text-gray-500">Email - {userData.email}</p>
          <p class="mt-2 text-gray-500">Phone - {userData.tel}</p>
        </div>

        <div class="mt-12 flex flex-col justify-center">
          {userData.a_fait_don ? (
            <p class="text-gray-600 text-center font-light lg:px-16">
              {userData.first_name} {userData.last_name} n'est pas actif pour le
              moment
            </p>
          ) : (
            <p class="text-gray-600 text-center font-light lg:px-16">
              {userData.first_name} {userData.last_name} est actif
            </p>
          )}
          <p class="text-gray-600 text-center font-light lg:px-16">
          <a
            class="text-black-500 py-1 px-1  font-medium mt-4 content-center"
            href="/updpass"
          >
            modifier le mot de passe
          </a>
            </p>
          
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
