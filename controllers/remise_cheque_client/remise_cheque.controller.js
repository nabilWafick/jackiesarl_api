const RemiseChequeClient = require("../../models/remise_cheque_client/remise_cheque_client.model");
const Modifications = require("../../models/modifications/modifications.model");
const Clients = require("../../models/clients/clients.model");

class RemiseChequeClientController {
  // Créer une nouvelle remise de chèque client
  static create = (req, res) => {
    const remiseChequeClientData = req.body;
    RemiseChequeClient.create(
      remiseChequeClientData,
      (error, remiseChequeClient) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la création de la remise de chèque client",
          });
        }
        return res
          .status(201)
          .json({ status: 201, remiseChequeClient: remiseChequeClient });
      }
    );
  };

  // Récupérer une remise de chèque client par ID
  static getById = (req, res) => {
    const id = req.params.id;
    RemiseChequeClient.getById(id, (error, remiseChequeClient) => {
      if (error) {
        return res.status(500).json({
          error: "Erreur lors de la récupération de la remise de chèque client",
        });
      }
      if (!remiseChequeClient) {
        return res
          .status(404)
          .json({ error: "Remise de chèque client non trouvée" });
      }
      return res.status(200).json(remiseChequeClient);
    });
  };

  static getAll = (req, res) => {
    RemiseChequeClient.getAll((error, remisesChequeClient) => {
      if (error) {
        return res.status(500).json({
          error:
            "Erreur lors de la récupération des remises de chèques clients",
        });
      }
      return res.status(200).json(remisesChequeClient);
    });
  };

  static getAllOfClient = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    RemiseChequeClient.getAllOfClient(
      startDate,
      endDate,
      id_client,
      (error, remisesChequesClient) => {
        if (error) {
          return res.status(500).json({
            error:
              "Erreur lors de la récupération des remises de cheques du client",
          });
        }
        return res.status(200).json(remisesChequesClient);
      }
    );
  };

  static getAllOfClientFromOldToNew = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    RemiseChequeClient.getAllOfClientFromOldToNew(
      startDate,
      endDate,
      id_client,
      (error, remisesChequesClient) => {
        if (error) {
          return res.status(500).json({
            error:
              "Erreur lors de la récupération des remises de cheques du client",
          });
        }
        return res.status(200).json(remisesChequesClient);
      }
    );
  };

  static getAllOfClientFromNewToOld = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    RemiseChequeClient.getAllOfClientFromNewToOld(
      startDate,
      endDate,
      id_client,
      (error, remisesChequesClient) => {
        if (error) {
          return res.status(500).json({
            error:
              "Erreur lors de la récupération des remises de cheques du client",
          });
        }
        return res.status(200).json(remisesChequesClient);
      }
    );
  };

  static getAllOfClientMoreImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    RemiseChequeClient.getAllOfClientMoreImportant(
      startDate,
      endDate,
      id_client,
      (error, remisesChequesClient) => {
        if (error) {
          return res.status(500).json({
            error:
              "Erreur lors de la récupération des remises de cheques du client",
          });
        }
        return res.status(200).json(remisesChequesClient);
      }
    );
  };

  static getAllOfClientLessImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    RemiseChequeClient.getAllOfClientLessImportant(
      startDate,
      endDate,
      id_client,
      (error, remisesChequesClient) => {
        if (error) {
          return res.status(500).json({
            error:
              "Erreur lors de la récupération des remises de cheques du client",
          });
        }
        return res.status(200).json(remisesChequesClient);
      }
    );
  };

  static getAllOfClientValidated = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    RemiseChequeClient.getAllOfClientValidated(
      startDate,
      endDate,
      id_client,
      (error, remisesChequesClient) => {
        if (error) {
          return res.status(500).json({
            error:
              "Erreur lors de la récupération des remises de cheques du client",
          });
        }
        return res.status(200).json(remisesChequesClient);
      }
    );
  };

  static getAllOfClientUnvalidated = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    RemiseChequeClient.getAllOfClientUnvalidated(
      startDate,
      endDate,
      id_client,
      (error, remisesChequesClient) => {
        if (error) {
          return res.status(500).json({
            error:
              "Erreur lors de la récupération des remises de cheques du client",
          });
        }
        return res.status(200).json(remisesChequesClient);
      }
    );
  };

  static getAllOfClientRestLessImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    RemiseChequeClient.getAllOfClientRestLessImportant(
      startDate,
      endDate,
      id_client,
      (error, remisesChequesClient) => {
        if (error) {
          return res.status(500).json({
            error:
              "Erreur lors de la récupération des remises de cheques du client",
          });
        }
        return res.status(200).json(remisesChequesClient);
      }
    );
  };

  static getAllOfClientRestMoreImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    RemiseChequeClient.getAllOfClientRestMoreImportant(
      startDate,
      endDate,
      id_client,
      (error, remisesChequesClient) => {
        if (error) {
          return res.status(500).json({
            error:
              "Erreur lors de la récupération des remises de cheques du client",
          });
        }
        return res.status(200).json(remisesChequesClient);
      }
    );
  };

  static getAllOfClientBOABank = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    RemiseChequeClient.getAllOfClientBOABank(
      startDate,
      endDate,
      id_client,
      (error, remisesChequesClient) => {
        if (error) {
          return res.status(500).json({
            error:
              "Erreur lors de la récupération des remises de cheques du client",
          });
        }
        return res.status(200).json(remisesChequesClient);
      }
    );
  };

  static getAllOfClientUBABank = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    RemiseChequeClient.getAllOfClientUBABank(
      startDate,
      endDate,
      id_client,
      (error, remisesChequesClient) => {
        if (error) {
          return res.status(500).json({
            error:
              "Erreur lors de la récupération des remises de cheques du client",
          });
        }
        return res.status(200).json(remisesChequesClient);
      }
    );
  };

  static getAllOfClientNSIABank = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    RemiseChequeClient.getAllOfClientNSIABank(
      startDate,
      endDate,
      id_client,
      (error, remisesChequesClient) => {
        if (error) {
          return res.status(500).json({
            error:
              "Erreur lors de la récupération des remises de cheques du client",
          });
        }
        return res.status(200).json(remisesChequesClient);
      }
    );
  };

  static getAllOfClientBGFIBank = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    RemiseChequeClient.getAllOfClientBGFIBank(
      startDate,
      endDate,
      id_client,
      (error, remisesChequesClient) => {
        if (error) {
          return res.status(500).json({
            error:
              "Erreur lors de la récupération des remises de cheques du client",
          });
        }
        return res.status(200).json(remisesChequesClient);
      }
    );
  };

  static getAllOfClientSGBBank = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    RemiseChequeClient.getAllOfClientSGBBank(
      startDate,
      endDate,
      id_client,
      (error, remisesChequesClient) => {
        if (error) {
          return res.status(500).json({
            error:
              "Erreur lors de la récupération des remises de cheques du client",
          });
        }
        return res.status(200).json(remisesChequesClient);
      }
    );
  };

  static getAllOfClientEcobankBank = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    RemiseChequeClient.getAllOfClientEcobankBank(
      startDate,
      endDate,
      id_client,
      (error, remisesChequesClient) => {
        if (error) {
          return res.status(500).json({
            error:
              "Erreur lors de la récupération des remises de cheques du client",
          });
        }
        return res.status(200).json(remisesChequesClient);
      }
    );
  };

  // Mettre à jour une remise de chèque client par ID
  static update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    let previousData = {};
    let newData = {};

    Clients.getById(updatedData.id_client, (clientError, client) => {
      if (clientError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la mise à jour de la remise de chèque client",
        });
      }
      if (!client) {
        return res
          .status(404)
          .json({ status: 404, error: "Le client n'existe pas" });
      }

      RemiseChequeClient.getById(id, (getError, existingRemiseChequeClient) => {
        if (getError) {
          return res.status(500).json({
            status: 500,
            error:
              "Erreur lors de la récupération de la remise de chèque client",
          });
        }
        if (!existingRemiseChequeClient) {
          return res.status(404).json({
            status: 404,
            error: "Remise de chèque client non trouvée",
          });
        }
        previousData = existingRemiseChequeClient;
        existingRemiseChequeClient = {
          ...existingRemiseChequeClient,
          ...updatedData,
        };
        newData = existingRemiseChequeClient;
        existingRemiseChequeClient = new RemiseChequeClient(
          existingRemiseChequeClient.id,
          existingRemiseChequeClient.description,
          existingRemiseChequeClient.banque,
          existingRemiseChequeClient.montant,
          existingRemiseChequeClient.reste,
          existingRemiseChequeClient.est_validee,
          existingRemiseChequeClient.id_client,
          existingRemiseChequeClient.date_remise
        );
        existingRemiseChequeClient.update((updateError) => {
          if (updateError) {
            return res.status(500).json({
              status: 500,
              error:
                "Erreur lors de la mise à jour de la remise de chèque client",
            });
          }

          // =================== Add Modification ===================
          Modifications.create(
            {
              modification: `Modification des données d'une remise de chèque du client ${client.prenoms} ${client.nom}`,
              details: `
                Anciennes données::
                Description: ${previousData.description},
                Banque: ${previousData.banque},
                Montant: ${previousData.montant},
                Reste: ${previousData.reste},
                État de validation: ${
                  previousData.est_validee ? "Validée" : "Non Validée"
                }
                a57aa2b90d9bbb0524e51b458577767ab2823507b877e9aedfd885bb12b5d7ed980dd63abad043be6beff172d6c47678d68a502778a617e57b3e7fd0b0952f47
                Nouvelles données::
                Description: ${newData.description},
                Banque: ${newData.banque},
                Montant: ${newData.montant},
                Reste: ${previousData.reste},
                État de validation: ${
                  newData.est_validee ? "Validée" : "Non Validée"
                }
                `,
              id_employe: req.employee.id,
            },
            (error, modification) => {}
          );
          // =================== Add Modification ===================

          return res
            .status(200)
            .json({ status: 200, existingRemiseChequeClient });
        });
      });
    });
  };

  // Supprimer une remise de chèque client par ID
  static delete = (req, res) => {
    const id = req.params.id;
    RemiseChequeClient.getById(id, (getError, existingRemiseChequeClient) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération de la remise de chèque client",
        });
      }
      if (!existingRemiseChequeClient) {
        return res
          .status(404)
          .json({ status: 404, error: "Remise de chèque client non trouvée" });
      }
      existingRemiseChequeClient.delete((deleteError, id) => {
        if (!id) {
          return res.status(500).json({
            status: 500,
            error:
              "Erreur lors de la suppression de la remise de chèque client",
          });
        }
        return res.status(204).json({ status: 204, id });
      });
    });
  };
}

module.exports = RemiseChequeClientController;
