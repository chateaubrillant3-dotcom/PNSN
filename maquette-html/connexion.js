// ============================================
// 1. LES COMPTES DE TEST (simulés pour l'instant)
// ============================================
let comptes = [
  { identifiant: "0340000001", motDePasse: "patient123", nom: "Rakoto Jean", role: "patient" },
  { identifiant: "0340000010", motDePasse: "medecin123", nom: "Dr Rasoamanana", role: "medecin" }
];

// ============================================
// 2. LES ÉLÉMENTS DE LA PAGE
// ============================================
let formulaire = document.getElementById("formulaire-connexion");
let champIdentifiant = document.getElementById("identifiant");
let champMdp = document.getElementById("mdp");
let zoneMessage = document.getElementById("zone-message");

// ============================================
// 3. UNE FONCTION POUR AFFICHER UN MESSAGE
// ============================================
function afficherMessage(texte, type) {
  zoneMessage.textContent = texte;
  zoneMessage.className = "message " + type;
}

// ============================================
// 4. QUAND ON ENVOIE LE FORMULAIRE
// ============================================
formulaire.addEventListener("submit", function (event) {
  event.preventDefault();

  // On lit les champs
  let identifiant = champIdentifiant.value.trim().replaceAll(" ", "");
  let mdp = champMdp.value;

  // Contrôle 1 : champs vides
  if (identifiant === "" || mdp === "") {
    afficherMessage("Veuillez remplir tous les champs.", "erreur");
    return;
  }

  // Contrôle 2 : longueur du mot de passe
  if (mdp.length < 6) {
    afficherMessage("Le mot de passe doit contenir au moins 6 caractères.", "erreur");
    return;
  }

  // Contrôle 3 : on cherche le compte
  let compte = comptes.find(function (c) {
    return c.identifiant === identifiant && c.motDePasse === mdp;
  });

  if (compte === undefined) {
    afficherMessage("Identifiant ou mot de passe incorrect.", "erreur");
    return;
  }

  // Tout est bon : on mémorise l'utilisateur et on redirige
  localStorage.setItem("utilisateur", JSON.stringify({ nom: compte.nom, role: compte.role }));
  afficherMessage("Connexion réussie ! Redirection...", "succes");

  setTimeout(function () {
    window.location.href = "acceuil.html";
  }, 1000);
});