// ============================================
// 1. LES ÉLÉMENTS DE LA PAGE
// (le tableau "medecins" vient de medecins.js)
// ============================================
let liste = document.getElementById("liste");
let message = document.getElementById("message");
let champ = document.getElementById("champ-recherche");
let choixRegion = document.getElementById("filtre-region");
let choixSpecialite = document.getElementById("filtre-specialite");
let formulaire = document.querySelector(".recherche");

// ============================================
// 2. AFFICHER UN TABLEAU DE MÉDECINS
// ============================================
function afficher(tableau) {
  liste.innerHTML = "";

  for (let m of tableau) {
    liste.innerHTML += `
      <article>
        <h3>${m.nom}</h3>
        <p>${m.specialite}</p>
        <p>${m.etablissement}, ${m.region}</p>
        <a href="rendez-vous.html?id=${m.id}">Prendre rendez-vous</a>
      </article>
    `;
  }

  if (tableau.length === 0) {
    message.textContent = "Aucun résultat.";
  } else {
    message.textContent = tableau.length + " résultat(s)";
  }
}

// ============================================
// 3. FILTRER SELON LES TROIS CONTRÔLES
// ============================================
function filtrer() {
  let texte = champ.value.toLowerCase();
  let region = choixRegion.value;
  let specialite = choixSpecialite.value;

  let resultat = medecins.filter(function (m) {
    let tout = (m.nom + " " + m.specialite + " " + m.etablissement + " " + m.region).toLowerCase();

    let okTexte = tout.includes(texte);
    let okRegion = region === "" || m.region === region;
    let okSpecialite = specialite === "" || m.specialite === specialite;

    return okTexte && okRegion && okSpecialite;
  });

  afficher(resultat);
}

// ============================================
// 4. LES ÉVÉNEMENTS
// ============================================
champ.addEventListener("input", filtrer);
choixRegion.addEventListener("change", filtrer);
choixSpecialite.addEventListener("change", filtrer);

formulaire.addEventListener("submit", function (event) {
  event.preventDefault();
});

// ============================================
// 5. AU CHARGEMENT : on affiche tout
// ============================================
afficher(medecins);