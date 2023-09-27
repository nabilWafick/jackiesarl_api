const Employes = require('../../models/employes/employes.models');



class EmployesController{

// Créer un nouvel employé
static create = (req, res) => {
  const employeData = req.body;
  Employes.create(employeData, (error, employe) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la création de l\'employé' });
    }
    return res.status(201).json(employe);
  });
};

// Récupérer un employé par ID
static getById = (req, res) => {
  const id = req.params.id;
  Employes.getById(id, (error, employe) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de l\'employé' });
    }
    if (!employe) {
      return res.status(404).json({ error: 'Employé non trouvé' });
    }
    return res.status(200).json(employe);
  });
};

static getAll = (req, res) => {
  Employes.getAll((error, employes) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des employés' });
    }
    return res.status(200).json(employes);
  });
};


// Mettre à jour un employé par ID
static update = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  Employes.getById(id, (getError, existingEmploye) => {
    if (getError) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de l\'employé' });
    }
    if (!existingEmploye) {
      return res.status(404).json({ error: 'Employé non trouvé' });
    }
    existingEmploye = { ...existingEmploye, ...updatedData };
    existingEmploye.update((updateError) => {
      if (updateError) {
        return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'employé' });
      }
      return res.status(200).json(existingEmploye);
    });
  });
};

// Supprimer un employé par ID
static delete = (req, res) => {
  const id = req.params.id;
  Employes.getById(id, (getError, existingEmploye) => {
    if (getError) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de l\'employé' });
    }
    if (!existingEmploye) {
      return res.status(404).json({ error: 'Employé non trouvé' });
    }
    existingEmploye.delete((deleteError) => {
      if (deleteError) {
        return res.status(500).json({ error: 'Erreur lors de la suppression de l\'employé' });
      }
      return res.status(204).end();
    });
  });
};


}

module.exports = EmployesController