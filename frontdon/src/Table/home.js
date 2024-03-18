import React, { useState, useEffect } from "react";
function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const steps = [
    {
      image: require("C:/Users/hp/Desktop/frontend/frontdon/src/Asseste/1.jpg"),
      title: "Étape 1 : Inscription et questionnaire médical.",
      description:
        "Explication de l'étape 1 : Ici, le donneur s'inscrit et remplit un questionnaire médical pour s'assurer qu'il est éligible au don de sang.",
    },
    {
      image: require("C:/Users/hp/Desktop/frontend/frontdon/src/Asseste/2.jpg"),
      title: "Étape 2 : Entretien confidentiel avec un professionnel de santé.",
      description:
        "Explication de l'étape 2 : Le donneur a un entretien confidentiel avec un professionnel de santé pour discuter de son état de santé et de son historique médical.",
    },
    {
      image: require("C:/Users/hp/Desktop/frontend/frontdon/src/Asseste/3.jpg"),
      title:
        "Étape 3 : Prise de tension artérielle, pouls et test d'hémoglobine.",
      description:
        "Explication de l'étape 3 : Le donneur subit plusieurs tests, y compris la prise de tension artérielle, la vérification du pouls et le test d'hémoglobine pour garantir sa sécurité pendant le don.",
    },
    {
      image: require("C:/Users/hp/Desktop/frontend/frontdon/src/Asseste/4.jpg"),
      title: "Étape 4 : Don de sang.",
      description:
        "Explication de l'étape 4 : Le donneur effectue le don de sang proprement dit, où une unité de sang est prélevée pour être utilisée dans des transfusions ou d'autres procédures médicales.",
    },
    {
      image: require("C:/Users/hp/Desktop/frontend/frontdon/src/Asseste/5.jpg"),
      title: "Étape 5 : Repos et collation après le don.",
      description:
        "Explication de l'étape 5 : Après avoir donné son sang, le donneur est invité à se reposer et à prendre une collation pour récupérer ses forces.",
    },
    // Ajoutez plus d'étapes au besoin
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === steps.length - 1 ? 0 : prevIndex + 1
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-3/4 mx-auto">
      <h1 className="text-6xl font-bold text-center mt-8">
        Bienvenue sur notre site - Processus de don de sang
      </h1>

      {/* Étapes du processus de don de sang */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={step.image}
              className="h-auto max-w-full rounded-lg"
              alt={`Étape ${index + 1}`}
            />
            <h2 className="mt-4">{step.title}</h2>
            <p className="mt-4">{step.description}</p>
          </div>
        ))}
      </div>

      
    </div>
  );
}

export default Home;
