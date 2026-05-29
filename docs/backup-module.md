# Module sauvegarde

## Objectif

Eviter la perte de donnees pendant la phase locale et preparer la migration vers une base cloud.

## Fonctions actuelles

- Sauvegarde locale navigateur
- Export JSON complet
- Import JSON complet
- Export CSV par module

## Risques du mode local

- Les donnees restent sur le meme appareil et navigateur
- Changement de navigateur = donnees non visibles
- Nettoyage du navigateur = perte possible

## Regles recommandees

- Export JSON regulier
- Garder une copie dans un dossier securise
- Importer seulement un fichier de confiance

## Prochaine etape

Ajouter Supabase pour synchroniser les donnees par compte et compagnie.
