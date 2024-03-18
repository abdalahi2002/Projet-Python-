import React, { useState,useContext } from 'react';
import AuthContext from '../session';
function UpdatePasswordForm() {
  const [passwords, setPasswords] = useState({ password: '', password_confirm: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  let {authTokens,logout} = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation des champs
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Requête vers l'API
    try {
        const acces = "Bearer " + String(authTokens.token);
        const response = await fetch("http://127.0.0.1:8000/user/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: acces,
          },
          body: JSON.stringify({
            password_confirm: passwords.password_confirm,
            password: passwords.password
          }),
        });
        const errorMessage = await response.text();
      if (!response.ok) {
        throw new Error(errorMessage ||'Erreur lors de la mise à jour du mot de passe.');
      }

      setSuccess("Mot de passe mis à jour avec succès.");
      setPasswords({  password: '', password_confirm: '' });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Nouveau mot de passe:
          <input type="password" name="password" value={passwords.password} onChange={handleChange} />
        </label>
        <label>
          Confirmer le nouveau mot de passe:
          <input type="password" name="password_confirm" value={passwords.password_confirm} onChange={handleChange} />
        </label>
        <button type="submit">Mettre à jour le mot de passe</button>
      </form>
    </div>
  );
}

export default UpdatePasswordForm;
