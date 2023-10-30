const RemiseChequeClient = require("../../models/remise_cheque_client/remise_cheque_client.model");

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
      existingRemiseChequeClient = {
        ...existingRemiseChequeClient,
        ...updatedData,
      };
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
        return res
          .status(200)
          .json({ status: 200, existingRemiseChequeClient });
      });
    });
  };

  // Supprimer une remise de chèque client par ID
  static delete = (req, res) => {
    const id = req.params.id;
    RemiseChequeClient.getById(id, (getError, existingRemiseChequeClient) => {
      if (getError) {
        return res.status(500).json({
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
