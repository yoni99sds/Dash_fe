const CryptoJS = require('crypto-js');

const decrypt = (ciphertext, key, iv) => {
  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext: CryptoJS.enc.Hex.parse(ciphertext) },
    CryptoJS.enc.Hex.parse(key),
    { iv: CryptoJS.enc.Hex.parse(iv) }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
};

module.exports = { decrypt };
