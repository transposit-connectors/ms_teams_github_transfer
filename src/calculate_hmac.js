(params) => {
  let valid = false;
  
  var CryptoJS = require("crypto-js");
  const expected_hmac = params.hmac;
  const hmac = CryptoJS.HmacSHA256(params.message, env.get('secret_key'));
  console.log(expected_hmac);
  console.log(hmac);
  
  const calculated_hmac = string
  return {
    valid: valid
  };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */