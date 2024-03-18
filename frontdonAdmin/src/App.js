import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Table/login";
import { AuthProvider } from "./session"; // Import du SessionProvider
import "./App.css";

import PrivateRoute from "./requireauth";
import RegisterForm from "./Table/register";
import FormulaireDepistage from "./Table/testdon";
import Table from "./Table/donateur";
import NavBar2 from "./Table/NavBar2";
import Dashboord from "./Table/Dashboord";
import Layout from "./Table/layout";
import Profile from "./Table/pr";
import AjouterDon from "./Table/ajouterdonateur";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/don"
              element={
                <PrivateRoute>
                  <Table />
                </PrivateRoute>
              }
            />
            <Route
              path="/register"
              element={
                
                  <RegisterForm />
                
              }
            />
            <Route
              path="/pr/:id"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/test/:objet"
              element={
                <PrivateRoute>
                  <FormulaireDepistage />
                </PrivateRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboord />
                </PrivateRoute>
              }
            />
            <Route
              path="/adddon"
              element={
                <PrivateRoute>
                  <AjouterDon />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
