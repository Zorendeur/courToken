import { loginUser } from "../models/auth.model.js";

export async function login(req, res) {
  const { email, password } = req.body;

  const { data, error } = await loginUser(email, password);

  if (error) {
    return res.status(401).json({ message: error.message });
  }

  // Stocker le token dans la session côté serveur
  req.session.access_token = data.session.access_token;
  req.session.user = data.user;

  return res.json({
    message: "Connexion réussie",
    user: data.user
  });
}

export function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error("Erreur lors de la destruction de la session :", err);
      return res.status(500).json({ message: "Erreur lors de la déconnexion." });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Déconnexion réussie." });
  });
}

