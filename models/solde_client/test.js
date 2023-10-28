// test p

`SELECT
clients.id,
clients.nom,
clients.prenoms,
clients.numero_ifu,
clients.numero_telephone,
clients.email,
clients.date_ajout,
COALESCE(achat.total_dettes_mois, 0) AS total_dettes_mois,
COALESCE(paiement_mois.total_paiements_mois, 0) AS total_paiements_mois,
COALESCE(dettes_global.total_dettes_global, 0) AS total_dettes_global,
COALESCE(paiement_global.total_paiements_global, 0) AS total_paiements_global,
CASE
    WHEN (COALESCE(paiement_global.total_paiements_global, 0) - COALESCE(dettes_global.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global.total_paiements_global, 0) - COALESCE(dettes_global.total_dettes_global, 0))
    ELSE 0
END AS avance,
CASE
    WHEN (COALESCE(dettes_global.total_dettes_global, 0) - COALESCE(paiement_global.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global.total_dettes_global, 0) - COALESCE(paiement_global.total_paiements_global, 0))
    ELSE 0
END AS creance,
COALESCE(achat_cimbenin.total_dettes_mois, 0) AS total_dettes_mois_CIMBENIN,
COALESCE(paiement_mois_cimbenin.total_paiements_mois, 0) AS total_paiements_mois_CIMBENIN,
COALESCE(dettes_global_cimbenin.total_dettes_global, 0) AS total_dettes_global_CIMBENIN,
COALESCE(paiement_global_cimbenin.total_paiements_global, 0) AS total_paiements_global_CIMBENIN,
CASE
    WHEN (COALESCE(paiement_global_cimbenin.total_paiements_global, 0) - COALESCE(dettes_global_cimbenin.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global_cimbenin.total_paiements_global, 0) - COALESCE(dettes_global_cimbenin.total_dettes_global, 0))
    ELSE 0
END AS avance_CIMBENIN,
CASE
    WHEN (COALESCE(dettes_global_cimbenin.total_dettes_global, 0) - COALESCE(paiement_global_cimbenin.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global_cimbenin.total_dettes_global, 0) - COALESCE(paiement_global_cimbenin.total_paiements_global, 0))
    ELSE 0
END AS creance_CIMBENIN,
COALESCE(achat_nocibe.total_dettes_mois, 0) AS total_dettes_mois_NOCIBE,
COALESCE(paiement_mois_nocibe.total_paiements_mois, 0) AS total_paiements_mois_NOCIBE,
COALESCE(dettes_global_nocibe.total_dettes_global, 0) AS total_dettes_global_NOCIBE,
COALESCE(paiement_global_nocibe.total_paiements_global, 0) AS total_paiements_global_NOCIBE,
CASE
    WHEN (COALESCE(paiement_global_nocibe.total_paiements_global, 0) - COALESCE(dettes_global_nocibe.total_dettes_global, 0)) > 0 THEN (COALESCE(paiement_global_nocibe.total_paiements_global, 0) - COALESCE(dettes_global_nocibe.total_dettes_global, 0))
    ELSE 0
END AS avance_NOCIBE,
CASE
    WHEN (COALESCE(dettes_global_nocibe.total_dettes_global, 0) - COALESCE(paiement_global_nocibe.total_paiements_global, 0)) > 0 THEN (COALESCE(dettes_global_nocibe.total_dettes_global, 0) - COALESCE(paiement_global_nocibe.total_paiements_global, 0))
    ELSE 0
END AS creance_NOCIBE
FROM clients
LEFT JOIN
-- total dettes mois --
(SELECT id_client, SUM(montant) AS total_dettes_mois
 FROM achat_client
-- WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
 WHERE date_achat BETWEEN '2023-10-01' AND '2023-10-28'
 GROUP BY id_client) AS achat
ON clients.id = achat.id_client
LEFT JOIN
-- total paiements mois --
(SELECT id_client, SUM(montant) AS total_paiements_mois
 FROM paiement_client
 WHERE est_valide = 1
 -- AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
AND date_paiement BETWEEN '2023-10-01' AND '2023-10-28' 
 GROUP BY id_client) AS paiement_mois
ON clients.id = paiement_mois.id_client
LEFT JOIN
-- total dettes global --
(SELECT id_client, SUM(montant) AS total_dettes_global
 FROM achat_client
 WHERE achat_client.date_achat <= '2023-10-28'
 GROUP BY id_client) AS dettes_global
ON clients.id = dettes_global.id_client
LEFT JOIN
-- total paiements global --
(SELECT id_client, SUM(montant) AS total_paiements_global
 FROM paiement_client
 WHERE est_valide = 1
  AND paiement_client.date_paiement <= '2023-10-28'
 GROUP BY id_client) AS paiement_global
ON clients.id = paiement_global.id_client
LEFT JOIN
-- total dettes mois CIM BENIN --
(SELECT id_client, SUM(montant) AS total_dettes_mois
 FROM achat_client
-- WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
   WHERE date_achat BETWEEN '2023-10-01' AND '2023-10-28' 
   AND categorie = 'CIM BENIN'
 GROUP BY id_client) AS achat_cimbenin
ON clients.id = achat_cimbenin.id_client
LEFT JOIN
-- total paiements mois CIM BENIN --
(SELECT id_client, SUM(montant) AS total_paiements_mois
 FROM paiement_client
 WHERE est_valide = 1
--    AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
  AND date_paiement BETWEEN '2023-10-01' AND '2023-10-28' 
   AND categorie = 'CIM BENIN'
 GROUP BY id_client) AS paiement_mois_cimbenin
ON clients.id = paiement_mois_cimbenin.id_client
LEFT JOIN
-- total dettes global CIM BENIN --
(SELECT id_client, SUM(montant) AS total_dettes_global
 FROM achat_client
 WHERE categorie = 'CIM BENIN'
   AND achat_client.date_achat <= '2023-10-28'
 GROUP BY id_client) AS dettes_global_cimbenin
ON clients.id = dettes_global_cimbenin.id_client
LEFT JOIN
-- total paiements global CIM BENIN --
(SELECT id_client, SUM(montant) AS total_paiements_global
 FROM paiement_client
 WHERE est_valide = 1
   AND categorie = 'CIM BENIN'
  AND paiement_client.date_paiement <= '2023-10-28'
 GROUP BY id_client) AS paiement_global_cimbenin
ON clients.id = paiement_global_cimbenin.id_client
LEFT JOIN
-- total dettes mois NOCIBE --
(SELECT id_client, SUM(montant) AS total_dettes_mois
 FROM achat_client
--    WHERE date_achat BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
   WHERE date_achat BETWEEN '2023-10-01' AND '2023-10-28' 
   AND categorie = 'NOCIBE'
 GROUP BY id_client) AS achat_nocibe
ON clients.id = achat_nocibe.id_client
LEFT JOIN
-- total paiements mois NOCIBE --
(SELECT id_client, SUM(montant) AS total_paiements_mois
 FROM paiement_client
 WHERE est_valide = 1
--   AND date_paiement BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND NOW()
  AND date_paiement BETWEEN '2023-10-01' AND '2023-10-28' 
   AND categorie = 'NOCIBE'
 GROUP BY id_client) AS paiement_mois_nocibe
ON clients.id = paiement_mois_nocibe.id_client
LEFT JOIN
-- total dettes global NOCIBE --
(SELECT id_client, SUM(montant) AS total_dettes_global
 FROM achat_client
 WHERE categorie = 'NOCIBE'
   AND achat_client.date_achat <= '2023-10-28'
 GROUP BY id_client) AS dettes_global_nocibe
ON clients.id = dettes_global_nocibe.id_client
LEFT JOIN
-- total paiements global NOCIBE --
(SELECT id_client, SUM(montant) AS total_paiements_global
 FROM paiement_client
 WHERE est_valide = 1
   AND categorie = 'NOCIBE'
   AND paiement_client.date_paiement <= '2023-10-28'
 GROUP BY id_client) AS paiement_global_nocibe
ON clients.id = paiement_global_nocibe.id_client;`;
