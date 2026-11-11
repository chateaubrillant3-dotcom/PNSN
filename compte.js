// Les comptes de départ, pour tester
let COMPTES_DE_TEST = [
  { identifiant: "0340000001", motDePasse: "patient123", nom: "Rakoto Jean", role: "patient" },
  { identifiant: "0340000010", motDePasse: "medecin123", nom: "Dr Rasoamanana", role: "medecin" }
];

// Lit la liste des comptes (et la crée la première fois)
function lireComptes() {
  let texte = localStorage.getItem("comptes");

  if (texte === null) {
    localStorage.setItem("comptes", JSON.stringify(COMPTES_DE_TEST));
    return COMPTES_DE_TEST;
  }

  return JSON.parse(texte);
}

// Enregistre la liste des comptes
function enregistrerComptes(liste) {
  localStorage.setItem("comptes", JSON.stringify(liste));
}