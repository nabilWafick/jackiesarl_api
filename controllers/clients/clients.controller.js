const Clients = require("../../models/clients/clients.model");

class ClientsController {
  // Créer un nouveau client
  static create = (req, res) => {
    const clientData = req.body;
    console.log("Sended data for new client");
    console.log(clientData);
    Clients.create(clientData, (error, client) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la création du client" });
      }
      return res.status(201).json(client);
    });
  };

  // Récupérer un client par ID
  static getById = (req, res) => {
    const id = req.params.id;
    Clients.getById(id, (error, client) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération du client" });
      }
      if (!client) {
        return res.status(404).json({ error: "Client non trouvé" });
      }
      return res.status(200).json(client);
    });
  };

  static getAll = (req, res) => {
    Clients.getAll((error, clients) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des clients" });
      }
      return res.status(200).json(clients);
    });
  };

  // Mettre à jour un client par ID
  static update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    console.log("Sended data for upadating client");
    console.log(updatedData);
    Clients.getById(id, (getError, existingClient) => {
      if (getError) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération du client" });
      }
      if (!existingClient) {
        console.log('User to uptodate found')
        return res.status(404).json({ error: "Client non trouvé" });
      }
      existingClient = { ...existingClient, ...updatedData };
      existingClient =new Clients(
        existingClient.id,
        existingClient.nom,
        existingClient.prenoms,
        existingClient.numero_ifu,
        existingClient.numero_telephone,
        existingClient.email,
        existingClient.date_ajout
      ); 
      existingClient.update((updateError) => {
        if (updateError) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la mise à jour du client" });
        }
        return res.status(200).json(existingClient);
      });
    });
  };

  // Supprimer un client par ID
  static delete = (req, res) => {
    const id = req.params.id;
    console.log();
    Clients.getById(id, (getError, existingClient) => {
      if (getError) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération du client" });
      }
      if (!existingClient) {
        return res.status(404).json({ error: "Client non trouvé" });
      }
      existingClient.delete((deleteError) => {
        if (deleteError) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la suppression du client" });
        }
        return res.status(204).end();
      });
    });
  };
}

module.exports = ClientsController;
