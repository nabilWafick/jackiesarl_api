const Clients = require("../../models/clients/clients.model");
const Commandes = require("../../models/commandes/commandes.model");
const Modifications = require("../../models/modifications/modifications.model");

class CommandesController {
  // Créer une nouvelle commande
  static create = (req, res) => {
    const commandeData = req.body;
    Commandes.create(commandeData, (error, commande) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la création de la commande",
        });
      }
      return res.status(201).json({ status: 201, commande });
    });
  };

  // Récupérer une commande par ID
  static getById = (req, res) => {
    const id = req.params.id;
    Commandes.getById(id, (error, commande) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de la commande" });
      }
      if (!commande) {
        return res.status(404).json({ error: "Commande non trouvée" });
      }
      return res.status(200).json(commande);
    });
  };

  static getAll = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Commandes.getAll(startDate, endDate, (error, commandes) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des commandes" });
      }
      return res.status(200).json(commandes);
    });
  };

  static getAllFromNewToOld = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Commandes.getAllFromNewToOld(startDate, endDate, (error, commandes) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des commandes" });
      }
      return res.status(200).json(commandes);
    });
  };

  static getAllFromOldToNew = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Commandes.getAllFromOldToNew(startDate, endDate, (error, commandes) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des commandes" });
      }
      return res.status(200).json(commandes);
    });
  };

  static getAllMoreImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Commandes.getAllMoreImportant(startDate, endDate, (error, commandes) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des commandes" });
      }
      return res.status(200).json(commandes);
    });
  };

  static getAllLessImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Commandes.getAllLessImportant(startDate, endDate, (error, commandes) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des commandes" });
      }
      return res.status(200).json(commandes);
    });
  };

  static getAllNOCIBEMoreImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Commandes.getAllNOCIBEMoreImportant(
      startDate,
      endDate,
      (error, commandes) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la récupération des commandes" });
        }
        return res.status(200).json(commandes);
      }
    );
  };

  static getAllNOCIBELessImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Commandes.getAllNOCIBELessImportant(
      startDate,
      endDate,
      (error, commandes) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la récupération des commandes" });
        }
        return res.status(200).json(commandes);
      }
    );
  };

  static getAllCIMBENINMoreImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Commandes.getAllCIMBENINMoreImportant(
      startDate,
      endDate,
      (error, commandes) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la récupération des commandes" });
        }
        return res.status(200).json(commandes);
      }
    );
  };

  static getAllCIMBENINLessImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Commandes.getAllCIMBENINLessImportant(
      startDate,
      endDate,
      (error, commandes) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la récupération des commandes" });
        }
        return res.status(200).json(commandes);
      }
    );
  };

  static getAllGroupByDestination = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Commandes.getAllGroupByDestination(
      startDate,
      endDate,
      (error, commandes) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la récupération des commandes" });
        }
        return res.status(200).json(commandes);
      }
    );
  };

  static getAllDelivered = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Commandes.getAllDelivered(startDate, endDate, (error, commandes) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des commandes" });
      }
      return res.status(200).json(commandes);
    });
  };

  static getAllUnDelivered = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Commandes.getAllUnDelivered(startDate, endDate, (error, commandes) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des commandes" });
      }
      return res.status(200).json(commandes);
    });
  };

  // Mettre à jour une commande par ID
  static update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    let previousData = {};
    let newData = {};
    console.log("updatedData ", updatedData);

    Clients.getById(updatedData.id_client, (clientError, client) => {
      if (clientError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la mise à jour de la commande",
        });
      }

      if (!client) {
        return res
          .status(404)
          .json({ status: 404, error: "Le client n'a pas été trouvé" });
      }

      Commandes.getById(id, (getError, existingCommande) => {
        if (getError) {
          console.log("Erreur SQL Get");
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la récupération de la commande",
          });
        }
        if (!existingCommande) {
          return res
            .status(404)
            .json({ status: 404, error: "Commande non trouvée" });
        }

        previousData = existingCommande;

        existingCommande = { ...existingCommande, ...updatedData };

        newData = existingCommande;

        existingCommande = new Commandes(
          existingCommande.id,
          undefined,
          existingCommande.categorie,
          existingCommande.quantite_achetee,
          existingCommande.destination,
          existingCommande.date_commande,
          existingCommande.date_livraison,
          existingCommande.est_traitee,
          existingCommande.id_client,
          existingCommande.date_ajout
        );

        existingCommande.update((updateError) => {
          if (updateError) {
            console.log("Erreur SQL Update");
            return res.status(500).json({
              status: 500,
              error: "Erreur lors de la mise à jour de la commande",
            });
          }

          Modifications.create(
            {
              modification: `Modification des données d'une commande du client ${client.prenoms} ${client.nom}`,
              details: `
                Anciennes données::
                Catégorie: ${previousData.categorie},
                Quantité achetée: ${previousData.quantite_achetee},
                Destination: ${previousData.destination},
                Date de commande: ${new Date(
                  previousData.date_commande
                ).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })},
                Date de livraison: ${new Date(
                  previousData.date_livraison
                ).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })},
                État de traitement: ${
                  previousData.est_traitee ? "Traitée" : "Non Traitée"
                }
                a57aa2b90d9bbb0524e51b458577767ab2823507b877e9aedfd885bb12b5d7ed980dd63abad043be6beff172d6c47678d68a502778a617e57b3e7fd0b0952f47
                Nouvelles données::
                Catégorie: ${newData.categorie},
                Quantité achetée: ${newData.quantite_achetee},
                Destination: ${newData.destination},
                Date de commande: ${new Date(
                  newData.date_commande
                ).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })},
                Date de livraison: ${new Date(
                  newData.date_livraison
                ).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })},
                État de traitement: ${
                  newData.est_traitee ? "Traitée" : "Non Traitée"
                }
                `,
              id_employe: req.employee.id,
            },
            (error, modification) => {}
          );

          return res.status(200).json({ status: 200, existingCommande });
        });
      });
    });
  };

  // Supprimer une commande par ID
  static delete = (req, res) => {
    const id = req.params.id;
    Commandes.getById(id, (getError, existingCommande) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération de la commande",
        });
      }
      if (!existingCommande) {
        return res
          .status(404)
          .json({ status: 404, error: "Commande non trouvée" });
      }
      existingCommande.delete((deleteError) => {
        if (!id) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la suppression de la commande",
          });
        }
        return res.status(204).json({ status: 204, id });
      });
    });
  };
}

module.exports = CommandesController;
