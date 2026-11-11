// 1. On cherche le lien et on relit l'utilisateur mémorisé
let lienConnexion = document.getElementById("lien-connexion");
let utilisateur = JSON.parse(localStorage.getItem("utilisateur"));

// 2. Si quelqu'un est connecté, on change la barre du haut
if (utilisateur !== null) {
  // Le lien affiche le nom de la personne
  lienConnexion.textContent = utilisateur.nom;
  lienConnexion.href = "#";

  // On fabrique le lien "Se déconnecter"
  let lienDeconnexion = document.createElement("a");
  lienDeconnexion.textContent = "Se déconnecter";
  lienDeconnexion.href = "acceuil.html";

  // Au clic, on supprime la session
  lienDeconnexion.addEventListener("click", function () {
    localStorage.removeItem("utilisateur");
  });

  // On le place juste après le lien du nom
  lienConnexion.after(lienDeconnexion);
}