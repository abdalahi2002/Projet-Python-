import React, { useState, useEffect } from "react";
//import { useSession } from "../session";
import { Link, useNavigate } from "react-router-dom";

function SignUphtmlForm() {
  const navigate = useNavigate();
  const [wilayas, setWilayas] = useState([]);
  const [sangs, setSangs] = useState([]);
  const [htmlFormData, sethtmlFormData] = useState({
    first_name: "",
    last_name: "",
    date_naissance: "",
    tel: "",
    email: "",
    wilaya: "",
    type_sang: "",
    password: "",
    password_confirm: "",
  });

  useEffect(() => {
    fetchWilayas();
    fetchSangs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    sethtmlFormData({
      ...htmlFormData,
      [name]: value,
    });
  };
  const fetchSangs = async () => {
    const response = await fetch("http://127.0.0.1:8000/sang/");
    const data = await response.json();
    setSangs(data);
  };

  const fetchWilayas = async () => {
    const response = await fetch("http://127.0.0.1:8000/wilaya/");
    const data = await response.json();
    setWilayas(data);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[2-4]\d{7}$/;
    return phoneRegex.test(phone);
  };

  const validateDateOfBirth = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des champs
    const isEmailValid = validateEmail(htmlFormData.email);
    const isPhoneValid = validatePhone(htmlFormData.tel);
    const age = validateDateOfBirth(htmlFormData.date_naissance);
    const isValidAge = age > 18;

    // Vérifier si tous les champs sont valides
    if (!isEmailValid || !isPhoneValid || !isValidAge) {
      // Afficher un message d'erreur à l'utilisateur
      console.error(
        "Veuillez vérifier les champs d'email, de téléphone et de date de naissance."
      );
      alert(
        "Veuillez vérifier les champs d'email, de téléphone et de date de naissance."
      );
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(htmlFormData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          errorMessage || "Une erreur s'est produite lors de l'inscription."
        );
      }

      navigate("/", { replace: true });
      console.log("Utilisateur inscrit avec succès.");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error.message);
    }
  };

  return (
    <div className="w-3/4 mx-auto">
      <div>
        <h2 className="text-xl font-bold mb-4">Inscription</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-row justify-between space-x-[2rem]">
            <div className="flex flex-col w-[70%]">
              <label htmlFor="first_name" className="mb-1">
                Prénom
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={htmlFormData.first_name}
                onChange={handleChange}
                required
                className="px-3 py-2 border rounded-md w-full"
              />
            </div>

            <div className="flex flex-col w-[70%]">
              {" "}
              <label htmlFor="last_name" className="mb-1">
                Nom de famille
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={htmlFormData.last_name}
                onChange={handleChange}
                required
                className="px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between space-x-[2rem]">
            <div className="flex flex-col w-[70%]">
              <label htmlFor="date_naissance" className="mb-1">
                Date de Naissance
              </label>
              <input
                type="Date"
                id="date_naissance"
                name="date_naissance"
                value={htmlFormData.date_naissance}
                onChange={handleChange}
                required
                className="px-3 py-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col w-[70%]">
              <label htmlFor="tel" className="mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                id="tel"
                name="tel"
                value={htmlFormData.tel}
                onChange={handleChange}
                required
                className="px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between space-x-[2rem]">
            <div className="flex flex-col w-[70%]">
              <label htmlFor="email" className="mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={htmlFormData.email}
                onChange={handleChange}
                required
                className="px-3 py-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col w-[70%]">
              <label htmlFor="wilaya" className="mb-1">
                Wilaya
              </label>
              <select
                id="wilaya"
                name="wilaya"
                required
                value={htmlFormData.wilaya}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option value=""> </option>
                {wilayas.map((wilaya) => (
                  <option key={wilaya.id} value={wilaya.nom}>
                    {wilaya.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-[70%]">
              <label htmlFor="type_sang" className="mb-1">
                Type de sang
              </label>
              <select
                id="type_sang"
                name="type_sang"
                required
                value={htmlFormData.type_sang}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option value=""> </option>
                {sangs.map((sang) => (
                  <option key={sang.id} value={sang.nom}>
                    {sang.nom}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-row justify-between space-x-[2rem]">
            <div className="flex flex-col w-[50%]">
              <label htmlFor="password" className="mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={htmlFormData.password}
                onChange={handleChange}
                required
                className="px-3 py-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col w-[50%]">
              <label htmlFor="password_confirm" className="mb-1">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="password_confirm"
                name="password_confirm"
                value={htmlFormData.password_confirm}
                onChange={handleChange}
                required
                className="px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              S'inscrire
            </button>
            <button className="text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">
              <Link to="/">Annuler</Link>
            </button>
            <Link />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUphtmlForm;
