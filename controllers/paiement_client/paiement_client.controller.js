const PaiementClient = require("../../models/paiement_client/paiement_client.model");

class PaiementClientController {
  // Créer un nouveau paiement client
  static create = (req, res) => {
    const paiementClientData = req.body;
    PaiementClient.create(paiementClientData, (error, paiementClient) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la création du paiement client" });
      }
      return res.status(201).json(paiementClient);
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
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération du paiement client" });
      }
      if (!existingPaiementClient) {
        return res.status(404).json({ error: "Paiement client non trouvé" });
      }
      existingPaiementClient = { ...existingPaiementClient, ...updatedData };
      existingPaiementClient.update((updateError) => {
        if (updateError) {
          return res.status(500).json({
            error: "Erreur lors de la mise à jour du paiement client",
          });
        }
        return res.status(200).json(existingPaiementClient);
      });
    });
  };

  // Supprimer un paiement client par ID
  static delete = (req, res) => {
    const id = req.params.id;
    PaiementClient.getById(id, (getError, existingPaiementClient) => {
      if (getError) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération du paiement client" });
      }
      if (!existingPaiementClient) {
        return res.status(404).json({ error: "Paiement client non trouvé" });
      }
      existingPaiementClient.delete((deleteError) => {
        if (deleteError) {
          return res.status(500).json({
            error: "Erreur lors de la suppression du paiement client",
          });
        }
        return res.status(204).end();
      });
    });
  };
}

module.exports = PaiementClientController;
