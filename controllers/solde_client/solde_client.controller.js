const Clients = require("../../models/clients/clients.model");

SoldeClient = require("../../models/solde_client/solde_client.model");

class SoldeClientController {
  static getByIdClient = (req, res) => {
    const id_client = req.params.id_client;

    Clients.getById(id_client, (client_error, client) => {
      if (client_error) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la recherche du client",
        });
      }
      if (!client) {
        return res
          .status(404)
          .json({ status: 404, error: "Client non trouvé" });
      }
      SoldeClient.getByIdClient(id_client, (soldeClientError, soldeClient) => {
        if (soldeClientError) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la récupéraition du solde du client",
          });
        }
        return res.status(200).json(soldeClient);
      });
    });
  };
}

module.exports = SoldeClientController;
