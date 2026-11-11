// ============================================
// 1. LES ÉLÉMENTS DE LA PAGE
// ============================================
let formulaire = document.getElementById("formulaire-connexion");
let champIdentifiant = document.getElementById("identifiant");
let champMdp = document.getElementById("mdp");
let zoneMessage = document.getElementById("zone-message");

// ============================================
// 2. UNE FONCTION POUR AFFICHER UN MESSAGE
// ============================================
function afficherMessage(texte, type) {
  zoneMessage.textContent = texte;
  zoneMessage.className = "message " + type;
}

// ============================================
// 3. QUAND ON ENVOIE LE FORMULAIRE
// ============================================
formulaire.addEventListener("submit", function (event) {
  event.preventDefault();

  let identifiant = champIdentifiant.value.trim().replaceAll(" ", "");
  let mdp = champMdp.value;

  if (identifiant === "" || mdp === "") {
    afficherMessage("Veuillez remplir tous les champs.", "erreur");
    return;
  }

  if (mdp.length < 6) {
    afficherMessage("Le mot de passe doit contenir au moins 6 caractères.", "erreur");
    return;
  }

  // On relit les comptes (y compris ceux créés par l'inscription)
  let comptes = lireComptes();

  let compte = comptes.find(function (c) {
    return c.identifiant === identifiant && c.motDePasse === mdp;
  });

  if (compte === undefined) {
    afficherMessage("Identifiant ou mot de passe incorrect.", "erreur");
    return;
  }

  localStorage.setItem("utilisateur", JSON.stringify({ nom: compte.nom, role: compte.role }));
  afficherMessage("Connexion réussie ! Redirection...", "succes");

  setTimeout(function () {
    window.location.href = "acceuil.html";
  }, 1000);
});