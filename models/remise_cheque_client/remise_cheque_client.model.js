const connection = require("../_db/database");

class RemiseChequeClient {
  constructor(
    id,
    description,
    banque,
    montant,
    reste,
    est_validee,
    id_client,
    date_remise
  ) {
    this.id = id;
    this.description = description;
    this.banque = banque;
    this.montant = montant;
    this.reste = reste;
    this.est_validee = est_validee;
    this.id_client = id_client;
    this.date_remise = date_remise;
  }

  static create(remiseData, callback) {
    const query =
      "INSERT INTO remise_cheque_client (id, description, banque, montant, reste, est_validee, id_client, date_remise) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)";
    const currentDate = new Date();
    connection.query(
      query,
      [
        remiseData.description,
        remiseData.banque,
        remiseData.montant,
        remiseData.reste,
        remiseData.est_validee,
        remiseData.id_client,
        currentDate,
      ],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const newRemise = new RemiseChequeClient(
          results.insertId,
          ...Object.values(remiseData),
          currentDate
        );
        return callback(null, newRemise);
      }
    );
  }

  static getById(id, callback) {
    const query = "SELECT * FROM remise_cheque_client WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Remise de chèque client non trouvée
      }
      const remiseData = results[0];
      const remise = new RemiseChequeClient(
        remiseData.id,
        remiseData.description,
        remiseData.banque,
        remiseData.montant,
        remiseData.reste,
        remiseData.est_validee,
        remiseData.id_client,
        remiseData.date_remise
      );
      return callback(null, remise);
    });
  }

  static getAll(callback) {
    const query = "SELECT * FROM remise_cheque_client";
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const remisesList = results.map((remiseData) => {
        return new RemiseChequeClient(
          remiseData.id,
          remiseData.description,
          remiseData.banque,
          remiseData.montant,
          remiseData.reste,
          remiseData.est_validee,
          remiseData.id_client,
          remiseData.date_remise
        );
      });
      return callback(null, remisesList);
    });
  }

  static getAllOfClient(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? ORDER BY id DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const remisesList = results.map((remiseData) => {
            return new RemiseChequeClient(
              remiseData.id,
              remiseData.description,
              remiseData.banque,
              remiseData.montant,
              remiseData.reste,
              remiseData.est_validee,
              remiseData.id_client,
              remiseData.date_remise
            );
          });
          return callback(null, remisesList);
        }
      );
    } else {
      const query =
        "SELECT * FROM remise_cheque_client WHERE id_client = ? ORDER BY id DESC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const remisesList = results.map((remiseData) => {
          return new RemiseChequeClient(
            remiseData.id,
            remiseData.description,
            remiseData.banque,
            remiseData.montant,
            remiseData.reste,
            remiseData.est_validee,
            remiseData.id_client,
            remiseData.date_remise
          );
        });
        return callback(null, remisesList);
      });
    }
  }

  static getAllOfClientFromOldToNew(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? ORDER BY id ASC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const remisesList = results.map((remiseData) => {
            return new RemiseChequeClient(
              remiseData.id,
              remiseData.description,
              remiseData.banque,
              remiseData.montant,
              remiseData.reste,
              remiseData.est_validee,
              remiseData.id_client,
              remiseData.date_remise
            );
          });
          return callback(null, remisesList);
        }
      );
    } else {
      const query =
        "SELECT * FROM remise_cheque_client WHERE id_client = ? ORDER BY id ASC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const remisesList = results.map((remiseData) => {
          return new RemiseChequeClient(
            remiseData.id,
            remiseData.description,
            remiseData.banque,
            remiseData.montant,
            remiseData.reste,
            remiseData.est_validee,
            remiseData.id_client,
            remiseData.date_remise
          );
        });
        return callback(null, remisesList);
      });
    }
  }

  static getAllOfClientFromNewToOld(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? ORDER BY id DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const remisesList = results.map((remiseData) => {
            return new RemiseChequeClient(
              remiseData.id,
              remiseData.description,
              remiseData.banque,
              remiseData.montant,
              remiseData.reste,
              remiseData.est_validee,
              remiseData.id_client,
              remiseData.date_remise
            );
          });
          return callback(null, remisesList);
        }
      );
    } else {
      const query =
        "SELECT * FROM remise_cheque_client WHERE id_client = ? ORDER BY id DESC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const remisesList = results.map((remiseData) => {
          return new RemiseChequeClient(
            remiseData.id,
            remiseData.description,
            remiseData.banque,
            remiseData.montant,
            remiseData.reste,
            remiseData.est_validee,
            remiseData.id_client,
            remiseData.date_remise
          );
        });
        return callback(null, remisesList);
      });
    }
  }

  static getAllOfClientMoreImportant(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? ORDER BY montant DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const remisesList = results.map((remiseData) => {
            return new RemiseChequeClient(
              remiseData.id,
              remiseData.description,
              remiseData.banque,
              remiseData.montant,
              remiseData.reste,
              remiseData.est_validee,
              remiseData.id_client,
              remiseData.date_remise
            );
          });
          return callback(null, remisesList);
        }
      );
    } else {
      const query =
        "SELECT * FROM remise_cheque_client WHERE id_client = ? ORDER BY montant DESC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const remisesList = results.map((remiseData) => {
          return new RemiseChequeClient(
            remiseData.id,
            remiseData.description,
            remiseData.banque,
            remiseData.montant,
            remiseData.reste,
            remiseData.est_validee,
            remiseData.id_client,
            remiseData.date_remise
          );
        });
        return callback(null, remisesList);
      });
    }
  }

  static getAllOfClientLessImportant(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? ORDER BY montant ASC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const remisesList = results.map((remiseData) => {
            return new RemiseChequeClient(
              remiseData.id,
              remiseData.description,
              remiseData.banque,
              remiseData.montant,
              remiseData.reste,
              remiseData.est_validee,
              remiseData.id_client,
              remiseData.date_remise
            );
          });
          return callback(null, remisesList);
        }
      );
    } else {
      const query =
        "SELECT * FROM remise_cheque_client WHERE id_client = ? ORDER BY montant ASC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const remisesList = results.map((remiseData) => {
          return new RemiseChequeClient(
            remiseData.id,
            remiseData.description,
            remiseData.banque,
            remiseData.montant,
            remiseData.reste,
            remiseData.est_validee,
            remiseData.id_client,
            remiseData.date_remise
          );
        });
        return callback(null, remisesList);
      });
    }
  }

  static getAllOfClientValidated(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? AND est_validee = 1 ORDER BY id DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const remisesList = results.map((remiseData) => {
            return new RemiseChequeClient(
              remiseData.id,
              remiseData.description,
              remiseData.banque,
              remiseData.montant,
              remiseData.reste,
              remiseData.est_validee,
              remiseData.id_client,
              remiseData.date_remise
            );
          });
          return callback(null, remisesList);
        }
      );
    } else {
      const query =
        "SELECT * FROM remise_cheque_client WHERE id_client = ? AND est_validee = 1 ORDER BY id DESC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const remisesList = results.map((remiseData) => {
          return new RemiseChequeClient(
            remiseData.id,
            remiseData.description,
            remiseData.banque,
            remiseData.montant,
            remiseData.reste,
            remiseData.est_validee,
            remiseData.id_client,
            remiseData.date_remise
          );
        });
        return callback(null, remisesList);
      });
    }
  }

  static getAllOfClientUnvalidated(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? AND est_validee = 0 ORDER BY id DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const remisesList = results.map((remiseData) => {
            return new RemiseChequeClient(
              remiseData.id,
              remiseData.description,
              remiseData.banque,
              remiseData.montant,
              remiseData.reste,
              remiseData.est_validee,
              remiseData.id_client,
              remiseData.date_remise
            );
          });
          return callback(null, remisesList);
        }
      );
    } else {
      const query =
        "SELECT * FROM remise_cheque_client WHERE id_client = ? AND est_validee = 0 ORDER BY id DESC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const remisesList = results.map((remiseData) => {
          return new RemiseChequeClient(
            remiseData.id,
            remiseData.description,
            remiseData.banque,
            remiseData.montant,
            remiseData.reste,
            remiseData.est_validee,
            remiseData.id_client,
            remiseData.date_remise
          );
        });
        return callback(null, remisesList);
      });
    }
  }

  static getAllOfClientRestLessImportant(
    startDate,
    endDate,
    id_client,
    callback
  ) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? ORDER BY reste ASC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const remisesList = results.map((remiseData) => {
            return new RemiseChequeClient(
              remiseData.id,
              remiseData.description,
              remiseData.banque,
              remiseData.montant,
              remiseData.reste,
              remiseData.est_validee,
              remiseData.id_client,
              remiseData.date_remise
            );
          });
          return callback(null, remisesList);
        }
      );
    } else {
      const query =
        "SELECT * FROM remise_cheque_client WHERE id_client = ? ORDER BY reste ASC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const remisesList = results.map((remiseData) => {
          return new RemiseChequeClient(
            remiseData.id,
            remiseData.description,
            remiseData.banque,
            remiseData.montant,
            remiseData.reste,
            remiseData.est_validee,
            remiseData.id_client,
            remiseData.date_remise
          );
        });
        return callback(null, remisesList);
      });
    }
  }

  static getAllOfClientRestMoreImportant(
    startDate,
    endDate,
    id_client,
    callback
  ) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? ORDER BY reste DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const remisesList = results.map((remiseData) => {
            return new RemiseChequeClient(
              remiseData.id,
              remiseData.description,
              remiseData.banque,
              remiseData.montant,
              remiseData.reste,
              remiseData.est_validee,
              remiseData.id_client,
              remiseData.date_remise
            );
          });
          return callback(null, remisesList);
        }
      );
    } else {
      const query =
        "SELECT * FROM remise_cheque_client WHERE id_client = ? ORDER BY reste DESC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const remisesList = results.map((remiseData) => {
          return new RemiseChequeClient(
            remiseData.id,
            remiseData.description,
            remiseData.banque,
            remiseData.montant,
            remiseData.reste,
            remiseData.est_validee,
            remiseData.id_client,
            remiseData.date_remise
          );
        });
        return callback(null, remisesList);
      });
    }
  }

  static getAllOfClientBOABank(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? AND banque = 'BOA' ORDER BY id DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const remisesList = results.map((remiseData) => {
            return new RemiseChequeClient(
              remiseData.id,
              remiseData.description,
              remiseData.banque,
              remiseData.montant,
              remiseData.reste,
              remiseData.est_validee,
              remiseData.id_client,
              remiseData.date_remise
            );
          });
          return callback(null, remisesList);
        }
      );
    } else {
      const query =
        "SELECT * FROM remise_cheque_client WHERE id_client = ? AND banque = 'BOA' ORDER BY id DESC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const remisesList = results.map((remiseData) => {
          return new RemiseChequeClient(
            remiseData.id,
            remiseData.description,
            remiseData.banque,
            remiseData.montant,
            remiseData.reste,
            remiseData.est_validee,
            remiseData.id_client,
            remiseData.date_remise
          );
        });
        return callback(null, remisesList);
      });
    }
  }

  static getAllOfClientUBABank(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? AND banque = 'UBA' ORDER BY id DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const remisesList = results.map((remiseData) => {
            return new RemiseChequeClient(
              remiseData.id,
              remiseData.description,
              remiseData.banque,
              remiseData.montant,
              remiseData.reste,
              remiseData.est_validee,
              remiseData.id_client,
              remiseData.date_remise
            );
          });
          return callback(null, remisesList);
        }
      );
    } else {
      const query =
        "SELECT * FROM remise_cheque_client WHERE id_client = ? AND banque = 'UBA' ORDER BY id DESC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const remisesList = results.map((remiseData) => {
          return new RemiseChequeClient(
            remiseData.id,
            remiseData.description,
            remiseData.banque,
            remiseData.montant,
            remiseData.reste,
            remiseData.est_validee,
            remiseData.id_client,
            remiseData.date_remise
          );
        });
        return callback(null, remisesList);
      });
    }
  }

  static getAllOfClientNSIABank(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? AND banque = 'NSIA' ORDER BY id DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const remisesList = results.map((remiseData) => {
            return new RemiseChequeClient(
              remiseData.id,
              remiseData.description,
              remiseData.banque,
              remiseData.montant,
              remiseData.reste,
              remiseData.est_validee,
              remiseData.id_client,
              remiseData.date_remise
            );
          });
          return callback(null, remisesList);
        }
      );
    } else {
      const query =
        "SELECT * FROM remise_cheque_client WHERE id_client = ? AND banque = 'NSIA' ORDER BY id DESC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const remisesList = results.map((remiseData) => {
          return new RemiseChequeClient(
            remiseData.id,
            remiseData.description,
            remiseData.banque,
            remiseData.montant,
            remiseData.reste,
            remiseData.est_validee,
            remiseData.id_client,
            remiseData.date_remise
          );
        });
        return callback(null, remisesList);
      });
    }
  }

  static getAllOfClientBGFIBank(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? AND banque = 'BGFI' ORDER BY id DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const remisesList = results.map((remiseData) => {
            return new RemiseChequeClient(
              remiseData.id,
              remiseData.description,
              remiseData.banque,
              remiseData.montant,
              remiseData.reste,
              remiseData.est_validee,
              remiseData.id_client,
              remiseData.date_remise
            );
          });
          return callback(null, remisesList);
        }
      );
    } else {
      const query =
        "SELECT * FROM remise_cheque_client WHERE id_client = ? AND banque = 'BGFI' ORDER BY id DESC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const remisesList = results.map((remiseData) => {
          return new RemiseChequeClient(
            remiseData.id,
            remiseData.description,
            remiseData.banque,
            remiseData.montant,
            remiseData.reste,
            remiseData.est_validee,
            remiseData.id_client,
            remiseData.date_remise
          );
        });
        return callback(null, remisesList);
      });
    }
  }

  static getAllOfClientSGBBank(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? AND banque = 'SGB' ORDER BY id DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const remisesList = results.map((remiseData) => {
            return new RemiseChequeClient(
              remiseData.id,
              remiseData.description,
              remiseData.banque,
              remiseData.montant,
              remiseData.reste,
              remiseData.est_validee,
              remiseData.id_client,
              remiseData.date_remise
            );
          });
          return callback(null, remisesList);
        }
      );
    } else {
      const query =
        "SELECT * FROM remise_cheque_client WHERE id_client = ? AND banque = 'SGB' ORDER BY id DESC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const remisesList = results.map((remiseData) => {
          return new RemiseChequeClient(
            remiseData.id,
            remiseData.description,
            remiseData.banque,
            remiseData.montant,
            remiseData.reste,
            remiseData.est_validee,
            remiseData.id_client,
            remiseData.date_remise
          );
        });
        return callback(null, remisesList);
      });
    }
  }

  static getAllOfClientEcobankBank(startDate, endDate, id_client, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? AND banque = 'Ecobank' ORDER BY id DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate), id_client],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const remisesList = results.map((remiseData) => {
            return new RemiseChequeClient(
              remiseData.id,
              remiseData.description,
              remiseData.banque,
              remiseData.montant,
              remiseData.reste,
              remiseData.est_validee,
              remiseData.id_client,
              remiseData.date_remise
            );
          });
          return callback(null, remisesList);
        }
      );
    } else {
      const query =
        "SELECT * FROM remise_cheque_client WHERE id_client = ? AND banque = 'Ecobank' ORDER BY id DESC";
      connection.query(query, [id_client], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const remisesList = results.map((remiseData) => {
          return new RemiseChequeClient(
            remiseData.id,
            remiseData.description,
            remiseData.banque,
            remiseData.montant,
            remiseData.reste,
            remiseData.est_validee,
            remiseData.id_client,
            remiseData.date_remise
          );
        });
        return callback(null, remisesList);
      });
    }
  }

  update(callback) {
    const query =
      "UPDATE remise_cheque_client SET description = ?, banque = ?, montant = ?, reste = ?, est_validee = ?, id_client = ?, date_remise = ? WHERE id = ?";
    const { id, ...updatedData } = this;
    connection.query(
      query,
      [...Object.values(updatedData), id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null);
      }
    );
  }

  delete(callback) {
    const query = "DELETE FROM remise_cheque_client WHERE id = ?";
    connection.query(query, [this.id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, this.id);
    });
  }
}

module.exports = RemiseChequeClient;
