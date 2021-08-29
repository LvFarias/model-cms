const fs = require('fs');
require('dotenv').config();

const targetPath = './src/environments/environment.ts';
const envConfigFile = `
export const environment = {
    production: '${process.env.PRODUCTION}',
    API_URL: '${process.env.API_URL}',
};
`;

console.log('The file `environment.ts` will be written with the following content: \n');
console.log(envConfigFile);

fs.writeFile(targetPath, envConfigFile, function (err: any) {
    if (err) {
        throw console.error(err);
    } else {
        console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
    }
});