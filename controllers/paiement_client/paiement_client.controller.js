const PaiementClient = require("../../models/paiement_client/paiement_client.model");
const AchatEntreprise = require("../../models/achat_entreprise/achat_entreprise.model");
const path = require("path");
const fs = require("fs");

deleteFile = (fileLink) => {
  const filePath = fileLink.split("http://127.0.0.1:7000/");
  const directory = path.resolve(__dirname, "../..");
  const dir = path.join(directory, `/uploads/${filePath}`);

  fs.unlink(dir, (error) => {
    if (error) {
      console.error("Erreur de la suppression du fichier :", error);
    } else {
      console.log("Fichier supprimé avec succès");
    }
  });
};

class PaiementClientController {
  // Créer un nouveau paiement client
  static create = (req, res) => {
    const paiementClientDataf = req.body;

    AchatEntreprise.getByBonCommande(
      paiementClientDataf.numero_bc,
      (error, achatEntreprise) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération de l'achat entreprise",
          });
        }
        if (!achatEntreprise) {
          return res
            .status(404)
            .json({ status: 404, error: "Achat entreprise non trouvé" });
        }
        //  return res.status(200).json(achatEntreprise);
        const file = req.file;
        console.log("paiementClientDataf", paiementClientDataf);
        console.log("file", file);
        const needed_path = file && file.path.split("/uploads")[1];
        //console.log("needeed path", needed_path);
        const fileLink = file && `http://127.0.0.1:7000${needed_path}`;
        // console.log("file link", fileLink);
        const paiementClientData = {
          ...paiementClientDataf,
          est_valide: parseInt(paiementClientDataf.est_valide),
          montant: parseFloat(paiementClientDataf.montant),
          numero_bc: parseInt(paiementClientDataf.numero_bc),
          id_client: parseInt(paiementClientDataf.id_client),
          categorie: achatEntreprise.categorie,
          bordereau: file ? fileLink : "",
        };
        console.log("paiementClientData", paiementClientData);
        PaiementClient.create(paiementClientData, (error, paiementClient) => {
          if (error) {
            return res.status(500).json({
              status: 500,
              error: "Erreur lors de la création du paiement client",
            });
          }
          return res
            .status(201)
            .json({ status: 201, paiementClient: paiementClient });
        });
      }
    );
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
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    PaiementClient.getAll(startDate, endDate, (error, paiementClients) => {
      if (error) {
        return res.status(500).json({
          error: "Erreur lors de la récupération des paiements clients",
        });
      }
      return res.status(200).json(paiementClients);
    });
  };

  static getAllFromNewToOld = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    PaiementClient.getAllFromNewToOld(
      startDate,
      endDate,
      (error, paiementClients) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des paiements clients",
          });
        }
        return res.status(200).json(paiementClients);
      }
    );
  };

  static getAllFromOldToNew = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    PaiementClient.getAllFromOldToNew(
      startDate,
      endDate,
      (error, paiementClients) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des paiements clients",
          });
        }
        return res.status(200).json(paiementClients);
      }
    );
  };

  static getAllMostImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    PaiementClient.getAllMostImportant(
      startDate,
      endDate,
      (error, paiementClients) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des paiements clients",
          });
        }
        return res.status(200).json(paiementClients);
      }
    );
  };

  static getAllLessImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    PaiementClient.getAllLessImportant(
      startDate,
      endDate,
      (error, paiementClients) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des paiements clients",
          });
        }
        return res.status(200).json(paiementClients);
      }
    );
  };

  static getAllNOCIBEMostImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    PaiementClient.getAllNOCIBEMostImportant(
      startDate,
      endDate,
      (error, paiementClients) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des paiements clients",
          });
        }
        return res.status(200).json(paiementClients);
      }
    );
  };

  static getAllNOCIBELessImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    PaiementClient.getAllNOCIBELessImportant(
      startDate,
      endDate,
      (error, paiementClients) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des paiements clients",
          });
        }
        return res.status(200).json(paiementClients);
      }
    );
  };

  static getAllCIMBENINMostImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    PaiementClient.getAllCIMBENINMostImportant(
      startDate,
      endDate,
      (error, paiementClients) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des paiements clients",
          });
        }
        return res.status(200).json(paiementClients);
      }
    );
  };

  static getAllCIMBENINLessImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    PaiementClient.getAllCIMBENINLessImportant(
      startDate,
      endDate,
      (error, paiementClients) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des paiements clients",
          });
        }
        return res.status(200).json(paiementClients);
      }
    );
  };

  static getAllValidated = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    PaiementClient.getAllValidated(
      startDate,
      endDate,
      (error, paiementClients) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des paiements clients",
          });
        }
        return res.status(200).json(paiementClients);
      }
    );
  };

  static getAllUnValidated = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    PaiementClient.getAllUnValidated(
      startDate,
      endDate,
      (error, paiementClients) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des paiements clients",
          });
        }
        return res.status(200).json(paiementClients);
      }
    );
  };

  // Selected Client

  static getAllOfClient = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    PaiementClient.getAllOfClient(
      startDate,
      endDate,
      id_client,
      (error, paiementsClient) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des paiements du client",
          });
        }
        return res.status(200).json(paiementsClient);
      }
    );
  };

  static getAllOfClientFromNewToOld = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    PaiementClient.getAllOfClientFromNewToOld(
      startDate,
      endDate,
      id_client,
      (error, paiementsClient) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des paiements du client",
          });
        }
        return res.status(200).json(paiementsClient);
      }
    );
  };

  static getAllOfClientFromOldToNew = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    PaiementClient.getAllOfClientFromOldToNew(
      startDate,
      endDate,
      id_client,
      (error, paiementsClient) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des paiements du client",
          });
        }
        return res.status(200).json(paiementsClient);
      }
    );
  };

  static getAllOfClientMostImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    PaiementClient.getAllOfClientMostImportant(
      startDate,
      endDate,
      id_client,
      (error, paiementsClient) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des paiements du client",
          });
        }
        return res.status(200).json(paiementsClient);
      }
    );
  };

  static getAllOfClientLessImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    PaiementClient.getAllOfClientLessImportant(
      startDate,
      endDate,
      id_client,
      (error, paiementsClient) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des paiements du client",
          });
        }
        return res.status(200).json(paiementsClient);
      }
    );
  };

  static getAllOfClientCIMBENINMostImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    PaiementClient.getAllOfClientCIMBENINMostImportant(
      startDate,
      endDate,
      id_client,
      (error, paiementsClient) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des paiements du client",
          });
        }
        return res.status(200).json(paiementsClient);
      }
    );
  };

  static getAllOfClientCIMBENINLessImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    PaiementClient.getAllOfClientCIMBENINLessImportant(
      startDate,
      endDate,
      id_client,
      (error, paiementsClient) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des paiements du client",
          });
        }
        return res.status(200).json(paiementsClient);
      }
    );
  };

  static getAllOfClientNOCIBEMostImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    PaiementClient.getAllOfClientNOCIBEMostImportant(
      startDate,
      endDate,
      id_client,
      (error, paiementsClient) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des paiements du client",
          });
        }
        return res.status(200).json(paiementsClient);
      }
    );
  };

  static getAllOfClientNOCIBELessImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    PaiementClient.getAllOfClientNOCIBELessImportant(
      startDate,
      endDate,
      id_client,
      (error, paiementsClient) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des paiements du client",
          });
        }
        return res.status(200).json(paiementsClient);
      }
    );
  };

  static getAllOfClientUnvalidated = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    PaiementClient.getAllOfClientUnvalidated(
      startDate,
      endDate,
      id_client,
      (error, paiementsClient) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des paiements du client",
          });
        }
        return res.status(200).json(paiementsClient);
      }
    );
  };

  static getAllOfClientValidated = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_client = req.params.id_client;
    PaiementClient.getAllOfClientValidated(
      startDate,
      endDate,
      id_client,
      (error, paiementsClient) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des paiements du client",
          });
        }
        return res.status(200).json(paiementsClient);
      }
    );
  };

  // Mettre à jour un paiement client par ID
  static update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    PaiementClient.getById(id, (getError, existingPaiementClient) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération du paiement client",
        });
      }
      if (!existingPaiementClient) {
        return res
          .status(404)
          .json({ status: 404, error: "Paiement client non trouvé" });
      }

      AchatEntreprise.getByBonCommande(
        updatedData.numero_bc,
        (error, achatEntreprise) => {
          if (error) {
            return res.status(500).json({
              error: "Erreur lors de la récupération de l'achat entreprise",
            });
          }
          if (!achatEntreprise) {
            return res
              .status(406)
              .json({ status: 406, error: "Achat entreprise non trouvé" });
          }

          existingPaiementClient = {
            ...existingPaiementClient,
            ...updatedData,
            est_valide: parseInt(updatedData.est_valide),
            montant: parseFloat(updatedData.montant),
            numero_bc: parseInt(updatedData.numero_bc),
            id_client: parseInt(updatedData.id_client),
            categorie: achatEntreprise.categorie,
          };

          const file = req.file;
          console.log("existingPaiementClient", existingPaiementClient);
          console.log("file", file);
          if (file) {
            const needed_path = file && file.path.split("/uploads")[1];
            //console.log("needeed path", needed_path);
            const fileLink = file && `http://127.0.0.1:7000${needed_path}`;
            // console.log("file link", fileLink);
            const lastSlip = existingPaiementClient.bordereau;
            existingPaiementClient = {
              ...existingPaiementClient,
              bordereau: fileLink,
            };
            if (lastSlip != "") {
              deleteFile(lastSlip);
            }
          }

          existingPaiementClient = new PaiementClient(
            existingPaiementClient.id,
            undefined,
            existingPaiementClient.montant,
            existingPaiementClient.banque,
            existingPaiementClient.reference,
            existingPaiementClient.categorie,
            existingPaiementClient.numero_bc,
            existingPaiementClient.bordereau,
            existingPaiementClient.est_valide,
            existingPaiementClient.id_client,
            existingPaiementClient.date_paiement
          );

          existingPaiementClient.update((updateError) => {
            if (updateError) {
              return res.status(500).json({
                status: 500,
                error: "Erreur lors de la mise à jour du paiement client",
              });
            }
            return res
              .status(200)
              .json({ status: 200, paiementClients: existingPaiementClient });
          });

          // return res.status(200).json(achatEntreprise);
        }
      );
    });
  };

  // Supprimer un paiement client par ID
  static delete = (req, res) => {
    const id = req.params.id;
    PaiementClient.getById(id, (getError, existingPaiementClient) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération du paiement client",
        });
      }
      if (!existingPaiementClient) {
        return res
          .status(404)
          .json({ status: 404, error: "Paiement client non trouvé" });
      }

      existingPaiementClient.delete((deleteError, id) => {
        if (!id) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la suppression du paiement client",
          });
        }
        if (existingPaiementClient.bordereau != "")
          deleteFile(existingPaiementClient.bordereau);
        return res.status(204).json({ status: 204, id: id });
      });
    });
  };
}

module.exports = PaiementClientController;
