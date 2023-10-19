const AchatEntreprise = require("../../models/achat_entreprise/achat_entreprise.model");
const fs = require("fs");

deleteFile = (file) => {
  fs.unlink(file, (error) => {
    if (error) {
      console.error("Erreur de la suppression du fichier :", error);
    } else {
      console.log("Fichier supprimé avec succès");
    }
  });
};
class AchatEntrepriseController {
  // Créer un nouvel achat entreprise
  static create = (req, res) => {
    const achatEntrepriseDataf = req.body;
    const file = req.file;
    console.log("achatEntrepriseDataf", achatEntrepriseDataf);
    console.log("file", file);
    const achatEntrepriseData = {
      ...achatEntrepriseDataf,
      bordereau: file ? file.path : "",
    };
    console.log("achatEntrepriseData", achatEntrepriseData);
    AchatEntreprise.create(achatEntrepriseData, (error, achatEntreprise) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la création de l'achat entreprise",
        });
      }
      return res.status(201).json({ status: 201, achatEntreprise });
    });
  };

  // Récupérer un achat entreprise par ID
  static getByBonCommande = (req, res) => {
    const bonCommande = req.params.bon_commande;
    AchatEntreprise.getByBonCommande(bonCommande, (error, achatEntreprise) => {
      if (error) {
        return res.status(500).json({
          error: "Erreur lors de la récupération de l'achat entreprise",
        });
      }
      if (!achatEntreprise) {
        return res.status(404).json({ error: "Achat entreprise non trouvé" });
      }
      return res.status(200).json(achatEntreprise);
    });
  };

  static getAll = (req, res) => {
    AchatEntreprise.getAll((error, achatsEntreprise) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération des achats entreprise",
        });
      }
      return res.status(200).json(achatsEntreprise);
    });
  };

  // Mettre à jour un achat entreprise par bon de commande
  static update = (req, res) => {
    const bonCommande = req.params.bon_commande;
    const updatedData = req.body;
    AchatEntreprise.getById(
      bonCommande,
      (getError, existingAchatEntreprise) => {
        if (getError) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la récupération de l'achat entreprise",
          });
        }
        if (!existingAchatEntreprise) {
          return res
            .status(404)
            .json({ status: 404, error: "Achat entreprise non trouvé" });
        }

        existingAchatEntreprise = {
          ...existingAchatEntreprise,
          ...updatedData,
        };

        const file = req.file;

        console.log("existingAchatEntreprise", existingAchatEntreprise);
        console.log("file", file);
        if (file) {
          const lastSlip = existingAchatEntreprise.bordereau;
          existingAchatEntreprise = {
            ...existingAchatEntreprise,
            bordereau: file.path,
          };
          if (lastSlip != "") {
            deleteFile(lastSlip);
          }
        }

        existingAchatEntreprise = new AchatEntreprise(
          existingAchatEntreprise.bon_commande,
          existingAchatEntreprise.quantite_achetee,
          existingAchatEntreprise.montant,
          existingAchatEntreprise.banque,
          existingAchatEntreprise.cheque,
          existingAchatEntreprise.bordereau,
          existingAchatEntreprise.date_achat
        );

        existingAchatEntreprise.update((updateError) => {
          if (updateError) {
            return res.status(500).json({
              status: 500,
              error: "Erreur lors de la mise à jour de l'achat entreprise",
            });
          }
          return res.status(200).json({ status: 200, existingAchatEntreprise });
        });
      }
    );
  };

  // Supprimer un achat entreprise par bon de commande
  static delete = (req, res) => {
    const bonCommande = req.params.bon_commande;
    AchatEntreprise.getById(
      bonCommande,
      (getError, existingAchatEntreprise) => {
        if (getError) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la récupération de l'achat entreprise",
          });
        }
        if (!existingAchatEntreprise) {
          return res
            .status(404)
            .json({ status: 404, error: "Achat entreprise non trouvé" });
        }
        existingAchatEntreprise.delete((deleteError, bon_commande) => {
          if (!bon_commande) {
            return res.status(500).json({
              status: 500,
              error: "Erreur lors de la suppression de l'achat entreprise",
            });
          }
          deleteFile(existingAchatEntreprise.bordereau);
          return res.status(204).json({ status: 204, bon_commande });
        });
      }
    );
  };
}

module.exports = AchatEntrepriseController;
