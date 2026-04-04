SELECT patient_id, patient_name, conditions
FROM patient
-- LIKE: used for pattern matching in SQL
-- Syntax: column LIKE 'pattern'
-- % : matches any sequence of characters
-- '%DIAB1%' ensures the string contains a condition starting with DIAB1 anywhere
WHERE conditions LIKE 'DIAB1%'
   OR conditions LIKE '% DIAB1%'
ORDER BY patient_id