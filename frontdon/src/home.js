import React, { useState, useEffect } from "react";
function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const steps = [
    {
      image:require("C:/Users/Lenovo/Desktop/frontend/frontdon/src/Asseste/1.jpg"),
      title: "Étape 1 : Inscription et questionnaire médical.",
      description: "Explication de l'étape 1 : Ici, le donneur s'inscrit et remplit un questionnaire médical pour s'assurer qu'il est éligible au don de sang.",
    },
    {
      image: require("C:/Users/Lenovo/Desktop/frontend/frontdon/src/Asseste/2.jpg"),
      title: "Étape 2 : Entretien confidentiel avec un professionnel de santé.",
     description: "Explication de l'étape 2 : Le donneur a un entretien confidentiel avec un professionnel de santé pour discuter de son état de santé et de son historique médical.",

    },
    {
      image: require("C:/Users/Lenovo/Desktop/frontend/frontdon/src/Asseste/3.jpg"),
      title: "Étape 3 : Prise de tension artérielle, pouls et test d'hémoglobine.",
     description: "Explication de l'étape 3 : Le donneur subit plusieurs tests, y compris la prise de tension artérielle, la vérification du pouls et le test d'hémoglobine pour garantir sa sécurité pendant le don.",
    },
    {
      image: require("C:/Users/Lenovo/Desktop/frontend/frontdon/src/Asseste/4.jpg"),
      title: "Étape 4 : Don de sang.",
      description: "Explication de l'étape 4 : Le donneur effectue le don de sang proprement dit, où une unité de sang est prélevée pour être utilisée dans des transfusions ou d'autres procédures médicales.",
    },
    {
      image: require("C:/Users/Lenovo/Desktop/frontend/frontdon/src/Asseste/5.jpg"),
      title: "Étape 5 : Repos et collation après le don.",
      description: "Explication de l'étape 5 : Après avoir donné son sang, le donneur est invité à se reposer et à prendre une collation pour récupérer ses forces.",
    }
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

    <div  className="w-3/4 mx-auto">
      <h1 className="title" >
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

      {/* Footer */}
      {/* <footer className="mt-8 bg-gray-200 p-4 text-center w-full">
      <div className="flex justify-center items-center">
       
        <img src= {require("C:/Users/Lenovo/Desktop/frontend/frontdon/src/Asseste/bn.jpg")} className="h-8 mr-2" alt="Banque de don du sang" />

        
        <p className="mr-4">La Banque de Don de Sang travaille pour sauver des vies en collectant et distribuant du sang aux personnes dans le besoin.</p>
    </div>

    
    <div className="mt-4">
     <p>Contactez-nous :</p>
     <p><i class="fa-solid fa-phone" style={{color:"blue"}}></i>  Téléphone : [+xx-xxx-xxxxxxx]</p>
     <p><i class="fa-solid fa-envelope" style={{color:"blue"}}></i>  Email : [adresse_email@exemple.com]</p>
     <p ><i class="fa-solid fa-location-dot" style={{color:"blue"}}></i>  Adresse : [Votre adresse]
     </p>
   </div>
      </footer> */}
    </div>

  );
}

export default Home;

// import React, { useState, useEffect } from "react";
//
// function Home() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const images = [
//     "https://tecdn.b-cdn.net/img/new/standard/city/047.jpg",
//     "https://mdbootstrap.com//img/Photos/Square/1.jpg",
//     "https://tecdn.b-cdn.net/img/new/standard/city/044.jpg"
//   ];
//
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 30000);
//
//     return () => clearInterval(interval);
//   }, []);
//
//   return (
//     <div className="w-3/4 mx-auto">
//       <h1 className="text-3xl font-bold text-center mt-8">
//         Bienvenue sur notre site
//       </h1>
//
//       {/* Première partie */}
//       <div className="mt-8 grid grid-cols-3 gap-4">
//         {images.slice(0, 3).map((image, index) => (
//           <div key={index} className="flex flex-col items-center">
//             <img
//               src={images[currentImageIndex]}
//               className="h-auto max-w-full rounded-lg"
//               alt=""
//             />
//             <p className="mt-4">
//               Description de l'image {index + 1} de la première partie.
//             </p>
//           </div>
//         ))}
//       </div>
//
//       {/* Deuxième partie */}
//       <div className="mt-8 grid grid-cols-3 gap-4">
//         {images.slice(3, 6).map((image, index) => (
//           <div key={index} className="flex flex-col items-center">
//             <img
//               src={images[currentImageIndex]}
//               className="h-auto max-w-full rounded-lg"
//               alt=""
//             />
//             <p className="mt-4">
//               Description de l'image {index + 1} de la deuxième partie.
//             </p>
//           </div>
//         ))}
//       </div>
//
//       {/* Troisième partie */}
//       <div className="mt-8 grid grid-cols-3 gap-4">
//         {images.slice(6).map((image, index) => (
//           <div key={index} className="flex flex-col items-center">
//             <img
//               src={images[currentImageIndex]}
//               className="h-auto max-w-full rounded-lg"
//               alt=""
//             />
//             <p className="mt-4">
//               Description de l'image {index + 1} de la troisième partie.
//             </p>
//           </div>
//         ))}
//       </div>
//       {/* Quatrième partie */}
//       <div className="mt-8 grid grid-cols-3 gap-4">
//         {images.slice(0, 3).map((image, index) => (
//           <div key={index} className="flex flex-col items-center">
//             <img
//               src={images[currentImageIndex]}
//               className="h-auto max-w-full rounded-lg"
//               alt=""
//             />
//             <p className="mt-4">
//               Description de l'image {index + 1} de la première partie.
//             </p>
//           </div>
//         ))}
//       </div>
//
//       {/* Cinquième partie */}
//       <div className="mt-8 grid grid-cols-3 gap-4">
//         {images.slice(3, 6).map((image, index) => (
//           <div key={index} className="flex flex-col items-center">
//             <img
//               src={images[currentImageIndex]}
//               className="h-auto max-w-full rounded-lg"
//               alt=""
//             />
//             <p className="mt-4">
//               Description de l'image {index + 1} de la deuxième partie.
//             </p>
//           </div>
//         ))}
//       </div>
//
//       {/* sizieme partie */}
//       <div className="mt-8 grid grid-cols-3 gap-4">
//         {images.slice(6).map((image, index) => (
//           <div key={index} className="flex flex-col items-center">
//             <img
//               src={images[currentImageIndex]}
//               className="h-auto max-w-full rounded-lg"
//               alt=""
//             />
//             <p className="mt-4">
//               Description de l'image {index + 1} de la troisième partie.
//             </p>
//           </div>
//         ))}
//       </div>
//
//
//       {/* Footer */}
//       <footer className="mt-8 bg-gray-200 p-4 text-center">
//         <p>Ceci est le footer de la page.</p>
//       </footer>
//     </div>
//   );
// }
//
// export default Home;


// function Home() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const images = [
//     "https://tecdn.b-cdn.net/img/new/standard/city/047.jpg",
//     "https://mdbootstrap.com//img/Photos/Square/1.jpg",
//     "https://tecdn.b-cdn.net/img/new/standard/city/044.jpg"
//   ];
//
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 30000);
//
//     return () => clearInterval(interval);
//   }, []);
//
//   return (
//     <div className="w-3/4 mx-auto">
//       <h1 className="text-3xl font-bold text-center mt-8">
//         Bienvenue sur notre site
//       </h1>
//       <div className="mt-8">
//         <h2 className="text-xl font-semibold mb-4">
//           L'importance du don de sang
//         </h2>
//         <p>
//           Le don de sang est un acte altruiste qui peut sauver des vies. Chaque
//           année, des milliers de personnes ont besoin de transfusions sanguines
//           pour survivre à des maladies graves, des accidents ou des
//           interventions chirurgicales. En donnant votre sang, vous pouvez
//           contribuer à fournir aux patients le sang dont ils ont besoin pour
//           guérir.
//         </p>
//         <p className="mt-4">
//           Le don de sang est sûr et simple. Il ne prend que quelques minutes et
//           peut faire une énorme différence dans la vie de quelqu'un. Si vous
//           êtes en bonne santé et remplissez les critères pour donner du sang,
//           envisagez de donner régulièrement. Votre contribution peut vraiment
//           sauver des vies.
//         </p>
//       </div>
//       <div className="mb-4">
//         <img
//           src={images[currentImageIndex]}
//           className="h-auto max-w-full rounded-lg"
//           alt=""
//         />
//       </div>
//     </div>
//   );
// }
//export default Home;
