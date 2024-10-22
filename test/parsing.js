const net = require('net');
const AisDecoder = require('ais-stream-decoder');

const aisDecoder = new AisDecoder.default();
aisDecoder.on('error', err => console.error('Erreur de décodage :', err));
aisDecoder.on('data', decodedMessage => console.log(decodedMessage));

console.log('>>> Exemples fournis par ais-stream-decoder');
aisDecoder.write('!AIVDM,2,1,7,A,57lof8`2F5HeT<eC:204e86373:222222222221@8HQC16Ch0:RA7kAD,0*28');
aisDecoder.write('!AIVDM,2,2,7,A,PBp888888888880,2*79');

console.log('>>> Exemples réels Norvège');
aisDecoder.write('!BSVDM,1,1,,A,33m<b`0P00PoD5FV`<J8qgw820<C,0*58');
aisDecoder.write('!BSVDM,1,1,5,B,38I5Qo5000PH21jR05Jegro80DoJ,0*5F');
aisDecoder.write('!AIVDM,1,1,,B,133i;RPP1DPEbcDMV@1r:Ow:2>`<,0*41');
aisDecoder.write('!BSVDM,1,1,,A,33mpHr50000IWTPQep@rV8dP0DNJ,0*6B');
