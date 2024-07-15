
|![1](https://github.com/user-attachments/assets/6c14db2f-0252-4dae-be45-e769afe76846) | ![2](https://github.com/user-attachments/assets/9cc9b04f-0e2d-4318-a0de-747856c11e3f) | ![3](https://github.com/user-attachments/assets/8053ab7a-0e9b-4c2a-b36b-33868634e2a3)
![4](https://github.com/user-attachments/assets/adad01d3-7093-40e7-ac71-aa4deb497faf)
![5](https://github.com/user-attachments/assets/522606d6-69d5-43bb-8d23-04b23fb113f0)
![6](https://github.com/user-attachments/assets/a2e2de2f-3166-4bea-92a4-f680f04bc5fc)
![7](https://github.com/user-attachments/assets/aa985475-ac8e-4b3b-ab3d-c79a5ce087da)

|   |   |   |
|---|---|---|
|   |   |   |
|   |   |   |
|   |   |   |


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
