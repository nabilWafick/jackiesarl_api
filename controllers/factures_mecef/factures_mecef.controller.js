const AchatClient = require("../../models/achat_client/achat_client.model");
const FacturesMECEF = require("../../models/factures_mecef/factures_mecef.model");
const Modifications = require("../../models/modifications/modifications.model");
const path = require("path");
const fs = require("fs");

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

class FacturesMECEFController {
  static create(req, res) {
    let factureData = req.body;
    console.log("factureData", factureData);

    const file = req.file;
    const needed_path = file && file.path.split("/uploads")[1];
    //console.log("needeed path", needed_path);
    const fileLink = file && `http://127.0.0.1:7000${needed_path}`;
    // console.log("file link", fileLink);
    factureData = {
      ...factureData,
      id_achat: parseInt(factureData.id_achat),
      fichier: file ? fileLink : "",
    };

    console.log("new factureData", factureData);

    AchatClient.getById(factureData.id_achat, (achatError, achat) => {
      if (achatError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la création de la facture",
        });
      }

      if (!achat) {
        return res
          .status(404)
          .json({ status: 404, error: "Vente non retrouvée" });
      }

      console.log("Purchase existed");

      //  console.log("file", req.file);

      FacturesMECEF.getByAchatId(achat.id, (achatFactError, achatFact) => {
        if (achatFactError) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la création de la facture",
          });
        }

        if (!achatFact) {
          FacturesMECEF.create(factureData, (error, newFacture) => {
            if (error) {
              return res.status(500).json({
                status: 500,
                error: "Erreur lors de la création de la facture",
              });
            }
            return res
              .status(201)
              .json({ status: 201, factureMECEF: newFacture });
          });
        } else {
          return res.status(400).json({
            status: 400,
            error: "L'achat a été déjà facturé",
          });
        }
      });
    });
  }

  static getById = (req, res) => {
    const id = req.params.id;
    console.log("req.id", id);
    FacturesMECEF.getById(id, (error, facture) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de la facture" });
      }
      if (!facture) {
        return res.status(404).json({ error: "Facture non trouvée" });
      }
      return res.status(200).json(facture);
    });
  };

  static getByAchatId = (req, res) => {
    const id = req.params.id;
    console.log("req.id", id);
    FacturesMECEF.getByAchatId(id, (error, facture) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de la facture" });
      }
      if (!facture) {
        return res.status(404).json({ error: "Facture non trouvée" });
      }
      return res.status(200).json(facture);
    });
  };

  static getAll = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    FacturesMECEF.getAll(startDate, endDate, (error, factures) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des brouillards" });
      }
      return res.status(200).json(factures);
    });
  };

  static update = (req, res) => {
    const id = req.params.id;
    console.log("bill id", id);

    const updatedData = req.body;

    let previousData = {};
    let newData = {};

    console.log("updatedData", updatedData);
    console.log("vente id", updatedData.id_achat);

    AchatClient.getById(updatedData.id_achat, (achatError, achat) => {
      if (achatError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la création de la facture",
        });
      }

      if (!achat) {
        return res
          .status(404)
          .json({ status: 404, error: "Vente non retrouvée" });
      }

      FacturesMECEF.getById(id, (getError, existingFacture) => {
        if (getError) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la récupération de la facture",
          });
        }
        if (!existingFacture) {
          return res
            .status(404)
            .json({ status: 404, error: "Facture non trouvée" });
        }

        previousData = existingFacture;

        console.log("existingFacture first", existingFacture);

        existingFacture = {
          ...existingFacture,
          ...updatedData,
        };

        // on lui ajoute l'id de l'achat (nouveau ou non pour faciliter la mise a jour)

        (existingFacture.id_achat = parseInt(updatedData.id_achat)),
          console.log("existingFacture second", existingFacture);

        const file = req.file;

        console.log("file", file);
        if (file) {
          const needed_path = file && file.path.split("/uploads")[1];
          //console.log("needeed path", needed_path);
          const fileLink = file && `http://127.0.0.1:7000${needed_path}`;
          // console.log("file link", fileLink);

          const lastSlip = existingFacture.fichier;

          existingFacture = {
            ...existingFacture,
            fichier: fileLink,
          };
          console.log("last slip", lastSlip);
          if (lastSlip != "") {
            deleteFile(lastSlip);
          }
        }

        //   console.log("new employee data", existingFacture);
        existingFacture = new FacturesMECEF(
          existingFacture.id,
          achat,
          existingFacture.reference,
          existingFacture.fichier,
          existingFacture.id_achat,
          existingFacture.date_facture
        );

        newData = existingFacture;

        existingFacture.update((updateError) => {
          if (updateError) {
            return res
              .status(500)
              .json({ error: "Erreur lors de la mise à jour de la facture" });
          }

          console.log("New Data", newData);

          // =================== Add Modification ===================
          Modifications.create(
            {
              modification: `Modification des données de la facture d'un client`,
              details: `
                Anciennes données::
                Client: ${previousData.vente.client.prenoms} ${
                previousData.vente.client.nom
              }
                Quantité: ${previousData.vente.quantite_achetee},
                Montant: ${previousData.vente.montant},
                Référence: ${previousData.reference},
                Fichier: ${previousData.fichier}
                Date de vente: ${new Date(
                  previousData.vente.date_achat
                ).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                Date de facturation: ${new Date(
                  previousData.date_facture
                ).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                a57aa2b90d9bbb0524e51b458577767ab2823507b877e9aedfd885bb12b5d7ed980dd63abad043be6beff172d6c47678d68a502778a617e57b3e7fd0b0952f47
                Nouvelles données::
                Client: ${newData.vente.client.prenoms} ${
                newData.vente.client.nom
              }
                Quantité: ${newData.vente.quantite_achetee},
                Montant: ${newData.vente.montant},
                Référence: ${newData.reference},
                Fichier: ${newData.fichier}
                Date de vente: ${new Date(
                  newData.vente.date_achat
                ).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                Date de facturation: ${new Date(
                  newData.date_facture
                ).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                `,
              id_employe: req.employee.id,
            },
            (error, modification) => {}
          );
          // =================== Add Modification ===================

          return res.status(200).json({
            status: 200,
            factureMECEF: existingFacture,
          });
        });
      });
    });
  };

  static delete = (req, res) => {
    const id = req.params.id;

    FacturesMECEF.getById(id, (getError, existingFacture) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération de la facture",
        });
      }
      if (!existingFacture) {
        return res
          .status(404)
          .json({ status: 404, error: "Facture non trouvée" });
      }
      existingFacture.delete((deleteError, id) => {
        if (deleteError) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la suppression de la facture",
          });
        }
        if (existingFacture.fichier != "") {
          deleteFile(existingFacture.fichier);
        }
        return res.status(204).json({ status: 204, id });
      });
    });
  };
}

module.exports = FacturesMECEFController;
