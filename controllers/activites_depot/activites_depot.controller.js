const ActivitesDepot = require("../../models/activites_depot/activites_depot.model");
const Brouillard = require("../../models/brouillard/brouillard.model");

class ActivitesDepotController {
  // Créer une nouvelle activité dépôt
  static create = (req, res) => {
    const activiteDepotData = req.body;

    Brouillard.getById(activiteDepotData.id_depot, (error, brouillard) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération du brouillard" });
      }
      if (!brouillard) {
        return res.status(404).json({ error: "Dépôt non trouvé" });
      }

      if (activiteDepotData.vente > brouillard.stock_actuel) {
        return res.status(406).json({
          status: 406,
          error: `La quantité de vente est supérieure au stock atuel. ${brouillard.stock_actuel} t disponible`,
        });
      } else {
        activiteDepotData.quantite_avant_vente = brouillard.stock_actuel;
        brouillard.stock_actuel -= activiteDepotData.vente;
        activiteDepotData.quantite_apres_vente = brouillard.stock_actuel;

        brouillard.update((updateError) => {
          if (updateError) {
            return res.status(500).json({
              status: 500,
              error: "Erreur lors de la mise à jour du brouillard",
            });
          }
          // return res.status(200).json({ status: 200, existingBrouillard });
          ActivitesDepot.create(activiteDepotData, (error, activiteDepot) => {
            if (error) {
              return res.status(500).json({
                status: 500,
                error: "Erreur lors de la création de l'activité dépôt",
              });
            }
            return res.status(201).json({ status: 201, activiteDepot });
          });
        });
      }
      // return res.status(200).json(brouillard);
    });
  };

  // Récupérer une activité dépôt par ID
  static getById = (req, res) => {
    const id = req.params.id;
    ActivitesDepot.getById(id, (error, activiteDepot) => {
      if (error) {
        return res.status(500).json({
          error: "Erreur lors de la récupération de l'activité dépôt",
        });
      }
      if (!activiteDepot) {
        return res.status(404).json({ error: "Activité dépôt non trouvée" });
      }
      return res.status(200).json(activiteDepot);
    });
  };

  static getAll = (req, res) => {
    ActivitesDepot.getAll((error, activitesDepot) => {
      if (error) {
        return res.status(500).json({
          error: "Erreur lors de la récupération des activités depot",
        });
      }
      return res.status(200).json(activitesDepot);
    });
  };

  static getAllByDepotID = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    const id_depot = req.params.id_depot;
    ActivitesDepot.getAllByDepotID(
      startDate,
      endDate,
      id_depot,
      (error, activitesDepot) => {
        if (error) {
          return res.status(500).json({
            error: "Erreur lors de la récupération des activités depot",
          });
        }
        return res.status(200).json(activitesDepot);
      }
    );
  };

  // Mettre à jour une activité dépôt par ID
  static update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    ActivitesDepot.getById(id, (getError, existingActiviteDepot) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération de l'activité dépôt",
        });
      }
      if (!existingActiviteDepot) {
        return res
          .status(404)
          .json({ status: 404, error: "Activité dépôt non trouvée" });
      }

      //   on verifie si c'est la vente qui veut etre modifie

      if (updatedData.vente != existingActiviteDepot.vente) {
        ActivitesDepot.getLastActiviteDepot(
          existingActiviteDepot.id_depot,
          (lastError, lastActivite) => {
            if (lastError) {
              return res.status(500).json({
                status: 500,
                error: "Erreur lors de la mise à jour de l'activité du dépôt",
              });
            }

            if (lastActivite.id != existingActiviteDepot.id) {
              return res.status(400).json({
                status: 400,
                error: "Cette opération ne peut être réalisée",
              });
            } else {
              const lastSale =
                existingActiviteDepot.quantite_avant_vente -
                existingActiviteDepot.quantite_apres_vente;

              // si le stock sera suffisant pour une la nouvelle vente

              if (
                existingActiviteDepot.quantite_avant_vente -
                  updatedData.vente >=
                0
              ) {
                // on fait une nouvelle vente, apres avoir supprime l'ancienne vente
                existingActiviteDepot.vente = updatedData.vente;
                existingActiviteDepot.quantite_apres_vente =
                  existingActiviteDepot.quantite_avant_vente -
                  updatedData.vente;

                // zone brouillard
                Brouillard.getById(
                  updatedData.id_depot,
                  (error, brouillard) => {
                    if (error) {
                      return res.status(500).json({
                        status: 500,
                        error:
                          "Erreur lors de la mise à jour de l'activité du dépôt",
                      });
                    }
                    if (!brouillard) {
                      return res
                        .status(404)
                        .json({ status: 404, error: "Dépôt non trouvé" });
                    }

                    // on restore l'ancien stock et on effectue une nouvelle vente

                    brouillard.stock_actuel += lastSale;
                    brouillard.stock_actuel -= updatedData.vente;

                    brouillard.update((updateError) => {
                      if (updateError) {
                        return res.status(500).json({
                          status: 500,
                          error: "Erreur lors de la mise à jour du brouillard",
                        });
                      }
                      // =================== Final =====================
                      existingActiviteDepot = {
                        ...existingActiviteDepot,
                        ...updatedData,
                        quantite_avant_vente:
                          existingActiviteDepot.quantite_avant_vente,
                        quantite_apres_vente:
                          existingActiviteDepot.quantite_apres_vente,
                        vente: existingActiviteDepot.vente,
                      };
                      // console.log("existingActiviteDepot", existingActiviteDepot);
                      existingActiviteDepot = new ActivitesDepot(
                        existingActiviteDepot.id,
                        existingActiviteDepot.id_depot,
                        existingActiviteDepot.quantite_avant_vente,
                        existingActiviteDepot.vente,
                        existingActiviteDepot.quantite_apres_vente,
                        existingActiviteDepot.versement,
                        existingActiviteDepot.depense,
                        existingActiviteDepot.observation,
                        existingActiviteDepot.date_remplissage
                      );
                      existingActiviteDepot.update((updateError) => {
                        if (updateError) {
                          return res.status(500).json({
                            status: 500,
                            error:
                              "Erreur lors de la mise à jour de l'activité dépôt",
                          });
                        }
                        return res
                          .status(200)
                          .json({ status: 200, existingActiviteDepot });
                      });
                      // ============== Final =======================
                    });
                  }
                );
                // zone brouillard
              } else {
                return res.status(406).json({
                  status: 406,
                  error: `La quantité demandée est supérieure au stock actuel. ${existingActiviteDepot.quantite_apres_vente} disponible`,
                });
              }
            }
          }
        );
      } else {
        // =================== Final =====================
        existingActiviteDepot = { ...existingActiviteDepot, ...updatedData };
        console.log("existingActiviteDepot", existingActiviteDepot);
        existingActiviteDepot = new ActivitesDepot(
          existingActiviteDepot.id,
          existingActiviteDepot.id_depot,
          existingActiviteDepot.quantite_avant_vente,
          existingActiviteDepot.vente,
          existingActiviteDepot.quantite_apres_vente,
          existingActiviteDepot.versement,
          existingActiviteDepot.depense,
          existingActiviteDepot.observation,
          existingActiviteDepot.date_remplissage
        );
        existingActiviteDepot.update((updateError) => {
          if (updateError) {
            return res.status(500).json({
              status: 500,
              error: "Erreur lors de la mise à jour de l'activité dépôt",
            });
          }
          return res.status(200).json({ status: 200, existingActiviteDepot });
        });
        // ============== Final =======================
      }
    });
  };

  // Supprimer une activité dépôt par ID
  static delete = (req, res) => {
    const id = req.params.id;
    console.log("to delete id", id);
    ActivitesDepot.getById(id, (getError, existingActiviteDepot) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la suppression de l'activité dépôt",
        });
      }
      if (!existingActiviteDepot) {
        return res
          .status(404)
          .json({ status: 404, error: "Activité dépôt non trouvée" });
      }

      console.log("before finding last");

      ActivitesDepot.getLastActiviteDepot(
        existingActiviteDepot.id_depot,
        (lastError, lastActivite) => {
          if (lastError) {
            return res.status(500).json({
              status: 500,
              error: "Erreur lors de la suppression de l'activité dépôt",
            });
          }
          // si l'opeeration est la derniere de la banque
          if (lastActivite.id != existingActiviteDepot.id) {
            console.log("the last id", lastActivite.id);
            return res.status(406).json({
              status: 406,
              error: "Cette activité ne peut être supprimée",
            });
          } else {
            // ================= Final ==============
            Brouillard.getById(
              existingActiviteDepot.id_depot,
              (brouillardError, brouillard) => {
                if (brouillardError) {
                  return res.status(500).json({
                    status: 500,
                    error: "Erreur lors de la suppression de l'activité dépôt",
                  });
                }
                if (!brouillard) {
                  return res.status(404).json({
                    status: 404,
                    error: "Le dépôt n'a pas été trouvé",
                  });
                }
                brouillard.stock_actuel +=
                  existingActiviteDepot.quantite_avant_vente -
                  existingActiviteDepot.quantite_apres_vente;

                brouillard.update((updateError) => {
                  if (updateError) {
                    return res.status(500).json({
                      status: 500,
                      error:
                        "Erreur lors de la suppression de l'activité dépôt",
                    });
                  }
                  existingActiviteDepot.delete((deleteError, id) => {
                    if (!id) {
                      return res.status(500).json({
                        status: 500,
                        error:
                          "Erreur lors de la suppression de l'activité dépôt",
                      });
                    }
                    return res.status(204).json({ status: 204, id });
                  });
                });
              }
            );
            // ================= Final ==============
          }
        }
      );
    });
  };
}

module.exports = ActivitesDepotController;
