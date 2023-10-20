const express = require('express');
const bodyParser = require('body-parser');
const dns = require('dns');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Handle the /favicon.ico request separately and send a 204 No Content response
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// Define a function to check if a domain is valid (simplified example)
async function isValidDomain(domain) {
  // Check if the domain follows a valid syntax pattern
    const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!domain.match(domainPattern)) {
      return false;
    }
  
    // Check if the domain has valid DNS records
    return new Promise((resolve) => {
      dns.resolveMx(domain, (error, mxRecords) => {
        if (error) {
          resolve({valid:false, mx:[]});
        } else {
          resolve({valid: true, mx: mxRecords});
        }
      });
    });
}

// Define a POST endpoint for checking a domain
app.get('/:domain', async (req, res) => {
  const domain  = req.params.domain;

  if (!domain) {
    return res.status(400).json({ error: 'Domain parameter is missing' });
  }

  const isValid = await isValidDomain(domain);
  console.log(domain);
  console.log(isValid);
  res.json( isValid );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
