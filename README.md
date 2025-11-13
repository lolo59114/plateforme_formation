# Plateforme de Gestion de Formation

Ce projet est une **version minimaliste d'une plateforme de gestion de formation**.  
Il utilise **HTML, CSS, JavaScript** et **JSON Server** pour simuler une API REST.

---

## Prérequis

- Node.js et npm installés
- Git (pour cloner le projet)

---

## Cloner le projet

```bash
git clone https://github.com/lolo59114/plateforme_formation.git
cd plateforme-formation
```
## Installer JSON Server si ce n’est pas déjà fait :
```bash
npm install -g json-server
``` 

## Lancer le serveur JSON Server pour l’API :
```bash
npx json-server --watch db.json --port 3000
```

Le serveur tournera alors sur l’adresse http://localhost:3000.
Toutes les données (formations, apprenants, inscriptions) sont servies depuis ce serveur.

## Ouvrir la page d'accueil :
Aller dans le dossier frontend et ouvrir index.html dans le navigateur