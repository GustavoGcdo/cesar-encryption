const { createHash } = require('crypto');

function getSha1Message(message) {
  return createHash('sha1').update(message).digest('hex');
}

module.exports = {
  getSha1Message
};
