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


// import React,{useContext} from 'react';
// import { useNavigate,Link } from 'react-router-dom';
// import AuthContext from '../session';

// function Navbar() {
//   let {user,logout} = useContext(AuthContext);
  

//   return (
//     <nav className="bg-white text-black-800 p-4 flex justify-between items-center fixed top-0 w-full">
//       <div>
//         <Link to="#" className="text-xl font-bold">Mon Application</Link>
//       </div>
//       <div className="flex items-center">
//         <Link to="/" className="mr-4">Home</Link>
        
//         {!user && (
//           <Link to="/login" className="mr-4">Login</Link>
//         )}
//         {!user && (
//           <Link to="/register" className="mr-4">Register</Link>
//         )}
//         {user && (
//           <button className="mr-4 flex items-center text-black" onClick={logout}>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1.5 11a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v1zm-5-4a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-7z" clipRule="evenodd" />
//             </svg>
//             Déconnexion
//           </button>
//         )}
//         {user && (
//           <Link to="/wilaya" className="mr-4">Wilaya</Link>
//         )}
//         {user && (
//           <Link to="/profile" className="mr-4">Profil</Link>
//         )}
//         {user && (
//           <Link to="/test" className="mr-4">test</Link>
//         )}
//       </div>
//     </nav>
    
//   );
// }

// export default Navbar;
