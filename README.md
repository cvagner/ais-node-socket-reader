# AIS node socket reader

L'objectif de cet exemple est de montrer comment **lire des messages AIS produits par un serveur sur une socket TCP/IP**.
Les messages AIS sont produits conformément au standard `IEC format IEC 62320-1`.

Par défaut, l'addresse `153.44.253.27` et le port `5631` sont utilisés. Le serveur appartient à la `Norwegian Coastal Administration`.
Cf. [Access to AIS data](https://www.kystverket.no/en/navigation-and-monitoring/ais/access-to-ais-data/).


La librairie [`ais-stream-decoder`](https://www.npmjs.com/package/ais-stream-decoder) analyse les trames brutes pour extraire par exemple le json suivant (a priori un message d'un Base Station `BS` et un formatage `VDM`) :
```json
{
  "type": 1,
  "channel": "B",
  "repeat": 0,
  "mmsi": 257241500,
  "navStatus": 0,
  "rateOfTurn": 0,
  "speedOverGround": 0,
  "accuracy": false,
  "lon": 8.607258333333334,
  "lat": 58.35478666666667,
  "courseOverGround": 343.4,
  "heading": 257,
  "utcSecond": 17,
  "specialManoeuvre": 0,
  "raim": false,
  "radio": 98915,
  "sentences": [
    "!BSVDM,1,1,,B,13mDiW00000WIb6QI12=J`2R0H9S,0*2D"
  ]
}
```

## Exécution

Outils nécessaires : [node](https://github.com/nvm-sh/nvm)

Installation des dépendances
```sh
npm ci
# npm install
```

Affichage de l'aide :
```sh
node . --help
```
Résultat :
```sh
Lit les messages AIS IEC format IEC 62320-1 sur une socket TCP/IP.
Par défaut, un des serveurs de Norwegian Coastal Administration est utilisé

Options :
  --version  Affiche le numéro de version                              [booléen]
  --host     Host sur lequel le serveur écoute
                               [chaîne de caractères] [défaut : "153.44.253.27"]
  --port     Port sur lequel le serveur écoute          [nombre] [défaut : 5631]
  --help     Affiche l'aide                                            [booléen]
```

Exemple d'exécution :
```sh
# Par défaut
npm run start
# ou
node .

# En précisant l'hôte et le port
npm run start -- --host 153.44.253.27 --port 5631
# ou
node . --host 153.44.253.27 --port 5631
```

Les messages lus et décodés sont affichés dans la console. Exemple :
```sh
> node-socket-client@1.0.0 start
> node .

>>> Connecté
{"type":1,"channel":"B","repeat":0,"mmsi":257241500,"navStatus":0,"rateOfTurn":0,"speedOverGround":0,"accuracy":false,"lon":8.607258333333334,"lat":58.35478666666667,"courseOverGround":343.4,"heading":257,"utcSecond":17,"specialManoeuvre":0,"raim":false,"radio":98915,"sentences":["!BSVDM,1,1,,B,13mDiW00000WIb6QI12=J`2R0H9S,0*2D"]}
{"type":1,"channel":"B","repeat":0,"mmsi":257241500,"navStatus":0,"rateOfTurn":0,"speedOverGround":0,"accuracy":false,"lon":8.607258333333334,"lat":58.35478666666667,"courseOverGround":343.4,"heading":257,"utcSecond":17,"specialManoeuvre":0,"raim":false,"radio":98915,"sentences":["!BSVDM,1,1,,B,13mDiW00000WIb6QI12=J`2R0H9S,0*2D"]}
{"type":3,"channel":"A","repeat":0,"mmsi":258595000,"navStatus":5,"rateOfTurn":0,"speedOverGround":0,"accuracy":true,"lon":5.103276666666667,"lat":60.44634833333333,"courseOverGround":166.7,"heading":336,"utcSecond":14,"specialManoeuvre":0,"raim":false,"radio":85050,"sentences":["!BSVDM,1,1,,A,33nWHf5000PGG6LRUW8FPrPL8Dhr,0*71"]}
# ...
```

## Nettoyage
```sh
# Modules nodes téléchargés
rm -rf node_modules
```
