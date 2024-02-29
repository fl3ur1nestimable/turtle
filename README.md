# Application Turtle

Cette application est développée avec React et Flask. Elle utilise une API Flask pour le backend et une interface utilisateur React pour le frontend.

## Installation

Avant de lancer l'application, assurez-vous d'avoir les dépendances nécessaires installées.

Dans le répertoire racine du projet (dossier turtle), exécutez la commande suivante pour installer les dépendances React :

```npm install```


## Lancer l'application

Une fois que vous avez installé les dépendances, vous pouvez démarrer l'application en suivant les étapes ci-dessous :

Ouvrez un terminal et accédez au répertoire `turtle/backend` :

```shell
cd turtle/backend
```	

Creer la base de donnée (toujours dans le dossier backend) :

```shell
python3 apidb.py
```


lancer le serveur flask avec la commande suivante :

```shell
python3 run.py
``` 

vous pouvez désormais lancer l'application dans le répertoire `turtle`, dans un deuxieme terminal :

```shell
npm start
```

Cela lancera l'application dans votre navigateur par défaut. Vous pourrez alors interagir avec l'interface utilisateur.

Assurez-vous que l'API Flask est en cours d'exécution avant de démarrer l'application React, sinon vous pourriez rencontrer des erreurs.

## Blockchain et contrats 
Le contrat de mise en relation se trouve dans le dossier src. Pour tester nous avons utiliser **Metamask**, **Ganache** et **Remix**. Pour le faire de votre côté **il faudra avoir ces 3 outils** là, et bien configurer des comptes sur Metamask, sur le réseau créé par Ganache. Puis aussi **bien déployer le contrat, en se connectant avec ces même comptes**. C'est une partie un peu complexe à tester, mais **NORMALEMENT**, ça marche correctement. Utiliser le site sans la fonctionnalité de la blockchain, **fera planter la base de données**, et plus rien de marchera.

***IMPORTANT!!!*** Pour les données du contrat, il faut aussi entrer la bonne adresse du contrat, obtenue après déployement, dans le fichier **adress.json**.

S'il les explications ci-dessus ne sont pas assez claires ou en cas de difficultés, nous sommes disponibles par mail.

Si tout se passe bien, vous devriez maintenant voir l'application Turtle fonctionner correctement !
