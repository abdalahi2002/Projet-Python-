// passwordfield.js
import React, { useState } from 'react';

function PasswordField({ label, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={label.toLowerCase()} className="mb-1">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={label.toLowerCase()} // Utiliser le libellé comme identifiant pour le champ de mot de passe
          name={label.toLowerCase()} // Utiliser le libellé comme nom pour le champ de mot de passe
          value={value}
          onChange={onChange}
          required
          className="px-3 py-2 border rounded-md text-left" // Aligner toujours le texte à droite
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 px-3 py-2"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}

export default PasswordField;
