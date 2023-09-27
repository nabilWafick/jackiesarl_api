const express = require('express');
const multer = require('multer');

const app = express();
const port = 3000;

// Configuration de multer pour spécifier où les fichiers seront stockés
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Dossier de destination pour les fichiers téléchargés
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nom du fichier sur le serveur
  },
});


const storage_second = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'chemin/vers/votre/dossier/personnalise/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  

const upload = multer({ storage });
//const upload = multer({ storage_second });

// Route POST pour gérer le téléchargement de fichiers
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Aucun fichier n\'a été téléchargé.' });
  }

  const fileUrl = `http://votre-serveur.com/${req.file.filename}`;
  return res.json({ message: 'Fichier téléchargé avec succès.', fileUrl });
});

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});

