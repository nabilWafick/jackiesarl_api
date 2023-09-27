const RemiseChequeClient = require('../../models/remise_cheque_client/remise_cheque_client.model');


class RemiseChequeClientController{

// Créer une nouvelle remise de chèque client
static create = (req, res) => {
  const remiseChequeClientData = req.body;
  RemiseChequeClient.create(remiseChequeClientData, (error, remiseChequeClient) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la création de la remise de chèque client' });
    }
    return res.status(201).json(remiseChequeClient);
  });
};

// Récupérer une remise de chèque client par ID
static getById = (req, res) => {
  const id = req.params.id;
  RemiseChequeClient.getById(id, (error, remiseChequeClient) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de la remise de chèque client' });
    }
    if (!remiseChequeClient) {
      return res.status(404).json({ error: 'Remise de chèque client non trouvée' });
    }
    return res.status(200).json(remiseChequeClient);
  });
};

static getAll = (req, res) => {
  RemiseChequeClient.getAll((error, remisesChequeClient) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des remises de chèques clients' });
    }
    return res.status(200).json(remisesChequeClient);
  });
};


// Mettre à jour une remise de chèque client par ID
static update = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  RemiseChequeClient.getById(id, (getError, existingRemiseChequeClient) => {
    if (getError) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de la remise de chèque client' });
    }
    if (!existingRemiseChequeClient) {
      return res.status(404).json({ error: 'Remise de chèque client non trouvée' });
    }
    existingRemiseChequeClient = { ...existingRemiseChequeClient, ...updatedData };
    existingRemiseChequeClient.update((updateError) => {
      if (updateError) {
        return res.status(500).json({ error: 'Erreur lors de la mise à jour de la remise de chèque client' });
      }
      return res.status(200).json(existingRemiseChequeClient);
    });
  });
};

// Supprimer une remise de chèque client par ID
static delete = (req, res) => {
  const id = req.params.id;
  RemiseChequeClient.getById(id, (getError, existingRemiseChequeClient) => {
    if (getError) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de la remise de chèque client' });
    }
    if (!existingRemiseChequeClient) {
      return res.status(404).json({ error: 'Remise de chèque client non trouvée' });
    }
    existingRemiseChequeClient.delete((deleteError) => {
      if (deleteError) {
        return res.status(500).json({ error: 'Erreur lors de la suppression de la remise de chèque client' });
      }
      return res.status(204).end();
    });
  });
};

}

module.exports=RemiseChequeClientController