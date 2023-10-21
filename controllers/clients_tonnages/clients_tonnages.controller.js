const ClientsTonnages = require("../../models/clients_tonnages/clients_tonnages.model");

class ClientsTonnagesController {
  // Récupérer un client par ID
  static getByIdClient = (req, res) => {
    const id_client = req.params.id;
    ClientsTonnages.getByIdClient(id_client, (error, clientTonnages) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération du client" });
      }
      if (!clientTonnages) {
        return res.status(404).json({ error: "Tonnage client non trouvé" });
      }
      return res.status(200).json(clientTonnages);
    });
  };

  static getAll = (req, res) => {
    ClientsTonnages.getAll((error, clientsTonnages) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des clients" });
      }
      return res.status(200).json(clientsTonnages);
    });
  };
}

module.exports = ClientsTonnagesController;
