const AchatEntreprise = require("../../models/achat_entreprise/achat_entreprise.model");
const path = require("path");
const fs = require("fs");
const AchatClient = require("../../models/achat_client/achat_client.model");
const StockBonCommande = require("../../models/stock_bon_commande/stock_bon_commande.model");
const Modifications = require("../../models/modifications/modifications.model");

const deleteFile = (fileLink) => {
  //  console.log("file link in delete function", fileLink);
  const filePath = fileLink.split("http://127.0.0.1:7000/")[1];
  // console.log("file path after split", filePath);
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
class AchatEntrepriseController {
  // Créer un nouvel achat entreprise
  static create = (req, res) => {
    let achatEntrepriseDataf = req.body;

    AchatEntreprise.getByBonCommande(
      parseInt(achatEntrepriseDataf.bon_commande),
      (findError, purchase) => {
        if (findError) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la création de l'achat entreprise",
          });
        }
        if (!purchase) {
          const file = req.file;
          console.log("achatEntrepriseDataf", achatEntrepriseDataf);
          console.log("file", file);
          const needed_path = file && file.path.split("/uploads")[1];
          //console.log("needeed path", needed_path);
          const fileLink = file && `http://127.0.0.1:7000${needed_path}`;
          // console.log("file link", fileLink);
          let achatEntrepriseData = {
            ...achatEntrepriseDataf,
            bon_commande: parseInt(achatEntrepriseDataf.bon_commande),
            quantite_achetee: parseFloat(achatEntrepriseDataf.quantite_achetee),
            montant: parseFloat(achatEntrepriseDataf.montant),
            cheque: parseFloat(achatEntrepriseDataf.cheque),
            bordereau: file ? fileLink : "",
          };
          console.log("achatEntrepriseData", achatEntrepriseData);
          AchatEntreprise.create(
            achatEntrepriseData,
            (error, achatEntreprise) => {
              if (error) {
                return res.status(500).json({
                  status: 500,
                  error: "Erreur lors de la création de l'achat entreprise",
                });
              }
              return res.status(201).json({ status: 201, achatEntreprise });
            }
          );
        } else {
          return res.status(406).json({
            status: 406,
            error: "Ce bon de commande existe déjà",
          });
        }
      }
    );
  };

  // Récupérer un achat entreprise par ID
  static getByBonCommande = (req, res) => {
    const bonCommande = req.params.bon_commande;
    AchatEntreprise.getByBonCommande(bonCommande, (error, achatEntreprise) => {
      if (error) {
        return res.status(500).json({
          error: "Erreur lors de la récupération de l'achat entreprise",
        });
      }
      if (!achatEntreprise) {
        return res.status(404).json({ error: "Achat entreprise non trouvé" });
      }
      return res.status(200).json(achatEntreprise);
    });
  };

  static getAll = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    AchatEntreprise.getAll(startDate, endDate, (error, achatsEntreprise) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération des achats entreprise",
        });
      }
      return res.status(200).json(achatsEntreprise);
    });
  };

  // Mettre à jour un achat entreprise par bon de commande
  static update = (req, res) => {
    const bonCommande = req.params.bon_commande;
    const updatedData = req.body;
    let previousData = {};
    let newData = {};

    AchatEntreprise.getByBonCommande(
      bonCommande,
      (getError, existingAchatEntreprise) => {
        if (getError) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la mise à jour de l'achat entreprise",
          });
        }
        if (!existingAchatEntreprise) {
          return res
            .status(404)
            .json({ status: 404, error: "Achat entreprise non trouvé" });
        }

        previousData = existingAchatEntreprise;

        StockBonCommande.getByBonCommande(
          updatedData.bon_commande,
          (stockError, stock) => {
            if (stockError) {
              return res.status(500).json({
                status: 500,
                error: "Erreur lors de la mise à jour de l'achat entreprise",
              });
            }
            // console.log("stock from SQL: ", stock);
            // si ce n'est pas encore utilise ou mise en vente
            if (!stock || !stock.id) {
              console.log("stock bon de commande !exist");
              // ================== Final ==================

              existingAchatEntreprise = {
                ...existingAchatEntreprise,
                ...updatedData,
                bon_commande: parseFloat(updatedData.bon_commande),
                quantite_achetee: parseFloat(updatedData.quantite_achetee),
                montant: parseFloat(updatedData.montant),
                cheque: parseFloat(updatedData.cheque),
              };

              const file = req.file;

              console.log("existingAchatEntreprise", existingAchatEntreprise);
              console.log("file", file);
              if (file) {
                const needed_path = file && file.path.split("/uploads")[1];
                //console.log("needeed path", needed_path);
                const fileLink = file && `http://127.0.0.1:7000${needed_path}`;
                // console.log("file link", fileLink);
                const lastSlip = existingAchatEntreprise.bordereau;
                existingAchatEntreprise = {
                  ...existingAchatEntreprise,
                  bordereau: fileLink,
                };
                if (lastSlip != "") {
                  deleteFile(lastSlip);
                }
              }

              newData = existingAchatEntreprise;

              existingAchatEntreprise = new AchatEntreprise(
                existingAchatEntreprise.bon_commande,
                existingAchatEntreprise.categorie,
                existingAchatEntreprise.quantite_achetee,
                existingAchatEntreprise.montant,
                existingAchatEntreprise.banque,
                existingAchatEntreprise.cheque,
                existingAchatEntreprise.bordereau,
                existingAchatEntreprise.date_achat
              );

              console.log("new achat Entreprise", existingAchatEntreprise);

              existingAchatEntreprise.update((updateError) => {
                if (updateError) {
                  return res.status(500).json({
                    status: 500,
                    error:
                      "Erreur lors de la mise à jour de l'achat entreprise",
                  });
                }

                Modifications.create(
                  {
                    modification: `Modification des données d'un achat de l'entreprise`,
                    details: `
                      Anciennes données::
                      Bon de Commande: ${previousData.bon_commande},
                      Catégorie: ${previousData.categorie},
                      Quantité achetée: ${previousData.quantite_achetee},
                      Montant: ${previousData.montant},
                      Banque: ${previousData.banque},
                      Chèque: ${previousData.cheque},
                      Bordereau: ${previousData.bordereau}
                      a57aa2b90d9bbb0524e51b458577767ab2823507b877e9aedfd885bb12b5d7ed980dd63abad043be6beff172d6c47678d68a502778a617e57b3e7fd0b0952f47
                      Nouvelles données::
                      Bon de Commande: ${newData.bon_commande},
                      Catégorie: ${newData.categorie},
                      Quantité achetée: ${newData.quantite_achetee},
                      Montant: ${newData.montant},
                      Banque: ${newData.banque},
                      Chèque: ${newData.cheque},
                      Bordereau: ${newData.bordereau}
                      `,
                    id_employe: req.employee.id,
                  },
                  (error, modification) => {}
                );

                return res
                  .status(200)
                  .json({ status: 200, existingAchatEntreprise });
              });

              // ==================== Final =================
            }

            // si le stock est mise en vente
            else {
              console.log("stock bon de commande exist");
              // si c'est la quantite achetee qui veut etre modifie ou la categorie ou le bon commande
              if (
                parseFloat(updatedData.quantite_achetee) !=
                  existingAchatEntreprise.quantite_achetee ||
                updatedData.categorie != existingAchatEntreprise.categorie ||
                parseFloat(updatedData.bon_commande) !=
                  existingAchatEntreprise.bon_commande
              ) {
                AchatClient.getLastAchatStockBonCommande(
                  updatedData.bon_commande,
                  (lastAchatError, lastAchat) => {
                    if (lastAchatError) {
                      return res.status(500).json({
                        status: 500,
                        error:
                          "Erreur lors de la mise à jour de l'achat entreprise",
                      });
                    }
                    // si il n'y a pas d'achat client sur le stock
                    if (!lastAchat) {
                      // on met a jour le stock
                      StockBonCommande.updateBC({
                        last_bon_commande: existingAchatEntreprise.bon_commande,
                        new_bon_commande: updatedData.bon_commande,
                        new_categorie: updatedData.categorie,
                        new_quantite_achetee: updatedData.quantite_achetee,
                      });
                      // on met a jour l'achat de l'entreprise
                      // ================== Final ==================

                      existingAchatEntreprise = {
                        ...existingAchatEntreprise,
                        ...updatedData,
                        bon_commande: parseFloat(updatedData.bon_commande),
                        quantite_achetee: parseFloat(
                          updatedData.quantite_achetee
                        ),
                        montant: parseFloat(updatedData.montant),
                        cheque: parseFloat(updatedData.cheque),
                      };

                      const file = req.file;

                      console.log(
                        "existingAchatEntreprise",
                        existingAchatEntreprise
                      );
                      console.log("file", file);
                      if (file) {
                        const needed_path =
                          file && file.path.split("/uploads")[1];
                        //console.log("needeed path", needed_path);
                        const fileLink =
                          file && `http://127.0.0.1:7000${needed_path}`;
                        // console.log("file link", fileLink);
                        const lastSlip = existingAchatEntreprise.bordereau;
                        existingAchatEntreprise = {
                          ...existingAchatEntreprise,
                          bordereau: fileLink,
                        };
                        if (lastSlip != "") {
                          deleteFile(lastSlip);
                        }
                      }

                      newData = existingAchatEntreprise;

                      existingAchatEntreprise = new AchatEntreprise(
                        existingAchatEntreprise.bon_commande,
                        existingAchatEntreprise.categorie,
                        existingAchatEntreprise.quantite_achetee,
                        existingAchatEntreprise.montant,
                        existingAchatEntreprise.banque,
                        existingAchatEntreprise.cheque,
                        existingAchatEntreprise.bordereau,
                        existingAchatEntreprise.date_achat
                      );

                      existingAchatEntreprise.update((updateError) => {
                        if (updateError) {
                          return res.status(500).json({
                            status: 500,
                            error:
                              "Erreur lors de la mise à jour de l'achat entreprise",
                          });
                        }

                        Modifications.create(
                          {
                            modification: `Modification des données d'un achat de l'entreprise`,
                            details: `
                              Anciennes données::
                              Bon de Commande: ${previousData.bon_commande},
                              Catégorie: ${previousData.categorie},
                              Quantité achetée: ${previousData.quantite_achetee},
                              Montant: ${previousData.montant},
                              Banque: ${previousData.banque},
                              Chèque: ${previousData.cheque},
                              Bordereau: ${previousData.bordereau}
                              a57aa2b90d9bbb0524e51b458577767ab2823507b877e9aedfd885bb12b5d7ed980dd63abad043be6beff172d6c47678d68a502778a617e57b3e7fd0b0952f47
                              Nouvelles données::
                              Bon de Commande: ${newData.bon_commande},
                              Catégorie: ${newData.categorie},
                              Quantité achetée: ${newData.quantite_achetee},
                              Montant: ${newData.montant},
                              Banque: ${newData.banque},
                              Chèque: ${newData.cheque},
                              Bordereau: ${newData.bordereau}
                              `,
                            id_employe: req.employee.id,
                          },
                          (error, modification) => {}
                        );

                        return res
                          .status(200)
                          .json({ status: 200, existingAchatEntreprise });
                      });

                      // ==================== Final =================
                    } else {
                      return res.status(400).json({
                        status: 400,
                        error:
                          "L'achat entreprise ne peut être modifié car le stock est déjà en vente",
                      });
                    }
                  }
                );
              } else {
                // ================== Final ==================

                existingAchatEntreprise = {
                  ...existingAchatEntreprise,
                  ...updatedData,
                  bon_commande: parseFloat(updatedData.bon_commande),
                  quantite_achetee: parseFloat(updatedData.quantite_achetee),
                  montant: parseFloat(updatedData.montant),
                  cheque: parseFloat(updatedData.cheque),
                };

                const file = req.file;

                console.log("existingAchatEntreprise", existingAchatEntreprise);
                console.log("file", file);
                if (file) {
                  const needed_path = file && file.path.split("/uploads")[1];
                  //console.log("needeed path", needed_path);
                  const fileLink =
                    file && `http://127.0.0.1:7000${needed_path}`;
                  // console.log("file link", fileLink);
                  const lastSlip = existingAchatEntreprise.bordereau;
                  existingAchatEntreprise = {
                    ...existingAchatEntreprise,
                    bordereau: fileLink,
                  };
                  if (lastSlip != "") {
                    deleteFile(lastSlip);
                  }
                }

                newData = existingAchatEntreprise;

                existingAchatEntreprise = new AchatEntreprise(
                  existingAchatEntreprise.bon_commande,
                  existingAchatEntreprise.categorie,
                  existingAchatEntreprise.quantite_achetee,
                  existingAchatEntreprise.montant,
                  existingAchatEntreprise.banque,
                  existingAchatEntreprise.cheque,
                  existingAchatEntreprise.bordereau,
                  existingAchatEntreprise.date_achat
                );

                existingAchatEntreprise.update((updateError) => {
                  if (updateError) {
                    return res.status(500).json({
                      status: 500,
                      error:
                        "Erreur lors de la mise à jour de l'achat entreprise",
                    });
                  }

                  Modifications.create(
                    {
                      modification: `Modification des données d'un achat de l'entreprise`,
                      details: `
                        Anciennes données::
                        Bon de Commande: ${previousData.bon_commande},
                        Catégorie: ${previousData.categorie},
                        Quantité achetée: ${previousData.quantite_achetee},
                        Montant: ${previousData.montant},
                        Banque: ${previousData.banque},
                        Chèque: ${previousData.cheque},
                        Bordereau: ${previousData.bordereau}
                        a57aa2b90d9bbb0524e51b458577767ab2823507b877e9aedfd885bb12b5d7ed980dd63abad043be6beff172d6c47678d68a502778a617e57b3e7fd0b0952f47
                        Nouvelles données::
                        Bon de Commande: ${newData.bon_commande},
                        Catégorie: ${newData.categorie},
                        Quantité achetée: ${newData.quantite_achetee},
                        Montant: ${newData.montant},
                        Banque: ${newData.banque},
                        Chèque: ${newData.cheque},
                        Bordereau: ${newData.bordereau}
                        `,
                      id_employe: req.employee.id,
                    },
                    (error, modification) => {}
                  );

                  return res
                    .status(200)
                    .json({ status: 200, existingAchatEntreprise });
                });

                // ==================== Final =================
              }
            }
          }
        );
      }
    );
  };

  // Supprimer un achat entreprise par bon de commande
  static delete = (req, res) => {
    const bonCommande = req.params.bon_commande;
    AchatEntreprise.getByBonCommande(
      bonCommande,
      (getError, existingAchatEntreprise) => {
        if (getError) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la récupération de l'achat entreprise",
          });
        }
        if (!existingAchatEntreprise) {
          return res
            .status(404)
            .json({ status: 404, error: "Achat entreprise non trouvé" });
        }
        existingAchatEntreprise.delete((deleteError, bon_commande) => {
          if (!bon_commande) {
            return res.status(500).json({
              status: 500,
              error: "Erreur lors de la suppression de l'achat entreprise",
            });
          }
          if (existingAchatEntreprise.bordereau != "")
            deleteFile(existingAchatEntreprise.bordereau);
          return res.status(204).json({ status: 204, bon_commande });
        });
      }
    );
  };
}

module.exports = AchatEntrepriseController;
