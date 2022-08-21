const fs = require('fs');

const contractPath = './out/Timestone.sol/Timestone.json';
const writePath = '../next/public/Timestone.json';

const contractJSON = fs.readFileSync(contractPath);
fs.writeFileSync(writePath, contractJSON);

const contractFreePath = './out/TimestoneFree.sol/TimestoneFree.json';
const writeFreePath = '../next/public/TimestoneFree.json';

const contractFreeJSON = fs.readFileSync(contractFreePath);
fs.writeFileSync(writeFreePath, contractFreeJSON);