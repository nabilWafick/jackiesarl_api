const PaiementClient = require("../../models/paiement_client/paiement_client.model");
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

class PaiementClientController {
  // Créer un nouveau paiement client
  static create = (req, res) => {
    const paiementClientDataf = req.body;
    const file = req.file;
    console.log("paiementClientDataf", paiementClientDataf);
    console.log("file", file);
    const paiementClientData = {
      ...paiementClientDataf,
      bordereau: file ? file.path : "",
    };
    console.log("paiementClientData", paiementClientData);
    PaiementClient.create(paiementClientData, (error, paiementClient) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la création du paiement client",
        });
      }
      return res
        .status(201)
        .json({ status: 201, paiementClient: paiementClient });
    });
  };

  // Récupérer un paiement client par ID
  static getById = (req, res) => {
    const id = req.params.id;
    PaiementClient.getById(id, (error, paiementClient) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération du paiement client" });
      }
      if (!paiementClient) {
        return res.status(404).json({ error: "Paiement client non trouvé" });
      }
      return res.status(200).json(paiementClient);
    });
  };

  static getAll = (req, res) => {
    PaiementClient.getAll((error, paiementClients) => {
      if (error) {
        return res.status(500).json({
          error: "Erreur lors de la récupération des paiements clients",
        });
      }
      return res.status(200).json(paiementClients);
    });
  };

  static getAllOfClient = (req, res) => {
    const id_client = req.params.id_client;
    PaiementClient.getAllOfClient(id_client, (error, paiementsClient) => {
      if (error) {
        return res.status(500).json({
          error: "Erreur lors de la récupération des paiements du client",
        });
      }
      return res.status(200).json(paiementsClient);
    });
  };

  // Mettre à jour un paiement client par ID
  static update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    PaiementClient.getById(id, (getError, existingPaiementClient) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération du paiement client",
        });
      }
      if (!existingPaiementClient) {
        return res
          .status(404)
          .json({ status: 404, error: "Paiement client non trouvé" });
      }
      existingPaiementClient = { ...existingPaiementClient, ...updatedData };

      const file = req.file;
      console.log("existingPaiementClient", existingPaiementClient);
      console.log("file", file);
      if (file) {
        const lastSlip = existingPaiementClient.bordereau;
        existingPaiementClient = {
          ...existingPaiementClient,
          bordereau: file.path,
        };
        if (lastSlip != "") {
          deleteFile(lastSlip);
        }
      }

      existingPaiementClient = new PaiementClient(
        existingPaiementClient.id,
        existingPaiementClient.montant,
        existingPaiementClient.banque,
        existingPaiementClient.reference,
        existingPaiementClient.categorie,
        existingPaiementClient.numero_bc,
        existingPaiementClient.bordereau,
        existingPaiementClient.est_valide,
        existingPaiementClient.id_client,
        existingPaiementClient.date_paiement
      );

      existingPaiementClient.update((updateError) => {
        if (updateError) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la mise à jour du paiement client",
          });
        }
        return res
          .status(200)
          .json({ status: 200, paiementClients: existingPaiementClient });
      });
    });
  };

  // Supprimer un paiement client par ID
  static delete = (req, res) => {
    const id = req.params.id;
    PaiementClient.getById(id, (getError, existingPaiementClient) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération du paiement client",
        });
      }
      if (!existingPaiementClient) {
        return res
          .status(404)
          .json({ status: 404, error: "Paiement client non trouvé" });
      }

      existingPaiementClient.delete((deleteError, id) => {
        if (!id) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la suppression du paiement client",
          });
        }
        deleteFile(existingPaiementClient.bordereau);
        return res.status(204).json({ status: 204, id: id });
      });
    });
  };
}

module.exports = PaiementClientController;
