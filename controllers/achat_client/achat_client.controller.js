const AchatClient = require("../../models/achat_client/achat_client.model");
const StockBonCommande = require("../../models/stock_bon_commande/stock_bon_commande.model");
const Clients = require("../../models/clients/clients.model");

const fs = require("fs");

deleteFile = (file) => {
  fs.unlink(file, (error) => {
    if (error) {
      console.error("Erreur de la suppression du fichier :", error);
    } else {
      console.log("Fichier supprimé avec succès");
    }
  });
};

class AchatClientController {
  // Créer un nouvel achat client
  static create = (req, res) => {
    let achatClientDataf = req.body;
    //  console.log("achatClientDataf", achatClientDataf);
    //  console.log(typeof parseFloat(achatClientDataf.quantite_achetee));

    achatClientDataf = {
      ...achatClientDataf,
      quantite_achetee: parseFloat(achatClientDataf.quantite_achetee),
      montant: parseFloat(achatClientDataf.montant),
      numero_bc: parseInt(achatClientDataf.numero_bc),
      id_client: parseInt(achatClientDataf.id_client),
    };

    // console.log("achatClientDataf data parsed", achatClientDataf);
    //  console.log(typeof achatClientDataf.quantite_achetee);

    Clients.getById(achatClientDataf.id_client, (getError, existingClient) => {
      if (getError) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération du client" });
      }
      if (!existingClient) {
        return res
          .status(401)
          .json({ status: 401, error: "Client non trouvé" });
      }

      StockBonCommande.getLastBonCommande(
        achatClientDataf.numero_bc,
        (error, lastStockBonCommande) => {
          if (error) {
            return res.status(500).json({
              status: 500,
              error: "Erreur lors de la récupération du stock bon de commande",
            });
          }
          // le stock bon de commande n'existe pas dans la table
          if (!lastStockBonCommande) {
            return res.status(404).json({
              status: 404,
              error: "Le stock bon de commande n'existe pas",
            });
            // le stock bon de commande existe dans la table
          } else {
            // console.log("In Big Else");
            if (
              achatClientDataf.quantite_achetee >
              lastStockBonCommande.stock_apres_vente
            ) {
              return res.status(402).json({
                status: 402,
                error: `La quantité demandée est supérieure à celle disponible. ${lastStockBonCommande.stock_apres_vente} t en stock`,
              });
            } else {
              //  console.log("In Last Else");

              lastStockBonCommande.stock_avant_vente =
                lastStockBonCommande.stock_apres_vente;
              lastStockBonCommande.vente += achatClientDataf.quantite_achetee;
              lastStockBonCommande.stock_apres_vente -=
                achatClientDataf.quantite_achetee;
              achatClientDataf.categorie = lastStockBonCommande.categorie;

              lastStockBonCommande = new StockBonCommande(
                lastStockBonCommande.id,
                lastStockBonCommande.numero_bc,
                lastStockBonCommande.categorie,
                lastStockBonCommande.quantite_achetee,
                lastStockBonCommande.stock_initial,
                lastStockBonCommande.stock_avant_vente,
                lastStockBonCommande.vente,
                lastStockBonCommande.stock_apres_vente,
                lastStockBonCommande.date_rechargement
              );

              console.log("new stock bon commande", lastStockBonCommande);

              lastStockBonCommande.update((updateError) => {
                if (updateError) {
                  return res.status(500).json({
                    error:
                      "Erreur lors de la mise à jour du stock bon de commande",
                  });
                }
                //return res.status(200).json(existingStockBonCommande);

                // ============ Final ===============
                const file = req.file;
                console.log("achatClientDataf", achatClientDataf);
                console.log("file", file);
                const achatClientData = {
                  ...achatClientDataf,
                  bordereau: file ? file.path : "",
                };
                console.log("achatClientData", achatClientData);
                AchatClient.create(achatClientData, (error, achatClient) => {
                  if (error) {
                    return res.status(500).json({
                      status: 500,
                      error: "Erreur lors de la création de l'achat client",
                    });
                  }
                  return res
                    .status(201)
                    .json({ status: 201, achatClient: achatClient });
                });

                // ================ Final ===========
              });
            }
          }
        }
      );
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
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    AchatClient.getAll(startDate, endDate, (error, achatsClients) => {
      if (error) {
        return res.status(500).json({
          error: "Erreur lors de la récupération des achats des clients",
        });
      }
      return res.status(200).json(achatsClients);
    });
  };

  static getAllFromNewToOld = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    AchatClient.getAllFromNewToOld(
      startDate,
      endDate,
      (error, achatsClients) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des achats des clients",
          });
        }
        return res.status(200).json(achatsClients);
      }
    );
  };

  static getAllFromOldToNew = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    AchatClient.getAllFromOldToNew(
      startDate,
      endDate,
      (error, achatsClients) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des achats des clients",
          });
        }
        return res.status(200).json(achatsClients);
      }
    );
  };

  static getAllMostImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    AchatClient.getAllMostImportant(
      startDate,
      endDate,
      (error, achatsClients) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des achats des clients",
          });
        }
        return res.status(200).json(achatsClients);
      }
    );
  };

  static getAllLessImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    AchatClient.getAllLessImportant(
      startDate,
      endDate,
      (error, achatsClients) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des achats des clients",
          });
        }
        return res.status(200).json(achatsClients);
      }
    );
  };

  static getAllNOCIBEMostImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    AchatClient.getAllNOCIBEMostImportant(
      startDate,
      endDate,
      (error, achatsClients) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des achats des clients",
          });
        }
        return res.status(200).json(achatsClients);
      }
    );
  };

  static getAllNOCIBELessImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    AchatClient.getAllNOCIBELessImportant(
      startDate,
      endDate,
      (error, achatsClients) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des achats des clients",
          });
        }
        return res.status(200).json(achatsClients);
      }
    );
  };

  static getAllCIMBENINMostImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    AchatClient.getAllCIMBENINMostImportant(
      startDate,
      endDate,
      (error, achatsClients) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des achats des clients",
          });
        }
        return res.status(200).json(achatsClients);
      }
    );
  };

  static getAllCIMBENINLessImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    AchatClient.getAllCIMBENINLessImportant(
      startDate,
      endDate,
      (error, achatsClients) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des achats des clients",
          });
        }
        return res.status(200).json(achatsClients);
      }
    );
  };

  // ================ Defined User ================

  static getAllOfClient = (req, res) => {
    const id_client = req.params.id_client;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    AchatClient.getAllOfClient(
      startDate,
      endDate,
      id_client,
      (error, achatsClient) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des achats du client",
          });
        }
        return res.status(200).json(achatsClient);
      }
    );
  };

  static getAllOfClientFromNewToOld = (req, res) => {
    const id_client = req.params.id_client;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    AchatClient.getAllOfClientFromNewToOld(
      startDate,
      endDate,
      id_client,
      (error, achatsClient) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des achats du client",
          });
        }
        return res.status(200).json(achatsClient);
      }
    );
  };

  static getAllOfClientFromOldToNew = (req, res) => {
    const id_client = req.params.id_client;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    AchatClient.getAllOfClientFromOldToNew(
      startDate,
      endDate,
      id_client,
      (error, achatsClient) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des achats du client",
          });
        }
        return res.status(200).json(achatsClient);
      }
    );
  };

  static getAllOfClientMostImportant = (req, res) => {
    const id_client = req.params.id_client;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    AchatClient.getAllOfClientMostImportant(
      startDate,
      endDate,
      id_client,
      (error, achatsClient) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des achats du client",
          });
        }
        return res.status(200).json(achatsClient);
      }
    );
  };

  static getAllOfClientLessImportant = (req, res) => {
    const id_client = req.params.id_client;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    AchatClient.getAllOfClientLessImportant(
      startDate,
      endDate,
      id_client,
      (error, achatsClient) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des achats du client",
          });
        }
        return res.status(200).json(achatsClient);
      }
    );
  };

  static getAllOfClientCIMBENINMostImportant = (req, res) => {
    const id_client = req.params.id_client;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    AchatClient.getAllOfClientCIMBENINMostImportant(
      startDate,
      endDate,
      id_client,
      (error, achatsClient) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des achats du client",
          });
        }
        return res.status(200).json(achatsClient);
      }
    );
  };

  static getAllOfClientCIMBENINLessImportant = (req, res) => {
    const id_client = req.params.id_client;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    AchatClient.getAllOfClientCIMBENINLessImportant(
      startDate,
      endDate,
      id_client,
      (error, achatsClient) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des achats du client",
          });
        }
        return res.status(200).json(achatsClient);
      }
    );
  };

  static getAllOfClientNOCIBEMostImportant = (req, res) => {
    const id_client = req.params.id_client;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    AchatClient.getAllOfClientNOCIBEMostImportant(
      startDate,
      endDate,
      id_client,
      (error, achatsClient) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des achats du client",
          });
        }
        return res.status(200).json(achatsClient);
      }
    );
  };

  static getAllOfClientNOCIBELessImportant = (req, res) => {
    const id_client = req.params.id_client;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    AchatClient.getAllOfClientNOCIBELessImportant(
      startDate,
      endDate,
      id_client,
      (error, achatsClient) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des achats du client",
          });
        }
        return res.status(200).json(achatsClient);
      }
    );
  };

  // Mettre à jour un achat client par ID
  static update = (req, res) => {
    const id = req.params.id;
    let updatedData = req.body;
    console.log("updatedData", updatedData);
    updatedData = {
      ...updatedData,
      quantite_achetee: parseFloat(updatedData.quantite_achetee),
      montant: parseFloat(updatedData.montant),
      numero_bc: parseInt(updatedData.numero_bc),
      id_client: parseInt(updatedData.id_client),
    };

    console.log("parsed updatedData", updatedData);

    AchatClient.getById(id, (getError, existingAchatClient) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération de l'achat client",
        });
      }
      if (!existingAchatClient) {
        return res
          .status(404)
          .json({ status: 404, error: "Achat client non trouvé" });
      }

      // on verifie le stock bon de commande est le meme que l'ancien

      if (updatedData.numero_bc === existingAchatClient.numero_bc) {
        StockBonCommande.getLastBonCommande(
          updatedData.numero_bc,
          (getError, usedStockBonCommande) => {
            if (getError) {
              return res
                .status(500)
                .json({ status: 500, error: "Stock Bon Commande non trouvé" });
            }

            if (!usedStockBonCommande) {
              return res
                .status(404)
                .json({ status: 404, error: "Stock Bon Commande non trouvé" });
            }

            if (
              usedStockBonCommande.stock_apres_vente +
                existingAchatClient.quantite_achetee -
                updatedData.quantite_achetee >=
              0
            ) {
              usedStockBonCommande.stock_avant_vente +=
                existingAchatClient.quantite_achetee -
                updatedData.quantite_achetee;
              usedStockBonCommande.vente +=
                -existingAchatClient.quantite_achetee +
                updatedData.quantite_achetee;
              usedStockBonCommande.stock_apres_vente +=
                existingAchatClient.quantite_achetee -
                updatedData.quantite_achetee;
              updatedData.categorie = usedStockBonCommande.categorie;

              usedStockBonCommande = new StockBonCommande(
                usedStockBonCommande.id,
                usedStockBonCommande.numero_bc,
                usedStockBonCommande.categorie,
                usedStockBonCommande.quantite_achetee,
                usedStockBonCommande.stock_initial,
                usedStockBonCommande.stock_avant_vente,
                usedStockBonCommande.vente,
                usedStockBonCommande.stock_apres_vente,
                usedStockBonCommande.date_rechargement
              );

              usedStockBonCommande.update((updateError) => {
                if (updateError) {
                  return res.status(500).json({
                    status: 500,
                    error:
                      "Erreur lors de la mise à jour du stock bon de commande",
                  });
                }
                // stock bon de commande mise à jour avec succes

                // on met update l'achat client

                existingAchatClient = {
                  ...existingAchatClient,
                  ...updatedData,
                };
                const file = req.file;
                console.log("existingAchatClient", existingAchatClient);
                console.log("file", file);
                if (file) {
                  const lastSlip = existingAchatClient.bordereau;
                  existingAchatClient = {
                    ...existingAchatClient,
                    bordereau: file.path,
                  };
                  if (lastSlip != "") {
                    deleteFile(lastSlip);
                  }
                }
                existingAchatClient = new AchatClient(
                  existingAchatClient.id,
                  undefined,
                  existingAchatClient.quantite_achetee,
                  existingAchatClient.categorie,
                  existingAchatClient.montant,
                  existingAchatClient.numero_ctp,
                  existingAchatClient.bordereau,
                  existingAchatClient.numero_bc,
                  existingAchatClient.id_client,
                  existingAchatClient.date_achat
                );
                existingAchatClient.update((updateError) => {
                  if (updateError) {
                    return res.status(500).json({
                      status: 500,
                      error: "Erreur lors de la mise à jour de l'achat client",
                    });
                  }
                  return res.status(200).json({
                    status: 200,
                    achatClient: existingAchatClient,
                  });
                });

                // ======================== Final ==========================
              });
            } else {
              return res.status(402).json({
                status: 402,
                error: `La quantité achetée est supérieure à celle disponible. ${usedStockBonCommande.stock_apres_vente} t disponible`,
              });
            }
          }
        );
      } else {
        // si c'est un nouveau stock bon de commande
        StockBonCommande.getLastBonCommande(
          updatedData.numero_bc,
          (getError, newStockBonCommande) => {
            if (getError) {
              return res.status(500).json({
                status: 500,
                error:
                  "Erreur lors de la récupération du stock bon de commande",
              });
            }
            if (!newStockBonCommande) {
              return res.status(404).json({
                status: 404,
                error: "Le stock bon de commande n'existe pas",
              });
            }

            if (
              updatedData.quantite_achetee >
              newStockBonCommande.stock_apres_vente
            ) {
              return res.status(402).json({
                status: 402,
                error: `La quantité demandée est supérieure à celle disponible. ${newStockBonCommande.stock_apres_vente} t en stock`,
              });
            } else {
              // on restitue le prelevement de l'ancien stock bon de commande
              StockBonCommande.getLastBonCommande(
                existingAchatClient.numero_bc,
                (error, oldStockBonCommande) => {
                  if (error) {
                    return res.status(500).json({
                      status: 500,
                      error:
                        "Erreur lors de la récupération du stock bon de commande",
                    });
                  }
                  if (!oldStockBonCommande) {
                    return res.status(404).json({
                      status: 404,
                      error: "Le stock bon de commande n'existe pas",
                    });
                  }

                  oldStockBonCommande.stock_avant_vente +=
                    existingAchatClient.quantite_achetee;
                  oldStockBonCommande.vente -=
                    existingAchatClient.quantite_achetee;
                  oldStockBonCommande.stock_apres_vente +=
                    existingAchatClient.quantite_achetee;

                  oldStockBonCommande = new StockBonCommande(
                    oldStockBonCommande.id,
                    oldStockBonCommande.numero_bc,
                    oldStockBonCommande.categorie,
                    oldStockBonCommande.quantite_achetee,
                    oldStockBonCommande.stock_initial,
                    oldStockBonCommande.stock_avant_vente,
                    oldStockBonCommande.vente,
                    oldStockBonCommande.stock_apres_vente,
                    oldStockBonCommande.date_rechargement
                  );

                  oldStockBonCommande.update((oldError) => {
                    if (oldError) {
                      return res.status(500).json({
                        status: 500,
                        error: `Erreur de la mise à jour de l'ancien stock bon de commande`,
                      });
                    }
                    // ancien stock bon de commande mise à jour

                    // on preleve dans le nouveau stock bon de commande
                    newStockBonCommande.stock_avant_vente =
                      newStockBonCommande.stock_apres_vente;
                    newStockBonCommande.vente += updatedData.quantite_achetee;
                    newStockBonCommande.stock_apres_vente -=
                      updatedData.quantite_achetee;
                    updatedData.categorie = newStockBonCommande.categorie;

                    newStockBonCommande = new StockBonCommande(
                      newStockBonCommande.id,
                      newStockBonCommande.numero_bc,
                      newStockBonCommande.categorie,
                      newStockBonCommande.quantite_achetee,
                      newStockBonCommande.stock_initial,
                      newStockBonCommande.stock_avant_vente,
                      newStockBonCommande.vente,
                      newStockBonCommande.stock_apres_vente,
                      newStockBonCommande.date_rechargement
                    );

                    newStockBonCommande.update((newError) => {
                      if (newError) {
                        return res.status(500).json({
                          status: 500,
                          error: `Erreur de la mise à jour de l'ancien stock bon de commande`,
                        });
                      }
                      // prelevement du nouveau stock realise avec succes

                      // on met a jour l'achat du client

                      // ======================== Final ==========================

                      existingAchatClient = {
                        ...existingAchatClient,
                        ...updatedData,
                      };
                      const file = req.file;
                      console.log("existingAchatClient", existingAchatClient);
                      console.log("file", file);
                      if (file) {
                        const lastSlip = existingAchatClient.bordereau;
                        existingAchatClient = {
                          ...existingAchatClient,
                          bordereau: file.path,
                        };
                        if (lastSlip != "") {
                          deleteFile(lastSlip);
                        }
                      }
                      existingAchatClient = new AchatClient(
                        existingAchatClient.id,
                        undefined,
                        existingAchatClient.quantite_achetee,
                        existingAchatClient.categorie,
                        existingAchatClient.montant,
                        existingAchatClient.numero_ctp,
                        existingAchatClient.bordereau,
                        existingAchatClient.numero_bc,
                        existingAchatClient.id_client,
                        existingAchatClient.date_achat
                      );
                      existingAchatClient.update((updateError) => {
                        if (updateError) {
                          return res.status(500).json({
                            status: 500,
                            error:
                              "Erreur lors de la mise à jour de l'achat client",
                          });
                        }
                        return res.status(200).json({
                          status: 200,
                          achatClient: existingAchatClient,
                        });
                      });

                      // ======================== Final ==========================
                    });
                  });
                }
              );
            }
          }
        );
      }
    });
  };

  // Supprimer un achat client par ID
  static delete = (req, res) => {
    const id = req.params.id;
    AchatClient.getById(id, (getError, existingAchatClient) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération de l'achat client",
        });
      }
      if (!existingAchatClient) {
        return res
          .status(404)
          .json({ status: 404, error: "Achat client non trouvé" });
      }
      existingAchatClient.delete((deleteError, id) => {
        if (!id) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la suppression de l'achat client" });
        }

        if (existingAchatClient.bordereau != "")
          deleteFile(existingAchatClient.bordereau);
        return res.status(204).json({ status: 204, id: id });
      });
    });
  };
}

module.exports = AchatClientController;
