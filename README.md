# Appaloosa - Test technique frontend

## Description

Pour ce test tu dois réaliser une application permettant d'afficher une liste d'application ainsi que le détail d'une application.
Tu peux utiliser Ember ou le framework (ou librairie) de ton choix, l'objectif de ce test est de montrer ce que tu sais faire.
Afin de réaliser l'application tu as à ta disposition les deux répertoire `emberjs` et `other` qui contiennent tout deux un serveur de mock. Ce serveur expose les 3 endpoints suivant :

- `GET` `/api/mobile-applications`: Retourne une liste, paginée, de `mobile-application`.
  Ce endpoint accepte également les deux query params `page` et `sort`.
- `GET` `/api/mobile-applications/:id`: Retourne une application
- `PATCH` `/api/mobile-applications/:id`: Permet de mettre à jour une application.

_Le JSON envoyé et consommé par ces endpoints respect la spec [JSONAPI](https://jsonapi.org/format/)._
