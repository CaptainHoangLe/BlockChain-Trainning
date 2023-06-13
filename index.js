const { sha256 } = require('js-sha256');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Type message to hash? ', (answer) => {
    console.log(`This is hashed message :  ${sha256(answer)}`);
  });
