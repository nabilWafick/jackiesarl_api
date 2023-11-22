const connection = require("../_db/database");

class Employes {
  constructor(
    id,
    nom,
    prenoms,
    email,
    numero_telephone,
    password,
    role,
    permissions,
    token,
    date_ajout
  ) {
    this.id = id;
    this.nom = nom;
    this.prenoms = prenoms;
    this.email = email;
    this.numero_telephone = numero_telephone;
    this.password = password;
    this.role = role;
    (this.permissions = permissions), (this.token = token);
    this.date_ajout = date_ajout;
  }

  static create(employeData, callback) {
    const employeeDefaultPermissions = {
      admin: false,

      "lire-tableau-bord": true,
      "imprimer-interface": false,

      "ajouter-client": false,
      "lire-client": true,
      "modifier-client": false,
      "supprimer-client": false,

      "lire-solde-client": true,
      "lire-avances-clients": true,
      "lire-creances-clients": true,

      "ajouter-achat-client": false,
      "lire-achat-client": true,
      "modifier-achat-client": false,
      "supprimer-achat-client": false,

      "ajouter-paiement-client": false,
      "lire-paiement-client": true,
      "modifier-paiement-client": false,
      "supprimer-paiement-client": false,

      "ajouter-remise-cheque-client": false,
      "lire-remise-cheque-client": true,
      "modifier-remise-cheque-client": false,
      "supprimer-remise-cheque-client": false,

      "ajouter-stock-bon-commande": false,
      "lire-stock-bon-commande": true,
      "modifier-stock-bon-commande": false,
      "supprimer-stock-bon-commande": false,

      "ajouter-stock-camion": false,
      "lire-stock-camion": true,
      "modifier-stock-camion": false,
      "supprimer-stock-camion": false,

      "ajouter-achat-entreprise": false,
      "lire-achat-entreprise": true,
      "modifier-achat-entreprise": false,
      "supprimer-achat-entreprise": false,

      "ajouter-modification": false,
      "lire-modification": true,
      "modifier-modification": false,
      "supprimer-modification": false,

      "ajouter-brouillard": false,
      "lire-brouillard": true,
      "modifier-brouillard": false,
      "supprimer-brouillard": false,

      "ajouter-activite-depot": false,
      "lire-activite-depot": true,
      "modifier-activite-depot": false,
      "supprimer-activite-depot": false,

      "ajouter-depense": false,
      "lire-depense": true,
      "modifier-depense": false,
      "supprimer-depense": false,

      "ajouter-rapport": false,
      "lire-rapport": true,
      "modifier-rapport": false,
      "supprimer-rapport": false,

      "ajouter-commande": false,
      "lire-commande": true,
      "modifier-commande": false,
      "supprimer-commande": false,

      "ajouter-solde-courant": false,
      "lire-solde-courant": true,
      "modifier-solde-courant": false,
      "supprimer-solde-courant": false,

      "ajouter-activite-banque": false,
      "lire-activite-banque": true,
      "modifier-activite-banque": false,
      "supprimer-activite-banque": false,

      "ajouter-facture-mecef": false,
      "lire-facture-mecef": true,
      "modifier-facture-mecef": false,
      "supprimer-facture-mecef": false,
    };

    const query =
      "INSERT INTO employes (id, nom, prenoms, email, numero_telephone, password, role, permissions, token, date_ajout) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?,?)";

    //  console.log("employeeDefaultPermissions", employeeDefaultPermissions);

    connection.query(
      query,
      [
        employeData.nom,
        employeData.prenoms,
        employeData.email,
        employeData.numero_telephone,
        employeData.password,
        employeData.role,
        JSON.stringify(employeeDefaultPermissions),
        employeData.token,
        new Date(),
      ],
      (error, results) => {
        if (error) {
          console.log(error);
          return callback(error, null);
        }
        const newEmploye = new Employes(
          results.insertId,
          ...Object.values(employeData),
          "User Token",
          new Date()
        );
        return callback(null, newEmploye);
      }
    );
  }

  static getById(id, callback) {
    const query = "SELECT * FROM employes WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Employé non trouvé
      }
      const employeData = results[0];
      const employe = new Employes(
        employeData.id,
        employeData.nom,
        employeData.prenoms,
        employeData.email,
        employeData.numero_telephone,
        employeData.password,
        employeData.role,
        employeData.permissions,
        employeData.token,
        employeData.date_ajout
      );
      return callback(null, employe);
    });
  }

  static getByEmail(email, callback) {
    // console.log("getByEmail");
    const query = "SELECT * FROM employes WHERE email = ?";
    connection.query(query, [email], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Employé non trouvé
      }
      const employeData = results[0];
      const employe = new Employes(
        employeData.id,
        employeData.nom,
        employeData.prenoms,
        employeData.email,
        employeData.numero_telephone,
        employeData.password,
        employeData.role,
        employeData.permissions,
        employeData.token,
        employeData.date_ajout
      );
      return callback(null, employe);
    });
  }

  static getAll(callback) {
    const query = "SELECT * FROM employes ORDER BY id DESC";
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const employesList = results.map((employeData) => {
        return new Employes(
          employeData.id,
          employeData.nom,
          employeData.prenoms,
          employeData.email,
          employeData.numero_telephone,
          " employee password",
          employeData.role,
          employeData.permissions,
          "employee token",
          employeData.date_ajout
        );
      });
      return callback(null, employesList);
    });
  }

  update(callback) {
    const query =
      "UPDATE employes SET nom = ?, prenoms = ?, email = ?, numero_telephone = ?,password = ?, role = ?, permissions = ?,token = ?, date_ajout = ? WHERE id = ?";
    const { id, ...updatedData } = this;
    //console.log("updated data json", JSON.stringify(updatedData.permissions));
    connection.query(
      query,
      [
        updatedData.nom,
        updatedData.prenoms,
        updatedData.email,
        updatedData.numero_telephone,
        updatedData.password,
        updatedData.role,
        JSON.stringify(updatedData.permissions),
        updatedData.token,
        new Date(updatedData.date_ajout),
        id,
      ],
      (error, results) => {
        if (error) {
          //  console.log("update error", error);
          return callback(error);
        }
        //  console.log("updated successfuly");
        return callback(null);
      }
    );
  }

  delete(callback) {
    const query = "DELETE FROM employes WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, id);
    });
  }
}

module.exports = Employes;
