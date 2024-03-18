import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let [Tokens, setTokens] = useState(() =>
    localStorage.getItem("Tokens")
      ? JSON.parse(localStorage.getItem("Tokens"))
      : null
  );
  let [refresh_token, Setrefresh_token] = useState(() =>
    localStorage.getItem("refresh_token")
      ? JSON.parse(localStorage.getItem("refresh_token"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("Tokens")
      ? jwtDecode(localStorage.getItem("Tokens"))
      : null
  );
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch("http://127.0.0.1:8000/loginadmin/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
      credentials: "include",
    });
    let data = await response.json();
    if (response.status === 200) {
      setTokens(data);
      Setrefresh_token(data.refresh_token)
      setUser(jwtDecode(data.access_token));
      localStorage.setItem("Tokens", JSON.stringify(data.access_token));
      localStorage.setItem("refresh_token", JSON.stringify(data.refresh_token));
      console.log("Token : ",Tokens);
      console.log("refresh : ",refresh_token);
      navigate("/");
    } else {
      alert(data.detail);
    }
  };

  let updateToken = async () => {
    
    let response = await fetch("http://127.0.0.1:8000/refresh_token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refresh_token }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setTokens(data);
      setUser(jwtDecode(data.token));
      localStorage.setItem("Tokens", JSON.stringify(data));
    } else {
      logout();
    }
  };
  console.log(refresh_token);
  let logout = () => {
    setTokens(null);
    setUser(null);
    localStorage.removeItem("Tokens");
    localStorage.removeItem("refresh_token"); // Supprimer également refresh_token lors de la déconnexion
    navigate("/login");
  };
  let contextData = {
    user: user,
    Tokens:Tokens,
    loginUser: loginUser,
    logout: logout,
  };
  
  // useEffect(() => {
  //   if (loading) {
  //     if(refresh_token){
  //       updateToken();
  //       setLoading(false);
  //     }else{
  //       logout();
  //     }
      
  //   }

  //   let interval = setInterval(() => {
  //     setLoading(true);
  //   }, 1000 * 60 * 4);
  //   return () => clearInterval(interval);
  // }, [refresh_token, loading]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;


// import React, { createContext, useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   let [Tokens, setTokens] = useState(() =>
//     localStorage.getItem("Tokens")
//       ? JSON.parse(localStorage.getItem("Tokens"))
//       : null
//   );
//   let [user, setUser] = useState(() =>
//     localStorage.getItem("Tokens")
//       ? jwtDecode(localStorage.getItem("Tokens"))
//       : null
//   );
//   const [lastLoginTime, setLastLoginTime] = useState(null);
//   let [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   let loginUser = async (e) => {
//     e.preventDefault();
//     let response = await fetch("http://127.0.0.1:8000/login/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: e.target.email.value,
//         password: e.target.password.value,
//       }),
//       credentials: "include",
//     });
//     let data = await response.json();
//     if (response.status === 200) {
//       setTokens(data);
//       setUser(jwtDecode(data.token));
//       localStorage.setItem("Tokens", JSON.stringify(data));
//       navigate("/");
//     } else {
//       alert("Somthing went wrong?");
//     }
//   };

//   let updateToken = async () => {
//     // if (!Tokens || !Tokens.refresh_token_token) {
//     //   // Ne rien faire si le token de rafraîchissement n'est pas défini
//     //   return;
//     // }
//     let response = await fetch("http://127.0.0.1:8000/refresh_token/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ refresh_token_token: Tokens?.refresh_token_token }),
//     });
//     let data = await response.json();
//     if (response.status === 200) {
//       setTokens(data);
//       setUser(jwtDecode(data.token));
//       localStorage.setItem("Tokens", JSON.stringify(data));
//       setLastLoginTime(Date.now());
//       localStorage.setItem("lastLoginTime", new Date().toISOString());
//     } else {
//       logout();
//     }
//   };
//   let logout = () => {
//     setTokens(null);
//     setUser(null);
//     localStorage.removeItem("Tokens");
//     navigate("/login");
//   };
//   let contextData = {
//     user: user,
//     Tokens: Tokens,
//     loginUser: loginUser,
//     logout: logout,
//   };

//   useEffect(() => {
//     const storedTime = localStorage.getItem("lastLoginTime");
//     if (loading && storedTime) {
//       const elapsedTime = Date.now() - new Date(storedTime).getTime();
//       const twoMinutes = 1000 * 60 * 2;
//       if (elapsedTime > twoMinutes) {
//         updateToken();
//       }
//     }
//   }, [Tokens, loading]);
//   // useEffect(() => {
//   //   if (loading) {
//   //     updateToken();
//   //   }

//   //   let fourMinutes = 1000 * 60 * 1;

//   //   let interval = setInterval(() => {
//   //     if (Tokens) {
//   //       updateToken();
//   //     }
//   //   }, fourMinutes);
//   //   return () => clearInterval(interval);
//   // }, [Tokens, loading]);

//   return (
//     <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthContext;
