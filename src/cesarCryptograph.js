const alphabet = require('../lib/alphabet.json');

function decryptMessage(message = '', offset = 0) {
  const lettersMessage = [...message];
  let decryptedMessage = '';

  for (const letter of lettersMessage) {
    decryptedMessage += getDecriptedLetter(letter, offset);
  }

  return decryptedMessage;
}

function getDecriptedLetter(letter = '', offset = 0) {
  const upperCaseLetter = letter.toUpperCase();
  const indexLetter = alphabet.findIndex(letter => upperCaseLetter == letter);

  if (indexLetter == -1) {
    return letter;
  } else {
    const supposedNewIndex = indexLetter - offset;
    const lengthArray = alphabet.length;
    const realNewIndex = getPreviousValidIndex(supposedNewIndex, lengthArray);
    return getUpperCaseLetter(letter, realNewIndex);
  }
}

function getPreviousValidIndex(newIndexLetter = 0, lengthArray = 0) {
  if (newIndexLetter < 0) {
    const supposedIndex = newIndexLetter + lengthArray;
    return getPreviousValidIndex(supposedIndex, lengthArray);
  } else {
    return newIndexLetter;
  }
}

function encryptMessage(message = '', offset = 0) {
  const lettersMessage = [...message];
  let encryptedMessage = '';

  for (const letter of lettersMessage) {
    encryptedMessage += getEncryptedLetter(letter, offset);
  }

  return encryptedMessage;
}

function getEncryptedLetter(letter = '', offset = 0) {
  const upperCaseLetter = letter.toUpperCase();
  const indexLetter = alphabet.findIndex(letter => upperCaseLetter == letter);

  if (indexLetter == -1) {
    return letter;
  } else {
    const supposedNewIndex = offset + indexLetter;
    const lengthArray = alphabet.length;
    const realNewIndex = getNextValidIndex(supposedNewIndex, lengthArray);

    return getUpperCaseLetter(letter, realNewIndex);
  }
}

function getNextValidIndex(newIndexLetter = 0, lengthArray = 0) {
  if (newIndexLetter >= lengthArray) {
    const difference = Math.abs(newIndexLetter - lengthArray);
    return getNextValidIndex(difference, lengthArray);
  } else {
    return newIndexLetter;
  }
}

function getUpperCaseLetter(letter = '', index) {
  const isUpperCase = letter.toUpperCase() == letter;
  if (isUpperCase) {
    return alphabet[index];
  } else {
    return alphabet[index].toLowerCase();
  }
}

module.exports = {
  encode: encryptMessage,
  decode: decryptMessage
};
