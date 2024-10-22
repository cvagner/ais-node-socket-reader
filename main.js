const yargs = require('yargs');
const net = require('net');
const AisDecoder = require('ais-stream-decoder');
const split = require('split');
const { Transform } = require('stream');

// Serveur par défaut : The Norwegian Coastal Administration
// https://www.kystverket.no/en/navigation-and-monitoring/ais/access-to-ais-data/
const argv = yargs
    .usage('Lit les messages AIS IEC format IEC 62320-1 sur une socket TCP/IP.\n'
        + 'Par défaut, un des serveurs de Norwegian Coastal Administration est utilisé')
    .option('host', {
        type: 'string',
        description: 'Host sur lequel le serveur écoute',
        default:  '153.44.253.27',
    })
    .option('port', {
        type: 'number',
        description: 'Port sur lequel le serveur écoute',
        default: 5631,
    })
    .help()
    .argv;

const aisDecoder = new AisDecoder.default();
aisDecoder.on('error', err => console.error('>>> Erreur de décodage :', err));
aisDecoder.on('data', decodedMessage => console.log(decodedMessage));

const client = new net.Socket();

// Retire les préfixes pour extraire le message AIS brut, à partir du caractère "!" inclus
// ex de message brut : \s:2573205,c:1729600995*06\!BSVDM,1,1,,A,33mpHr50000IWTPQep@rV8dP0DNJ,0*6B
const extractAisMessage = new Transform({
    transform(chunk, encoding, callback) {
        const line = chunk.toString();
        const aisMessage = line.substring(line.indexOf('!'));
        if (aisMessage) {
            // Pousse le message extrait dans le flux
            this.push(aisMessage);
        }
        callback();
    }
});

client
    .pipe(split()) // Décompose le flux et le réassemble pour que chaque ligne soit un morceau
    .pipe(extractAisMessage) // Extrait le contenu AIS brut (retire les préfixes)
    .pipe(aisDecoder) // Décode le message
    .on('data', decodedMsg => {
        console.log(decodedMsg);
    });

client.on('error', (err) => {
    console.error('>>> Erreur de socket :', err.message);
});

client.connect(argv.port, argv.host, () => {
	console.log('>>> Connecté');
});