const Clients = require("../../models/clients/clients.model");
const Modifications = require("../../models/modifications/modifications.model");

class ClientsController {
  // Créer un nouveau client
  static create = (req, res) => {
    const clientData = req.body;
    if (clientData.email == "") {
      clientData.email = null;
    }

    Clients.getAll(undefined, undefined, (error, clients) => {
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
      if (exist == true) {
        return res.status(406).json({ status: 406, errors: errors });
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

  static getAllMatched = (req, res) => {
    const name = req.params.name;
    //console.log("searched name", name);
    Clients.getAllMatched(name, (error, clients) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des clients" });
      }
      return res.status(200).json(clients);
    });
  };

  static getAll = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Clients.getAll(startDate, endDate, (error, clients) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des clients" });
      }
      return res.status(200).json(clients);
    });
  };

  static getAllByAlphabeticalOrder = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Clients.getAllByAlphabeticalOrder(startDate, endDate, (error, clients) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des clients" });
      }
      return res.status(200).json(clients);
    });
  };

  static getAllFromOldToNew = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Clients.getAllFromOldToNew(startDate, endDate, (error, clients) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des clients" });
      }
      return res.status(200).json(clients);
    });
  };

  static getAllFromNewToOld = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Clients.getAllFromNewToOld(startDate, endDate, (error, clients) => {
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
    let previousData = {};
    let newData = {};
    Clients.getById(id, (getError, existingClient) => {
      if (getError) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération du client" });
      }
      if (!existingClient) {
        //   console.log("User to update not found");
        return res.status(404).json({ error: "Client non trouvé" });
      }

      previousData = existingClient;

      Clients.getAll(undefined, undefined, (getError, clients) => {
        if (getError) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la mise à jour du client",
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
            updatedData.prenoms == client.prenoms &&
            updatedData.nom == client.nom &&
            client.id != id
          ) {
            exist = true;
            errors.firstname = "Ce client existe dejà";
            errors.lastname = "Ce client existe dejà";
          }
          if (
            updatedData.numero_telephone == client.numero_telephone &&
            client.id != id
          ) {
            exist = true;
            errors.phoneNumber = "Ce téléphone existe dejà";
          }
          if (updatedData.numero_ifu == client.numero_ifu && client.id != id) {
            exist = true;
            errors.ifuNumber = "Ce numéro IFU existe dejà";
          }

          if (
            updatedData.email == client.email &&
            updatedData.email != null &&
            client.id != id
          ) {
            exist = true;
            errors.email = "Cet email existe dejà";
          }
        });

        if (exist == true) {
          return res.status(406).json({ status: 406, errors: errors });
        }

        existingClient = { ...existingClient, ...updatedData };

        newData = existingClient;

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
            return res.status(500).json({
              status: 500,
              error: "Erreur lors de la mise à jour du client",
            });
          }

          //   console.log("employee", req.employee);

          // =================== Add Modification ===================
          Modifications.create(
            {
              modification: `Modification des données d'un client`,
              details: `Anciennes données::
              Nom: ${previousData.nom},
              Prénoms: ${previousData.prenoms},
              Numéro IFU: ${previousData.numero_ifu},
              Numéro de téléphone: ${previousData.numero_telephone},
              Email: ${previousData.email} 
              a57aa2b90d9bbb0524e51b458577767ab2823507b877e9aedfd885bb12b5d7ed980dd63abad043be6beff172d6c47678d68a502778a617e57b3e7fd0b0952f47
              Nouvelles données:: Nom: ${newData.nom},
              Prénoms: ${newData.prenoms},
              Numéro IFU: ${newData.numero_ifu},
              Numéro de téléphone: ${newData.numero_telephone},
              Email: ${newData.email},`,
              id_employe: req.employee.id,
            },
            (error, modification) => {}
          );
          // =================== Add Modification ===================

          return res.status(200).json({ status: 200, client: existingClient });
        });
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
