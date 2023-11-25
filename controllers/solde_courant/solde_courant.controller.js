const SoldeCourant = require("../../models/solde_courant/solde_courant.model");
const ActivitesBanque = require("../../models/activites_banque/activites_banque.model");

const Modifications = require("../../models/modifications/modifications.model");
class SoldeCourantController {
  // Créer un nouveau solde courant
  static create = (req, res) => {
    const soldeCourantData = req.body;
    console.log("soldeCourantData", soldeCourantData);
    SoldeCourant.getAll((getError, soldesCourants) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la création du solde courant",
        });
      }
      const exist = soldesCourants.filter(
        (soldeCourant) => soldeCourant.banque == soldeCourantData.banque
      );

      if (exist.length > 0) {
        return res.status(406).json({
          status: 406,
          error: "La banque existe déjà",
        });
      } else {
        SoldeCourant.create(soldeCourantData, (error, soldeCourant) => {
          if (error) {
            return res.status(500).json({
              status: 500,
              error: "Erreur lors de la création du solde courant",
            });
          }
          return res.status(201).json({ status: 201, soldeCourant });
        });
      }
    });
  };

  // Récupérer un solde courant par ID
  static getById = (req, res) => {
    const id = req.params.id;
    SoldeCourant.getById(id, (error, soldeCourant) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération du solde courant" });
      }
      if (!soldeCourant) {
        return res.status(404).json({ error: "Solde courant non trouvé" });
      }
      return res.status(200).json(soldeCourant);
    });
  };

  static getAll = (req, res) => {
    SoldeCourant.getAll((error, soldesCourant) => {
      if (error) {
        return res.status(500).json({
          error: "Erreur lors de la récupération des soldes courants",
        });
      }
      return res.status(200).json(soldesCourant);
    });
  };

  // Mettre à jour un solde courant par ID
  static update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    let previousData = {};
    let newData = {};

    SoldeCourant.getById(id, (getError, existingSoldeCourant) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération du solde courant",
        });
      }
      if (!existingSoldeCourant) {
        return res
          .status(404)
          .json({ status: 404, error: "Solde courant non trouvé" });
      }

      previousData = existingSoldeCourant;

      // si c'est le nom de la banque ou le solde veut etre modifie
      if (
        existingSoldeCourant.banque != updatedData.banque ||
        existingSoldeCourant.solde_actuel != updatedData.solde_actuel
      ) {
        if (existingSoldeCourant.banque != updatedData.banque)
          SoldeCourant.getAll((getAllError, soldesCourants) => {
            if (getAllError) {
              return res.status(500).json({
                status: 500,
                error: "Erreur lors de la mise à jour du solde courant",
              });
            }
            // on verifie si la banque remplacante n'existe pas encore
            const exist = soldesCourants.filter(
              (soldeCourant) => soldeCourant.banque == updatedData.banque
            );

            if (exist.length > 0) {
              return res.status(406).json({
                status: 406,
                error: "La banque existe déjà",
              });
            } else {
              // on verifie si des transactions n'ont pas ete deja faite au niveau de la banque
              if (
                existingSoldeCourant.solde_actuel != updatedData.solde_actuel
              ) {
                ActivitesBanque.getAllByBanqueID(
                  updatedData.id_banque,
                  (getAllBanqueError, activitesBanque) => {
                    if (getAllBanqueError) {
                      return res.status(500).json({
                        status: 500,
                        error: "Erreur lors de la mise à jour du solde courant",
                      });
                    }
                    if (activitesBanque.length == 0) {
                      existingSoldeCourant = {
                        ...existingSoldeCourant,
                        ...updatedData,
                      };

                      newData = existingSoldeCourant;

                      existingSoldeCourant = new SoldeCourant(
                        existingSoldeCourant.id,
                        existingSoldeCourant.banque,
                        existingSoldeCourant.numero_compte,
                        existingSoldeCourant.solde_actuel,
                        existingSoldeCourant.date_ajout
                      );
                      existingSoldeCourant.update((updateError) => {
                        if (updateError) {
                          return res.status(500).json({
                            status: 500,
                            error:
                              "Erreur lors de la mise à jour du solde courant",
                          });
                        }

                        Modifications.create(
                          {
                            modification: `Modification des données d'une banque`,
                            details: `
                              Anciennes données::
                              Banque: ${previousData.banque},
                              Numéro de compte: ${previousData.numero_compte},
                              Solde actuel: ${previousData.solde_actuel}
                              a57aa2b90d9bbb0524e51b458577767ab2823507b877e9aedfd885bb12b5d7ed980dd63abad043be6beff172d6c47678d68a502778a617e57b3e7fd0b0952f47
                              Nouvelles données::
                              Banque: ${newData.banque},
                              Numéro de compte: ${newData.numero_compte},
                              Solde actuel: ${newData.solde_actuel}
                              `,
                            id_employe: req.employee.id,
                          },
                          (error, modification) => {}
                        );

                        return res
                          .status(200)
                          .json({ status: 200, existingSoldeCourant });
                      });
                    } else {
                      return res.status(406).json({
                        status: 406,
                        error:
                          "Des transactions ont été déjà faites au niveau de la banque",
                      });
                    }
                  }
                );
              } else {
                existingSoldeCourant = {
                  ...existingSoldeCourant,
                  ...updatedData,
                };

                newData = existingSoldeCourant;

                existingSoldeCourant = new SoldeCourant(
                  existingSoldeCourant.id,
                  existingSoldeCourant.banque,
                  existingSoldeCourant.numero_compte,
                  existingSoldeCourant.solde_actuel,
                  existingSoldeCourant.date_ajout
                );
                existingSoldeCourant.update((updateError) => {
                  if (updateError) {
                    return res.status(500).json({
                      status: 500,
                      error: "Erreur lors de la mise à jour du solde courant",
                    });
                  }

                  Modifications.create(
                    {
                      modification: `Modification des données d'une banque`,
                      details: `
                        Anciennes données::
                        Banque: ${previousData.banque},
                        Numéro de compte: ${previousData.numero_compte},
                        Solde actuel: ${previousData.solde_actuel}
                        a57aa2b90d9bbb0524e51b458577767ab2823507b877e9aedfd885bb12b5d7ed980dd63abad043be6beff172d6c47678d68a502778a617e57b3e7fd0b0952f47
                        Nouvelles données::
                        Banque: ${newData.banque},
                        Numéro de compte: ${newData.numero_compte},
                        Solde actuel: ${newData.solde_actuel}
                        `,
                      id_employe: req.employee.id,
                    },
                    (error, modification) => {}
                  );

                  return res
                    .status(200)
                    .json({ status: 200, existingSoldeCourant });
                });
              }
            }
          });
        else if (
          existingSoldeCourant.solde_actuel != updatedData.solde_actuel
        ) {
          ActivitesBanque.getAllByBanqueID(
            updatedData.id_banque,
            (getAllBanqueError, activitesBanque) => {
              if (getAllBanqueError) {
                return res.status(500).json({
                  status: 500,
                  error: "Erreur lors de la mise à jour du solde courant",
                });
              }
              if (activitesBanque.length == 0) {
                existingSoldeCourant = {
                  ...existingSoldeCourant,
                  ...updatedData,
                };

                newData = existingSoldeCourant;

                existingSoldeCourant = new SoldeCourant(
                  existingSoldeCourant.id,
                  existingSoldeCourant.banque,
                  existingSoldeCourant.numero_compte,
                  existingSoldeCourant.solde_actuel,
                  existingSoldeCourant.date_ajout
                );
                existingSoldeCourant.update((updateError) => {
                  if (updateError) {
                    return res.status(500).json({
                      status: 500,
                      error: "Erreur lors de la mise à jour du solde courant",
                    });
                  }

                  Modifications.create(
                    {
                      modification: `Modification des données d'une banque`,
                      details: `
                        Anciennes données::
                        Banque: ${previousData.banque},
                        Numéro de compte: ${previousData.numero_compte},
                        Solde actuel: ${previousData.solde_actuel}
                        a57aa2b90d9bbb0524e51b458577767ab2823507b877e9aedfd885bb12b5d7ed980dd63abad043be6beff172d6c47678d68a502778a617e57b3e7fd0b0952f47
                        Nouvelles données::
                        Banque: ${newData.banque},
                        Numéro de compte: ${newData.numero_compte},
                        Solde actuel: ${newData.solde_actuel}
                        `,
                      id_employe: req.employee.id,
                    },
                    (error, modification) => {}
                  );

                  return res
                    .status(200)
                    .json({ status: 200, existingSoldeCourant });
                });
              } else {
                return res.status(406).json({
                  status: 406,
                  error:
                    "Des transactions ont été déjà faites au niveau de la banque",
                });
              }
            }
          );
        }
      } else {
        existingSoldeCourant = { ...existingSoldeCourant, ...updatedData };

        newData = existingSoldeCourant;

        existingSoldeCourant = new SoldeCourant(
          existingSoldeCourant.id,
          existingSoldeCourant.banque,
          existingSoldeCourant.numero_compte,
          existingSoldeCourant.solde_actuel,
          existingSoldeCourant.date_ajout
        );
        existingSoldeCourant.update((updateError) => {
          if (updateError) {
            return res.status(500).json({
              status: 500,
              error: "Erreur lors de la mise à jour du solde courant",
            });
          }

          Modifications.create(
            {
              modification: `Modification des données d'une banque`,
              details: `
                Anciennes données::
                Banque: ${previousData.banque},
                Numéro de compte: ${previousData.numero_compte},
                Solde actuel: ${previousData.solde_actuel}
                a57aa2b90d9bbb0524e51b458577767ab2823507b877e9aedfd885bb12b5d7ed980dd63abad043be6beff172d6c47678d68a502778a617e57b3e7fd0b0952f47
                Nouvelles données::
                Banque: ${newData.banque},
                Numéro de compte: ${newData.numero_compte},
                Solde actuel: ${newData.solde_actuel}
                `,
              id_employe: req.employee.id,
            },
            (error, modification) => {}
          );

          return res.status(200).json({ status: 200, existingSoldeCourant });
        });
      }
    });
  };

  // Supprimer un solde courant par ID
  static delete = (req, res) => {
    const id = req.params.id;
    SoldeCourant.getById(id, (getError, existingSoldeCourant) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération du solde courant",
        });
      }
      if (!existingSoldeCourant) {
        return res
          .status(404)
          .json({ status: 404, error: "Solde courant non trouvé" });
      }
      existingSoldeCourant.delete((deleteError, id) => {
        if (!id) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la suppression du solde courant",
          });
        }
        return res.status(204).json({ status: 204, id });
      });
    });
  };
}

module.exports = SoldeCourantController;
