const { decode } = require('./src/cesarCryptograph');
const { getSha1Message } = require('./src/cryptoService');
const { getChallengeData, postResponse } = require('./src/codeNationService');
const { readFile, writeFile } = require('./src/fileService');
const { FILE_NAME } = require('./config');

async function main() {
  try {
    const challengeData = await getChallengeData();

    const encryptedMessage = challengeData.cifrado;
    const offset = challengeData.numero_casas;
    const decryptedMessage = decode(encryptedMessage, offset);
    const sha1decryptedMessage = getSha1Message(decryptedMessage);

    const answer = {
      ...challengeData,
      decifrado: decryptedMessage,
      resumo_criptografico: sha1decryptedMessage
    };

    await writeFile(FILE_NAME, answer);

    const fileBuffer = await readFile(FILE_NAME);
    const responseData = await postResponse(FILE_NAME, fileBuffer);

    console.log('responseData', responseData);
    
  } catch (error) {
    console.log('ERROR', error);
  }
}

main();
