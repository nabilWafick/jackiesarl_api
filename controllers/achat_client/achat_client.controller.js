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
    console.log("achatClientDataf", achatClientDataf);
    console.log(typeof parseFloat(achatClientDataf.quantite_achetee));

    achatClientDataf = {
      ...achatClientDataf,
      quantite_achetee: parseFloat(achatClientDataf.quantite_achetee),
      montant: parseFloat(achatClientDataf.montant),
      numero_bc: parseInt(achatClientDataf.numero_bc),
      id_client: parseInt(achatClientDataf.id_client),
    };

    console.log("achatClientDataf data parsed", achatClientDataf);
    console.log(typeof achatClientDataf.quantite_achetee);

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
            if (
              achatClientDataf.quantite_achetee >
              lastStockBonCommande.stock_apres_vente
            ) {
              return res.status(402).json({
                status: 402,
                error: `La quantité demandée est supérieure à celle disponible. ${lastStockBonCommande.stock_apres_vente} t en stock`,
              });
            } else {
              lastStockBonCommande.stock_avant_vente =
                lastStockBonCommande.stock_apres_vente;
              lastStockBonCommande.vente += achatClientDataf.quantite_achetee;
              lastStockBonCommande.stock_apres_vente -=
                achatClientDataf.quantite_achetee;
              achatClientDataf.categorie = lastStockBonCommande.categorie;

              l;

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
    AchatClient.getAll((error, achatsClients) => {
      if (error) {
        return res.status(500).json({
          error: "Erreur lors de la récupération des achats des clients",
        });
      }
      return res.status(200).json(achatsClients);
    });
  };

  static getAllOfClient = (req, res) => {
    const id_client = req.params.id_client;
    AchatClient.getAllOfClient(id_client, (error, achatsClient) => {
      if (error) {
        return res.status(500).json({
          error: "Erreur lors de la récupération des achats du client",
        });
      }
      return res.status(200).json(achatsClient);
    });
  };

  // Mettre à jour un achat client par ID
  static update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
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
      existingAchatClient = { ...existingAchatClient, ...updatedData };
      const file = req.file;
      console.log("existingAchatClient", existingAchatClient);
      console.log("file", file);
      if (file) {
        const lastSlip = existingAchatClient.bordereau;
        existingAchatClient = { ...existingAchatClient, bordereau: file.path };
        if (lastSlip != "") {
          deleteFile(lastSlip);
        }
      }
      existingAchatClient = new AchatClient(
        existingAchatClient.id,
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
        return res
          .status(200)
          .json({ status: 200, achatClient: existingAchatClient });
      });
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
        deleteFile(existingAchatClient.bordereau);
        return res.status(204).json({ status: 204, id: id });
      });
    });
  };
}

module.exports = AchatClientController;
