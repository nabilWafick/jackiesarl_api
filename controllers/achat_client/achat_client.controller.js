const AchatClient = require("../../models/achat_client/achat_client.model");

class AchatClientController {
  // Créer un nouvel achat client
  static create = (req, res) => {
    const achatClientData = req.body;
    AchatClient.create(achatClientData, (error, achatClient) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la création de l'achat client" });
      }
      return res.status(201).json(achatClient);
    });
  };

  // Récupérer un achat client par ID
  static getById = (req, res) => {
    const id = req.params.id;
    AchatClient.getById(id, (error, achatClient) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de l'achat client" });
      }
      if (!achatClient) {
        return res.status(404).json({ error: "Achat client non trouvé" });
      }
      return res.status(200).json(achatClient);
    });
  };

  // Récupérer tous les achats clients
  static getAll = (req, res) => {
    AchatClient.getAll((error, achatsClients) => {
      if (error) {
        return res
          .status(500)
          .json({
            error: "Erreur lors de la récupération des achats des clients",
          });
      }
      return res.status(200).json(achatsClients);
    });
  };

  static getAllOfClient = (req, res) => {
    const id_client = req.params.id_client;
    AchatClient.getAllOfClient(id_client, (error, achatsClient) => {
      if (error) {
        return res
          .status(500)
          .json({
            error: "Erreur lors de la récupération des achats du client",
          });
      }
      return res.status(200).json(achatsClient);
    });
  };

  // Mettre à jour un achat client par ID
  static update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    AchatClient.getById(id, (getError, existingAchatClient) => {
      if (getError) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de l'achat client" });
      }
      if (!existingAchatClient) {
        return res.status(404).json({ error: "Achat client non trouvé" });
      }
      existingAchatClient = { ...existingAchatClient, ...updatedData };
      existingAchatClient.update((updateError) => {
        if (updateError) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la mise à jour de l'achat client" });
        }
        return res.status(200).json(existingAchatClient);
      });
    });
  };

  // Supprimer un achat client par ID
  static delete = (req, res) => {
    const id = req.params.id;
    AchatClient.getById(id, (getError, existingAchatClient) => {
      if (getError) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de l'achat client" });
      }
      if (!existingAchatClient) {
        return res.status(404).json({ error: "Achat client non trouvé" });
      }
      existingAchatClient.delete((deleteError) => {
        if (deleteError) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la suppression de l'achat client" });
        }
        getById;
        return res.status(204).end();
      });
    });
  };
}

module.exports = AchatClientController;
