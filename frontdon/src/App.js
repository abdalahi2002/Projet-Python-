import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Table/navbar";
import Login from "./Table/login";
import { AuthProvider } from "./session"; // Import du SessionProvider
import "./App.css";
import Home from "./Table/home";
import PrivateRoute from "./requireauth";
import RegisterForm from "./Table/register";
import UserProfile from "./Table/profile";
import FormulaireDepistage from "./Table/testdon";
import Table from "./Table/tabledon";
import NavBar2 from "./Table/NavBar2";
import Prof from "./Table/pr";
import Fotter from "./Table/fotter";
import UpdatePasswordForm from "./Table/modifierpassword";
function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar2/>
        <div>
          <div className="mt-20"></div>
          <Routes>
            {/* <Route path="/wilaya" element={<PrivateRoute><Wilaya /></PrivateRoute>} /> */}
            <Route path="/pr" element={<PrivateRoute><Prof/></PrivateRoute>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            
            <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
            <Route path="/test" element={<PrivateRoute><FormulaireDepistage /></PrivateRoute>} />
            <Route path="/don" element={<PrivateRoute><Table/></PrivateRoute>}  />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/updpass" element={<PrivateRoute><UpdatePasswordForm/></PrivateRoute>}/>
          </Routes>
        </div>
        <Fotter/>
      </AuthProvider>
      
    </Router>
  );
}

export default App;
