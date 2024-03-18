import React, { useState ,useContext} from "react";
import AuthContext from '../session';

function FormulaireDepistage() {
  let {authTokens} = useContext(AuthContext);
  const [reponses, setReponses] = useState({
    fièvre: false,
    voyage: false,
    rapportsSexuels: false,
    transfusionSanguine: false,
    maladieInfectieuse: false,
    médicaments: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setReponses((prevReponses) => ({
      ...prevReponses,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Vérifier si toutes les réponses sont true
      const toutesVraies = Object.values(reponses).every(
        (reponse) => reponse === true
      );

      // Envoyer la requête avec le bon paramètre 'test'
      const acces = "Bearer " + String(authTokens.token);
      const response = await fetch("http://127.0.0.1:8000/test/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: acces,
        },
        body: JSON.stringify({ test: toutesVraies }),
      });

      const data = await response.json();
      if (response.ok) {
        if (toutesVraies) {
          alert("Vous pouvez donner votre sang maintenant !");
          // Redirection vers "/"
          window.location.href = "/";
        } else {
          alert(
            "Vous ne pouvez pas donner votre sang pour le moment. Merci d'essayer plus tard."
          );
          window.location.href = "/";
        }
      } else {
        console.error("Erreur lors de la demande :", data);
        alert(
          "Une erreur est survenue lors de la demande. Veuillez réessayer."
        );
      }
    } catch (error) {
      console.error("Erreur inattendue :", error);
      alert("Une erreur inattendue est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4">Formulaire de Dépistage</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <QuestionCheckbox
          label="N'avez-vous pas eu de fièvre au cours des deux dernières semaines ?"
          name="fièvre"
          checked={reponses.fièvre}
          onChange={handleChange}
        />
        <QuestionCheckbox
          label="N'avez-vous pas voyagé dans une zone touchée par une maladie infectieuse au cours du dernier mois ?"
          name="voyage"
          checked={reponses.voyage}
          onChange={handleChange}
        />
        <QuestionCheckbox
          label="N'avez-vous pas eu des rapports sexuels non protégés avec un nouveau partenaire au cours des trois derniers mois ?"
          name="rapportsSexuels"
          checked={reponses.rapportsSexuels}
          onChange={handleChange}
        />
        <QuestionCheckbox
          label="N'avez-vous jamais eu une transfusion sanguine ou reçu des produits sanguins au cours de votre vie ?"
          name="transfusionSanguine"
          checked={reponses.transfusionSanguine}
          onChange={handleChange}
        />
        <QuestionCheckbox
          label="N'avez-vous jamais été diagnostiqué avec une maladie infectieuse transmissible par le sang, telle que le VIH ou l'hépatite ?"
          name="maladieInfectieuse"
          checked={reponses.maladieInfectieuse}
          onChange={handleChange}
        />
        <QuestionCheckbox
          label="N'utilisez-vous pas actuellement des médicaments qui pourraient affecter la qualité de votre sang ?"
          name="médicaments"
          checked={reponses.médicaments}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}

function QuestionCheckbox({ label, name, checked, onChange }) {
  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      <span>{label}</span>
    </label>
  );
}

export default FormulaireDepistage;
