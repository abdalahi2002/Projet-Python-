import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../session";

const Login = () => {
  let { loginUser } = useContext(AuthContext);
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-3xl font-semibold mb-6 text-center">Connexion</h2>
        <form onSubmit={loginUser}>
          <div className="mb-4">
            <label
              for="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full border rounded-lg shadow-sm px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Entrez votre email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              className="w-full border rounded-lg shadow-sm px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Entrez votre mot de passe"
              
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Connexion
            </button>
          </div>
          <div className="text-center">
            <p className="text-gray-700">Vous n'avez pas de compte ?</p>
            <Link to="/register" className="text-blue-500 hover:text-blue-800">
              Créer un compte
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

// function Login() {
//   let {loginUser} = useContext(AuthContext)

//   return (
// <div>
//   <form onSubmit={loginUser}>
//     <input type="email" name="email" placeholder="Enter Username" />
//     <input type="text" name="password" placeholder="Enter Password" />
//     <input type="submit" />
//   </form>
// </div>
//   );
// }

// export default Login;
