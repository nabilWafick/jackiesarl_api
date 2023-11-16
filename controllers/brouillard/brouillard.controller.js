const ActivitesDepot = require("../../models/activites_depot/activites_depot.model");
const Brouillard = require("../../models/brouillard/brouillard.model");

class BrouillardController {
  // Créer un nouveau brouillard
  static create = (req, res) => {
    const brouillardData = req.body;
    Brouillard.create(brouillardData, (error, brouillard) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la création du brouillard",
        });
      }
      return res.status(201).json({ status: 201, brouillard });
    });
  };

  // Récupérer un brouillard par ID
  static getById = (req, res) => {
    const id = req.params.id;
    Brouillard.getById(id, (error, brouillard) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération du brouillard" });
      }
      if (!brouillard) {
        return res.status(404).json({ error: "Brouillard non trouvé" });
      }
      return res.status(200).json(brouillard);
    });
  };

  static getAll = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Brouillard.getAll(startDate, endDate, (error, brouillards) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des brouillards" });
      }
      return res.status(200).json(brouillards);
    });
  };

  // Mettre à jour un brouillard par ID
  static update = (req, res) => {
    const id = req.params.id;
    const is_current_stock_increasing = req.params.is_current_stock_increasing;
    console.log("is_current_stock_increasing", is_current_stock_increasing);
    const updatedData = req.body;
    console.log("id depot", id);
    Brouillard.getById(id, (getError, existingBrouillard) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération du brouillard",
        });
      }
      if (!existingBrouillard) {
        return res
          .status(404)
          .json({ status: 404, error: "Brouillard non trouvé" });
      }

      if (is_current_stock_increasing == 1) {
        existingBrouillard = {
          ...existingBrouillard,
          ...updatedData,
          stock_actuel: updatedData.stock_actuel,
        };

        existingBrouillard = new Brouillard(
          existingBrouillard.id,
          existingBrouillard.depot,
          existingBrouillard.stock_actuel,
          existingBrouillard.nom_gerant,
          existingBrouillard.numero_gerant,
          existingBrouillard.date_ajout
        );

        existingBrouillard.update((updateError) => {
          if (updateError) {
            return res.status(500).json({
              status: 500,
              error: "Erreur lors de la mise à jour du brouillard",
            });
          }

          return res.status(200).json({ status: 200, existingBrouillard });
          // on ne met pas a jour le stock apres vente de la derniere vente

          /*    
          ActivitesDepot.getLastActiviteDepot(
            existingBrouillard.id,
            (lastActiviteError, lastActivite) => {
              if (lastActiviteError) {
                return res.status(500).json({
                  status: 500,
                  error:
                    "Erreur lors de la récupération de la dernière activité du dépôt",
                });
              }
              if (!lastActivite) {
                return res
                  .status(200)
                  .json({ status: 200, existingBrouillard });
              } else {
                lastActivite = {
                  ...lastActivite,
                  quantite_apres_vente: existingBrouillard.stock_actuel,
                };

                lastActivite = new ActivitesDepot(
                  lastActivite.id,
                  lastActivite.id_depot,
                  lastActivite.quantite_avant_vente,
                  lastActivite.vente,
                  lastActivite.quantite_apres_vente,
                  lastActivite.versement,
                  lastActivite.depense,
                  lastActivite.observation,
                  lastActivite.date_remplissage
                );

                lastActivite.update((lastActiviteUpdateError) => {
                  if (lastActiviteUpdateError) {
                    return res.status(500).json({
                      status: 500,
                      error:
                        "Erreur lors de la mise à jour de la dernière activité du dépôt",
                    });
                  }

                  return res
                    .status(200)
                    .json({ status: 200, existingBrouillard });
                });
              }
            }
          );
          */
        });
      } else {
        // si ce n'est pas une augmentation de stock

        // on verifrie si le stock veut etre modifie
        if (existingBrouillard.stock_actuel != updatedData.stock_actuel) {
          ActivitesDepot.getLastActiviteDepot(
            existingBrouillard.id,
            (lastActiviteError, lastActivite) => {
              if (lastActiviteError) {
                return res.status(500).json({
                  status: 500,
                  error:
                    "Erreur lors de la récupération de la dernière activité du dépôt",
                });
              }
              if (!lastActivite) {
                existingBrouillard = { ...existingBrouillard, ...updatedData };

                existingBrouillard = new Brouillard(
                  existingBrouillard.id,
                  existingBrouillard.depot,
                  existingBrouillard.stock_actuel,
                  existingBrouillard.nom_gerant,
                  existingBrouillard.numero_gerant,
                  existingBrouillard.date_ajout
                );

                existingBrouillard.update((updateError) => {
                  if (updateError) {
                    return res.status(500).json({
                      status: 500,
                      error: "Erreur lors de la mise à jour du brouillard",
                    });
                  }
                  return res
                    .status(200)
                    .json({ status: 200, existingBrouillard });
                });
              } else {
                return res.status(406).json({
                  status: 406,
                  error: "Le stock actuel ne peut être modifié",
                });
              }
            }
          );
        } else {
          existingBrouillard = { ...existingBrouillard, ...updatedData };

          existingBrouillard = new Brouillard(
            existingBrouillard.id,
            existingBrouillard.depot,
            existingBrouillard.stock_actuel,
            existingBrouillard.nom_gerant,
            existingBrouillard.numero_gerant,
            existingBrouillard.date_ajout
          );

          existingBrouillard.update((updateError) => {
            if (updateError) {
              return res.status(500).json({
                status: 500,
                error: "Erreur lors de la mise à jour du brouillard",
              });
            }
            return res.status(200).json({ status: 200, existingBrouillard });
          });
        }

        //
      }
    });
  };

  // Supprimer un brouillard par ID
  static delete = (req, res) => {
    const id = req.params.id;
    Brouillard.getById(id, (getError, existingBrouillard) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération du brouillard",
        });
      }
      if (!existingBrouillard) {
        return res
          .status(404)
          .json({ status: 404, error: "Brouillard non trouvé" });
      }
      console.log("brouillard exist");
      existingBrouillard.delete((deleteError, id) => {
        if (deleteError) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la suppression du brouillard",
          });
        }
        console.log("deleted brouillard id", id);
        return res.status(204).json({ status: 204, id });
      });
    });
  };
}

module.exports = BrouillardController;
