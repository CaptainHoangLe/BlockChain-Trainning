let elliptic = require('elliptic');
const { sha256 } = require('js-sha256');

let ec = new elliptic.ec('secp256k1');
console.log('------------Generate key pair------------');
let keyPair = ec.genKeyPair();
let privKey = keyPair.getPrivate("hex");
let pubKey = keyPair.getPublic();

console.log(`Private key: ${privKey}`);
console.log("Public key :", pubKey.encode("hex").substr(2));
console.log("Public key (compressed):",
    pubKey.encodeCompressed("hex"));

console.log('------------Sign------------');

let msg = 'Digital Signature of LVH';
let msgHash = sha256(msg);
let signature = ec.sign(msgHash, privKey, "hex", {canonical: true});
console.log(`Msg: ${msg}`);
console.log(`Msg hash: ${msgHash}`);
console.log("Signature:", signature);

console.log('------------Verify------------');

let hexToDecimal = (x) => ec.keyFromPrivate(x, "hex").getPrivate().toString(10);
let pubKeyRecovered = ec.recoverPubKey(
    hexToDecimal(msgHash), signature, signature.recoveryParam, "hex");
console.log("Recovered pubKey:", pubKeyRecovered.encodeCompressed("hex"));

let validSig = ec.verify(msgHash, signature, pubKeyRecovered);
console.log("Signature valid?", validSig);