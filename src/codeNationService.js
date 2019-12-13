const { default: service } = require('axios');
const { TOKEN, BASE_RESOURCE } = require('../config');
const FormData = require('form-data');

async function getChallengeData() {
  const urlGenerateData = `${BASE_RESOURCE}/generate-data?token=${TOKEN}`;  
  const generatedDataChallenge = await service.get(urlGenerateData).then(response => response.data);
  return generatedDataChallenge;
}

async function postResponse(fileName, fileBuffer) {
  const urlPostResponse = `${BASE_RESOURCE}/submit-solution?token=${TOKEN}`;

  const bodyFormData = new FormData();
  bodyFormData.append('answer', fileBuffer, { filename: fileName });

  const configRequest = {
    headers: { 'Content-Type': `multipart/form-data; boundary=${bodyFormData.getBoundary()}` }
  };

  return await service.post(urlPostResponse, bodyFormData, configRequest).then(response => response.data);
}

module.exports = {
  postResponse,
  getChallengeData
};
