import express from "express";

const app = express();
const PORT = 4000;

// Une liste de médecins (plus tard, elle viendra de MySQL)
const medecins = [
  { id: 1, nom: "Dr Rasoamanana", specialite: "Pédiatrie", etablissement: "CHU Antananarivo", region: "Analamanga" },
  { id: 2, nom: "Dr Andrianina", specialite: "Cardiologie", etablissement: "Clinique Ravelo", region: "Analamanga" },
  { id: 3, nom: "Dr Razafy", specialite: "Médecine générale", etablissement: "CSB2 Ambositra", region: "Amoron'i Mania" }
];

// Route 1 : un message pour vérifier que le serveur répond
app.get("/", (req, res) => {
  res.send("Bonjour, le serveur SantéMada fonctionne !");
});

// Route 2 : la liste des médecins
app.get("/api/medecins", (req, res) => {
  res.json(medecins);
});

// Route 3 : un seul médecin, avec son id dans l'adresse
app.get("/api/medecins/:id", (req, res) => {
  const id = Number(req.params.id);
  const medecin = medecins.find((m) => m.id === id);

  if (medecin === undefined) {
    return res.status(404).json({ message: "Médecin introuvable" });
  }

  res.json(medecin);
});

app.listen(PORT, () => {
  console.log("Serveur lancé sur http://localhost:" + PORT);
});