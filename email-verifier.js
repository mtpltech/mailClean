const Verifier = require("email-verifier");
 
let verifier = new Verifier("your_email_verification_api_key");
verifier.verify("r@rdegges.com", (err, data) => {
  if (err) throw err;
  console.log(data);
});