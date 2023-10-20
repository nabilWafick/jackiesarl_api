const ActivitesBanque = require("../../models/activites_banque/activites_banque.model");
const SoldeCourant = require("../../models/solde_courant/solde_courant.model");

class ActivitesBanqueController {
  // Créer une nouvelle activité banque
  static create = (req, res) => {
    const activiteBanqueData = req.body;
    console.log("Activite Banque", activiteBanqueData);

    SoldeCourant.getById(
      activiteBanqueData.id_banque,
      (error, soldeCourant) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la récupération du solde courant",
          });
        }
        if (!soldeCourant) {
          return res
            .status(404)
            .json({ status: 404, error: "La banque n'hesiste pas" });
        }

        if (activiteBanqueData.credit > soldeCourant.solde_actuel) {
          return res.status(402).json({
            status: 402,
            error: `Le crédit est supérieur au solde actuel. Solde actuel: ${soldeCourant.solde_actuel}`,
          });
        } else {
          if (activiteBanqueData.credit == 0) {
            soldeCourant.solde_actuel += activiteBanqueData.debit;
            activiteBanqueData.solde_actuel = soldeCourant.solde_actuel;
            soldeCourant = new SoldeCourant(
              soldeCourant.id,
              soldeCourant.banque,
              soldeCourant.numero_compte,
              soldeCourant.solde_actuel,
              soldeCourant.date_ajout
            );
            soldeCourant.update((updateError) => {
              if (updateError) {
                return res.status(500).json({
                  status: 500,
                  error: "Erreur lors de la mise à jour du solde courant",
                });
              }
              ActivitesBanque.create(
                activiteBanqueData,
                (error, activiteBanque) => {
                  if (error) {
                    return res.status(500).json({
                      status: 500,
                      error: "Erreur lors de la création de l'activité banque",
                    });
                  }
                  return res.status(201).json({ status: 201, activiteBanque });
                }
              );
            });
          } else if (
            activiteBanqueData.credit != soldeCourant.solde_actuel &&
            activiteBanqueData.debit == 0
          ) {
            soldeCourant.solde_actuel -= activiteBanqueData.credit;
            activiteBanqueData.solde_actuel = soldeCourant.solde_actuel;
            soldeCourant = new SoldeCourant(
              soldeCourant.id,
              soldeCourant.banque,
              soldeCourant.numero_compte,
              soldeCourant.solde_actuel,
              soldeCourant.date_ajout
            );
            soldeCourant.update((updateError) => {
              if (updateError) {
                return res.status(500).json({
                  status: 500,
                  error: "Erreur lors de la mise à jour du solde courant",
                });
              }
              ActivitesBanque.create(
                activiteBanqueData,
                (error, activiteBanque) => {
                  if (error) {
                    return res.status(500).json({
                      status: 500,
                      error: "Erreur lors de la création de l'activité banque",
                    });
                  }
                  return res.status(201).json({ status: 201, activiteBanque }); // ligne 92
                }
              );
            });
          } else {
            return res.status(402).json({
              status: 402,
              error: `Le crédit est égal au solde actuel. Solde actuel: ${soldeCourant.solde_actuel}`,
            });
          }
        }
      }
    );
  };

  // Récupérer une activité banque par ID
  static getById = (req, res) => {
    const id = req.params.id;
    ActivitesBanque.getById(id, (error, activiteBanque) => {
      if (error) {
        return res.status(500).json({
          error: "Erreur lors de la récupération de l'activité banque",
        });
      }
      if (!activiteBanque) {
        return res.status(404).json({ error: "Activité banque non trouvée" });
      }
      return res.status(200).json(activiteBanque);
    });
  };

  static getAll = (req, res) => {
    ActivitesBanque.getAll((error, activitesBanque) => {
      if (error) {
        return res.status(500).json({
          error: "Erreur lors de la récupération des activités banque",
        });
      }
      return res.status(200).json(activitesBanque);
    });
  };

  static getAllByBanqueID = (req, res) => {
    const id_banque = req.params.id_banque;
    ActivitesBanque.getAllByBanqueID(id_banque, (error, activitesBanque) => {
      if (error) {
        return res.status(500).json({
          error: "Erreur lors de la récupération des activités banque",
        });
      }
      return res.status(200).json(activitesBanque);
    });
  };

  // Mettre à jour une activité banque par ID
  static update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    ActivitesBanque.getById(id, (getError, existingActiviteBanque) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération de l'activité banque",
        });
      }
      if (!existingActiviteBanque) {
        return res
          .status(404)
          .json({ status: 404, error: "Activité banque non trouvée" });
      }
      existingActiviteBanque = { ...existingActiviteBanque, ...updatedData };

      existingActiviteBanque = new ActivitesBanque(
        existingActiviteBanque.id,
        existingActiviteBanque.id_banque,
        existingActiviteBanque.description,
        existingActiviteBanque.debit,
        existingActiviteBanque.credit,
        existingActiviteBanque.solde_actuel,
        existingActiviteBanque.date_activite
      );

      existingActiviteBanque.update((updateError) => {
        if (updateError) {
          console.log("SQL Error");
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la mise à jour de l'activité banque",
          });
        }
        return res.status(200).json({ status: 200, existingActiviteBanque });
      });
    });
  };

  // Supprimer une activité banque par ID
  static delete = (req, res) => {
    const id = req.params.id;
    ActivitesBanque.getById(id, (getError, existingActiviteBanque) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération de l'activité banque",
        });
      }
      if (!existingActiviteBanque) {
        return res
          .status(404)
          .json({ status: 404, error: "Activité banque non trouvée" });
      }
      existingActiviteBanque.delete((deleteError, id) => {
        if (!id) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la suppression de l'activité banque",
          });
        }
        return res.status(204).json({ status: 204, id });
      });
    });
  };
}

module.exports = ActivitesBanqueController;
