import React from "react";

const Fotter = () => {
  return (
    <footer className="mt-8 bg-gray-200 p-4 text-center w-full">
      <div className="flex justify-center items-center">
        <img
          src={require("C:/Users/hp/Desktop/frontend/frontdon/src/Asseste/bn.jpg")}
          className="h-8 mr-2"
          alt="Banque de don du sang"
        />

        <p className="mr-4">
          La Banque de Don de Sang travaille pour sauver des vies en collectant
          et distribuant du sang aux personnes dans le besoin.
        </p>
      </div>

      <div className="mt-4">
        <p>Contactez-nous :</p>
        <p>
          <i class="fa-solid fa-phone" style={{ color: "blue" }}></i> Téléphone
          : [+222 43601553]
        </p>
        <p>
          <i class="fa-solid fa-envelope" style={{ color: "blue" }}></i> Email :
          [adresse_email@exemple.com]
        </p>
        <p>
          <i class="fa-solid fa-location-dot" style={{ color: "blue" }}></i>{" "}
          Adresse : [Votre adresse]
        </p>
      </div>
    </footer>
  );
};

export default Fotter;
