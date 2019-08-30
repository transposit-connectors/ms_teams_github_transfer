(params) => {
  let valid = false;
  
  var CryptoJS = require("crypto-js");
  
  // from https://codepen.io/mmustapic/pen/jGZYKM
  var secretKeyBytes = CryptoJS.enc.Base64.parse(env.get('secret_key'));
  var payloadBytes = CryptoJS.enc.Utf8.parse(params.message);
  var signatureBytes = CryptoJS.HmacSHA256(payloadBytes, secretKeyBytes);
  var signatureBase64String = CryptoJS.enc.Base64.stringify(signatureBytes);
  
  valid = params.hmac == signatureBase64String
  return {
    valid: valid
  };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */