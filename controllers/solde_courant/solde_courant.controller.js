const SoldeCourant = require("../../models/solde_courant/solde_courant.model");

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

      console.log("exist", exist);
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
      existingSoldeCourant = { ...existingSoldeCourant, ...updatedData };

      // existingSoldeCourant

      existingSoldeCourant.update((updateError) => {
        if (updateError) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la mise à jour du solde courant",
          });
        }
        return res.status(200).json({ status: 200, existingSoldeCourant });
      });
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
