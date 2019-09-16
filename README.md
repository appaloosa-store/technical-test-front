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

## Design

Pas besoin d'en faire trop si tu n'es pas à laisse en design. Mais on a quand même besoin de voir comment tu gères le style d'une application.
Tu es libre d'utiliser ce que tu veux vanilla CSS/SASS/Bootstrap...
_Si tu es curieux, tu trouveras dans le répertoire `screenshots` des captures d'écran d'Appaloosa pour les pages que tu dois réaliser._

## Point bonus

- Permettre la modification d'une application
- Permettre de trier la liste des applications
- Mettre en place de la pagination
- Fast rendering

## Que rendre?

Un repo git *privé*. Utilise Github, Gitlab, Bitbucket ou un fichier zip c'est comme tu veux.
⚠️Ne supprimes pas tes branches git, si tu en utilises, nous voulons voir comment tu travailles.
