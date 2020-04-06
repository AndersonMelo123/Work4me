const path = require('path');
const fs = require('fs');
const solc = require('solc');

const work4mePath = path.resolve(__dirname, 'contracts', 'Work4me.sol');
const source = fs.readFileSync(work4mePath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Work4me'];