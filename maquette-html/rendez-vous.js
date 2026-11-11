// ============================================
// 1. LES ÉLÉMENTS DE LA PAGE
// (utilisateur vient de session.js, medecins vient de medecins.js)
// ============================================
let formulaire = document.getElementById("formulaire-rdv");
let champDate = document.getElementById("date");
let champMotif = document.getElementById("motif");
let zoneCreneaux = document.getElementById("creneaux");
let zoneMessage = document.getElementById("zone-message");
let nomMedecin = document.getElementById("nom-medecin");
let detailsMedecin = document.getElementById("details-medecin");

// ============================================
// 2. QUEL MÉDECIN ? On lit l'id dans l'adresse
// ============================================
let parametres = new URLSearchParams(window.location.search);
let idMedecin = Number(parametres.get("id"));

let medecin = medecins.find(function (m) {
  return m.id === idMedecin;
});

// ============================================
// 3. LES CRÉNEAUX : de 08:00 à 15:30, toutes les 30 minutes
// ============================================
let HEURES = [];
for (let h = 8; h < 16; h++) {
  let heure = String(h).padStart(2, "0");
  HEURES.push(heure + ":00");
  HEURES.push(heure + ":30");
}

let heureChoisie = "";
let aujourdhui = new Date().toLocaleDateString("en-CA");

// ============================================
// 4. LES RENDEZ-VOUS DÉJÀ ENREGISTRÉS
// ============================================
function lireRendezVous() {
  let texte = localStorage.getItem("rendezvous");

  if (texte === null) {
    return [];
  }

  return JSON.parse(texte);
}

// Les heures déjà prises pour ce médecin à cette date
function heuresPrises(date) {
  let tous = lireRendezVous();

  let ceuxDuJour = tous.filter(function (r) {
    return r.medecinId === idMedecin && r.date === date && r.statut !== "annule";
  });

  return ceuxDuJour.map(function (r) {
    return r.heure;
  });
}

// ============================================
// 5. AFFICHER UN MESSAGE
// ============================================
function afficherMessage(texte, type) {
  zoneMessage.textContent = texte;
  zoneMessage.className = "message " + type;
}

// ============================================
// 6. AFFICHER LES BOUTONS DE CRÉNEAUX
// ============================================
function afficherCreneaux() {
  zoneCreneaux.innerHTML = "";
  let prises = heuresPrises(champDate.value);

  for (let heure of HEURES) {
    let bouton = document.createElement("button");
    bouton.type = "button";
    bouton.textContent = heure;
    bouton.className = "creneau";

    if (prises.includes(heure)) {
      bouton.disabled = true;
    }

    if (heure === heureChoisie) {
      bouton.classList.add("actif");
    }

    bouton.addEventListener("click", function () {
      heureChoisie = heure;
      afficherCreneaux();
    });

    zoneCreneaux.appendChild(bouton);
  }
}

// ============================================
// 7. QUAND ON CHANGE LA DATE
// ============================================
champDate.addEventListener("change", function () {
  heureChoisie = "";
  zoneMessage.textContent = "";
  zoneMessage.className = "message";
  afficherCreneaux();
});

// ============================================
// 8. QUAND ON CONFIRME LE RENDEZ-VOUS
// ============================================
formulaire.addEventListener("submit", function (event) {
  event.preventDefault();

  let date = champDate.value;
  let motif = champMotif.value.trim();

  if (date === "") {
    afficherMessage("Choisissez une date.", "erreur");
    return;
  }

  if (date < aujourdhui) {
    afficherMessage("La date doit être aujourd'hui ou plus tard.", "erreur");
    return;
  }

  if (heureChoisie === "") {
    afficherMessage("Choisissez un créneau.", "erreur");
    return;
  }

  if (heuresPrises(date).includes(heureChoisie)) {
    afficherMessage("Ce créneau vient d'être pris. Choisissez-en un autre.", "erreur");
    afficherCreneaux();
    return;
  }

  // Tout est bon : on enregistre
  let rendezVous = lireRendezVous();

  rendezVous.push({
    id: Date.now(),
    medecinId: medecin.id,
    medecin: medecin.nom,
    patient: utilisateur.nom,
    date: date,
    heure: heureChoisie,
    motif: motif,
    statut: "en_attente"
  });

  localStorage.setItem("rendezvous", JSON.stringify(rendezVous));

  afficherMessage("Rendez-vous demandé pour le " + date + " à " + heureChoisie + ". Il est en attente de confirmation.", "succes");

  heureChoisie = "";
  champMotif.value = "";
  afficherCreneaux();
});

// ============================================
// 9. AU CHARGEMENT DE LA PAGE
// ============================================
if (medecin === undefined) {
  // Médecin introuvable
  formulaire.style.display = "none";
  nomMedecin.textContent = "Professionnel introuvable";
  afficherMessage("Aucun professionnel ne correspond à ce lien.", "erreur");
} else if (utilisateur === null) {
  // Personne n'est connecté
  nomMedecin.textContent = medecin.nom;
  detailsMedecin.textContent = medecin.specialite + " · " + medecin.etablissement + ", " + medecin.region;
  formulaire.style.display = "none";
  afficherMessage("Connectez-vous pour prendre rendez-vous.", "erreur");
} else {
  // Tout est bon : on prépare la page
  nomMedecin.textContent = medecin.nom;
  detailsMedecin.textContent = medecin.specialite + " · " + medecin.etablissement + ", " + medecin.region;

  champDate.min = aujourdhui;
  champDate.value = aujourdhui;
  afficherCreneaux();
}