import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../session";
import { Link } from "react-router-dom";

function Table() {
  let { Tokens, logout } = useContext(AuthContext);
  const [donateurs, setDonateurs] = useState([]);
  const [wilayas, setWilayas] = useState([]);
  const [sangs, setSangs] = useState([]);
  const [filtreTypeSang, setFiltreTypeSang] = useState("");
  const [filtreWilaya, setFiltreWilaya] = useState("");
  const [filtreTelephone, setFiltreTelephone] = useState("");

  useEffect(() => {
    fetchWilayas();
    fetchSangs();
    fetchDonateurs();
  }, []);

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

  const fetchDonateurs = async () => {
    const acces = "Bearer " + String(Tokens.token);

    const response = await fetch("http://127.0.0.1:8000/don/", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    if (response.status === 200) {
      setDonateurs(data);
    } else {
      logout();
    }
  };

  const filterDonateurs = () => {
    if (!Array.isArray(donateurs)) {
      return [];
    }

    let filteredDonateurs = [...donateurs];
    if (filtreTypeSang) {
      filteredDonateurs = filteredDonateurs.filter(
        (donateur) => donateur.type_sang === filtreTypeSang
      );
    }
    if (filtreWilaya) {
      filteredDonateurs = filteredDonateurs.filter(
        (donateur) => donateur.wilaya === filtreWilaya
      );
    }
    if (filtreTelephone) {
      filteredDonateurs = filteredDonateurs.filter((donateur) =>
        donateur.tel.includes(filtreTelephone)
      );
    }
    return filteredDonateurs;
  };

  return (
    <section className="py-1 bg-blueGray-50">
      <h3 className="flex items-center text-3xl font-extrabold m-7">
        Les Donateurs
      </h3>
      <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 -lg rounded ">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  Filtrer Les Donateurs Par :
                </h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <div className="flex justify-between">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <input
                      type="text"
                      placeholder="téléphone"
                      value={filtreTelephone}
                      onChange={(event) =>
                        setFiltreTelephone(event.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    {/* <label
                      for="sang"
                      class="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Recherche par Type de sang
                    </label> */}
                    <select
                      id="sang"
                      value={filtreTypeSang}
                      onChange={(event) =>
                        setFiltreTypeSang(event.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">Sang </option>
                      {sangs.map((sang) => (
                        <option key={sang.id} value={sang.nom}>
                          {sang.nom}
                        </option>
                      ))}
                      {/* Ajoutez d'autres options selon vos besoins */}
                    </select>
                  </div>
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    {/* <label
                      for="wilaya"
                      class="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Recherche par wilaya
                    </label> */}
                    <select
                      id="wilaya"
                      value={filtreWilaya}
                      onChange={(event) => setFiltreWilaya(event.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">Wilayas</option>
                      {wilayas.map((wilaya) => (
                        <option key={wilaya.id} value={wilaya.nom}>
                          {wilaya.nom}
                        </option>
                      ))}
                      {/* Ajoutez d'autres options selon vos besoins */}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 border-b border-blueGray-200 bg-white rounded-t">
            <br />
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Nom
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Date de Naissance
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Telephone
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Email
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Satatus
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Type de Sang
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Wilaya
                  </th>

                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filterDonateurs().map((donateurs) => (
                  <tr key={donateurs.id_d}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {donateurs.first_name} {donateurs.last_name}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                      {donateurs.date_naissance}
                    </td>
                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {donateurs.tel}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      
                      {donateurs.email}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {donateurs.a_fait_don ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-black-800">
                        desactiver
                      </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-black-800">
                        activer
                      </span>
                      )}
                    </td>
                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {donateurs.wilaya}
                    </td>
                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {donateurs.type_sang}
                    </td>
                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <span>
                        <Link
                          className="inline-flex items-center px-1 py-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          to={`/pr/${donateurs.id_d}`}
                        >
                          {" "}
                          view
                          <svg
                            aria-hidden="true"
                            className="w-4 h-4 ml-2 -mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </Link>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Table;
