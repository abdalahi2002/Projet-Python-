import React from "react";
import { differenceInYears } from "date-fns";

function AgeCalculator({ dateOfBirth }) {
  // Convertir la date de naissance en objet Date
  const birthDate = new Date(dateOfBirth);
  // Obtenir la date actuelle
  const currentDate = new Date();
  // Calculer l'âge en années
  const age = differenceInYears(currentDate, birthDate);

  return <span>{age} ans.</span>;
}

export default AgeCalculator;
