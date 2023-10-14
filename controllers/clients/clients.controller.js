const Clients = require("../../models/clients/clients.model");

class ClientsController {
  // Créer un nouveau client
  static create = (req, res) => {
    const clientData = req.body;
    if (clientData.email == "") {
      clientData.email = null;
    }
    console.log("Client Data", clientData);
    Clients.getAll((error, clients) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la création du client",
        });
      }
      const errors = {
        firstname: null,
        lastname: null,
        phoneNumber: null,
        ifuNumber: null,
        email: null,
      };

      // console.log("Founded Clients", clients);
      let exist = false;
      clients.forEach((client) => {
        if (
          clientData.prenoms == client.prenoms &&
          clientData.nom == client.nom
        ) {
          exist = true;
          errors.firstname = "Ce client existe dejà";
          errors.lastname = "Ce client existe dejà";
        }
        if (clientData.numero_telephone == client.numero_telephone) {
          exist = true;
          errors.phoneNumber = "Ce téléphone existe dejà";
        }
        if (clientData.numero_ifu == client.numero_ifu.toString()) {
          exist = true;
          errors.ifuNumber = "Ce numéro IFU existe dejà";
        }

        if (clientData.email == client.email && clientData.email != null) {
          exist = true;
          errors.email = "Cet email existe dejà";
        }
      });
      // console.log("errors", errors);
      if (exist) {
        //  console.log("Ce client existe dejà");
        //  console.log(errors);
        return res.status(400).json({ status: 400, errors: errors });
      }
      Clients.create(clientData, (error, client) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la création du client",
          });
        }
        return res.status(201).json({ status: 201, client: client });
      });
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
        console.log("User to update not found");
        return res.status(404).json({ error: "Client non trouvé" });
      }
      existingClient = { ...existingClient, ...updatedData };
      existingClient = new Clients(
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
