import React, { useEffect, useState, useContext } from "react";
import AgeCalculator from "./tabledon";
import { useParams } from "react-router-dom";
import AuthContext from "../session";
const Profile = () => {
  const [userData, setUserData] = useState(null);
  let { Tokens, logout } = useContext(AuthContext);
  const { id } = useParams();
  useEffect(() => {
    const fetchUserData = async () => {
      const acces = "Bearer " + String(Tokens.token);
      const response = await fetch(`http://127.0.0.1:8000/donateur/${id}/`, {
        method: "GET",
        // headers: {
        //   Authorization: acces,
        // },

        credentials: "include",
      });
      const data = await response.json();
      //setUserData(data);
      if (response.status === 200) {
        setUserData(data);
      } else {
        console.error("Erreur lors de la demande :", data);
      }
    };

    fetchUserData();
  }, []);
  if (!userData) {
    return <p>Chargement des données...</p>;
  }
  const FaitDon = () => {
    fetch(`http://127.0.0.1:8000/donateurs/${id}/update/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        a_fait_don: true, // ou false selon votre besoin
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour du donateur");
        }
        return response.json();
      })
      .then(data => {
        alert("Donateur a fait le don avec succès !");
        // Redirection vers "/"
        window.location.href = "/don"; // Affiche les données du donateur mises à jour
      })
      .catch(error => {
        console.error("Erreur lors de la mise à jour du donateur :", error);
      });
  }
  const supprimer = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/don/${id}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Donateur supprimé avec succès !");
        // Redirection vers "/"
        window.location.href = "/don";
      } else {
        alert("Erreur lors de la suppression du donateur");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du donateur :", error);
    }
  };
  return (
    <div class="p-10 h-7">
      <div class="p-8 bg-white shadow mt-24">
        <div class="grid grid-cols-1 md:grid-cols-3">
          <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <button onClick={supprimer} class="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Supprimer
            </button>
          </div>
          <div class="relative">
            <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-24 w-24"
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
          <a href={`/test/${id}`} class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Test
            </a>
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
            userData.date_don_active ===
            new Date().toISOString().split("T")[0] ? (
              <p class="text-gray-600 text-center font-light lg:px-16">
                L'utilisateur n'est pas actif pour le moment
              </p>
            ) : (
              <p class="text-gray-600 text-center font-light lg:px-16">
                L'utilisateur est actif
              </p>
            )
          ) : (
            <p class="text-gray-600 text-center font-light lg:px-16">
              L'utilisateur n'a pas encore fait de don
            </p>
          )}

          <button
          onClick={FaitDon}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          A Faait Don
        </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
