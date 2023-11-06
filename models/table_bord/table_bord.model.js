// ========= Achat Entreprise Journaliere

/**
 SELECT COALESCE(SUM(CASE WHEN categorie = 'CIM BENIN' THEN quantite_achetee ELSE 0 END),0)
AS total_achat_entreprise_journaliere_CIMBENIN,
COALESCE(SUM(CASE WHEN categorie = 'NOCIBE' THEN quantite_achetee ELSE 0 END),0)
AS total_achat_entreprise_journaliere_NOCIBE
FROM achat_entreprise
WHERE DATE(date_achat) = CURDATE();

 */

// ======== Statistique Vente Semaine

/**
 
 SELECT DISTINCT CASE 
    WHEN jours.days = 'Monday' THEN 'Lundi'
    WHEN jours.days = 'Tuesday' THEN 'Mardi'
    WHEN jours.days = 'Wednesday' THEN 'Mercredi'
    WHEN jours.days = 'Thursday' THEN 'Jeudi'
    WHEN jours.days = 'Friday' THEN 'Vendredi'
    WHEN jours.days = 'Saturday' THEN 'Samedi'
    WHEN jours.days = 'Sunday' THEN 'Dimanche'
  END AS jours, COALESCE(SUM(achat_client.montant),0) as total_achat, achat_client.date_achat from jours
LEFT JOIN achat_client
ON jours.days = DAYNAME(achat_client.date_achat)
AND WEEK(achat_client.date_achat) = WEEK(CURRENT_DATE)
GROUP by jours.days ORDER BY
  FIELD(jours,'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 
  'Samedi')

  */

// ========== Statistique de Paiement Semaine

/**

 SELECT DISTINCT CASE 
    WHEN jours.days = 'Monday' THEN 'Lundi'
    WHEN jours.days = 'Tuesday' THEN 'Mardi'
    WHEN jours.days = 'Wednesday' THEN 'Mercredi'
    WHEN jours.days = 'Thursday' THEN 'Jeudi'
    WHEN jours.days = 'Friday' THEN 'Vendredi'
    WHEN jours.days = 'Saturday' THEN 'Samedi'
    WHEN jours.days = 'Sunday' THEN 'Dimanche'
  END AS jours, COALESCE(SUM(paiement_client.montant),0) as total_paiement from jours
LEFT JOIN paiement_client
ON jours.days = DAYNAME(paiement_client.date_paiement)
AND WEEK(paiement_client.date_paiement) = WEEK(CURRENT_DATE) AND paiement_client.est_valide =1
GROUP by jours.days ORDER BY
  FIELD(jours,'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi')

 */

// ============ Total Vente Journee

/* 

 SELECT SUM(montant) AS total_vente_journaliere
FROM achat_client
WHERE DATE(date_achat) = CURDATE()

*/

// ============= Total Clients Inscrits Journalier

/*

SELECT COUNT(*) AS total_clients_inscris
FROM clients
WHERE DATE(date_ajout) = CURDATE()

*/

// ============== Total Paiement Journalier

/**
 
SELECT SUM(montant) AS total_paiement_journaliere
FROM paiement_client
WHERE DATE(date_paiement) = CURDATE()

 */

// =========== Paiement Journalier CIM BENIN && NOCIBE

/**
 *SELECT COALESCE(SUM(CASE WHEN categorie = 'CIM BENIN' THEN montant ELSE 0 END),0)
AS total_paiement_journaliere_CIMBENIN,
COALESCE(SUM(CASE WHEN categorie = 'NOCIBE' THEN montant ELSE 0 END),0)
AS total_paiement_journaliere_NOCIBE
FROM paiement_client
WHERE DATE(date_paiement) = CURDATE() 
AND est_valide = 1
 */

// Vente Journaliere CIM BENIN && NOCIBE

/**

SELECT COALESCE(SUM(CASE WHEN categorie = 'CIM BENIN' THEN quantite_achetee ELSE 0 END),0)
AS total_vente_journaliere_CIMBENIN,
COALESCE(SUM(CASE WHEN categorie = 'NOCIBE' THEN quantite_achetee ELSE 0 END),0)
AS total_vente_journaliere_NOCIBE
FROM achat_client
WHERE DATE(date_achat) = CURDATE();


 */

// Commandes Non traitees Journaliere

/**
 
 SELECT COALESCE(SUM(CASE WHEN categorie = 'CIM BENIN' THEN 1 ELSE 0 END),0)
AS commande_journaliere_traitee_CIMBENIN,
COALESCE(SUM(CASE WHEN categorie = 'NOCIBE' THEN 1 ELSE 0 END),0)
AS commande_journaliere_traitee_NOCIBE
FROM commandes
WHERE DATE(date_commande) = CURDATE()
AND est_traitee = 0;

 
 */

// Commandes  Traitees Journaliere

/**
 
 SELECT COALESCE(SUM(CASE WHEN categorie = 'CIM BENIN' THEN 1 ELSE 0 END),0)
AS commande_journaliere_traitee_CIMBENIN,
COALESCE(SUM(CASE WHEN categorie = 'NOCIBE' THEN 1 ELSE 0 END),0)
AS commande_journaliere_traitee_NOCIBE
FROM commandes
WHERE DATE(date_commande) = CURDATE()
AND est_traitee = 1;

 
 */

// ======== Paiement Banque Journalier

/**
 
SELECT

COALESCE(SUM(montant),0)
AS total_paiement_journaliere,

COALESCE(SUM(CASE WHEN banque = 'BOA' THEN montant ELSE 0 END),0)
AS total_paiement_journaliere_BOA,

COALESCE(SUM(CASE WHEN banque = 'UBA' THEN montant ELSE 0 END),0)
AS total_paiement_journaliere_UBA,

COALESCE(SUM(CASE WHEN banque = 'Ecobank' THEN montant ELSE 0 END),0)
AS total_paiement_journaliere_Ecokank,

COALESCE(SUM(CASE WHEN banque = 'NSIA' THEN montant ELSE 0 END),0)
AS total_paiement_journaliere_NSIA,

COALESCE(SUM(CASE WHEN banque = 'SGB' THEN montant ELSE 0 END),0)
AS total_paiement_journaliere_SGB,

COALESCE(SUM(CASE WHEN banque = 'BGFI' THEN montant ELSE 0 END),0)
AS total_paiement_journaliere_BGFI

FROM paiement_client

WHERE DATE(date_paiement) = CURDATE() 

AND est_valide = 1


 */

//  ======= Stock Bon Commande Journalier

/**

SELECT COALESCE(SUM(CASE WHEN categorie = 'CIM BENIN' AND date_rechargement <> CURDATE()
                    THEN stock_apres_vente ELSE 0 END),0)
AS stock_bon_commande_journaliere_CIMBENIN,
COALESCE(SUM(CASE WHEN categorie = 'NOCIBE' AND date_rechargement <> CURDATE()
             THEN stock_apres_vente ELSE 0 END),0)
AS stock_bon_commande_journaliere_NOCIBE
FROM stock_bon_commande

 */

// Total Achat Hier  -- pour determiner le stock bon de commande hier (avant vente  aujourd'hui)

/**
 * 
 * SELECT categories.category, 
COALESCE(total_achat_hier.total_achat_CIMBENIN) AS total_achat_CIMBENIN,
COALESCE(total_achat_hier.total_achat_NOCIBE) AS total_achat_NOCIBE
FROM categories
LEFT JOIN 
(
	SELECT categorie,
	COALESCE(SUM(CASE WHEN  achat_client.categorie = 'CIM BENIN' THEN achat_client.quantite_achetee ELSE 0 END),0) 
	AS total_achat_CIMBENIN,
  COALESCE(SUM(CASE WHEN achat_client.categorie = 'NOCIBE' THEN achat_client.quantite_achetee ELSE 0 END),0) 
  AS total_achat_NOCIBE
  FROM achat_client
  WHERE DATE(date_achat) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
  GROUP BY categorie
) AS total_achat_hier 
ON categories.category = total_achat_hier.categorie
-- SELECT DATE_SUB(CURDATE(), INTERVAL 1 DAY)








 */

// ========= DAYS TEST

/**
 * 
 * SELECT
    CASE 
        WHEN jours.days = 'Monday' THEN 'Lundi'
        WHEN jours.days = 'Tuesday' THEN 'Mardi'
        WHEN jours.days = 'Wednesday' THEN 'Mercredi'
        WHEN jours.days = 'Thursday' THEN 'Jeudi'
        WHEN jours.days = 'Friday' THEN 'Vendredi'
        WHEN jours.days = 'Saturday' THEN 'Samedi'
        WHEN jours.days = 'Sunday' THEN 'Dimanche'
    END AS jours,
    DATE_ADD(CURRENT_DATE, INTERVAL
        CASE 
            WHEN jours.days = 'Monday' THEN 0
            WHEN jours.days = 'Tuesday' THEN 1
            WHEN jours.days = 'Wednesday' THEN 2
            WHEN jours.days = 'Thursday' THEN 3
            WHEN jours.days = 'Friday' THEN 4
            WHEN jours.days = 'Saturday' THEN 5
            WHEN jours.days = 'Sunday' THEN 6
        END DAY) AS date_du_jour,
    COALESCE(SUM(paiement_client.montant), 0) AS total_paiement
FROM jours
LEFT JOIN paiement_client
    ON jours.days = DAYNAME(paiement_client.date_paiement)
    AND WEEK(paiement_client.date_paiement) = WEEK(CURRENT_DATE)
    AND paiement_client.est_valide = 1
GROUP BY jours.days
ORDER BY FIELD(jours, 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche')

 */

// ================= DAYS

/**
 * 





SELECT
    'Lundi' AS jour,
    DATE_ADD(CURRENT_DATE, INTERVAL 0 DAY) AS date
UNION
SELECT
    'Mardi' AS jour,
    DATE_ADD(CURRENT_DATE, INTERVAL 1 DAY) AS date
UNION
SELECT
    'Mercredi' AS jour,
    DATE_ADD(CURRENT_DATE, INTERVAL 2 DAY) AS date
UNION
SELECT
    'Jeudi' AS jour,
    DATE_ADD(CURRENT_DATE, INTERVAL 3 DAY) AS date
UNION
SELECT
    'Vendredi' AS jour,
    DATE_ADD(CURRENT_DATE, INTERVAL 4 DAY) AS date
UNION
SELECT
    'Samedi' AS jour,
    DATE_ADD(CURRENT_DATE, INTERVAL 5 DAY) AS date
UNION
SELECT
    'Dimanche' AS jour,
    DATE_ADD(CURRENT_DATE, INTERVAL 6 DAY) AS date;

 */
