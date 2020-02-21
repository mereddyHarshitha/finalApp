var nforce = require('nforce');
const express = require('express')
const path = require('path')
const cors = require('cors')
const PORT = process.env.PORT || 5000

var org = nforce.createConnection({
  clientId: '3MVG9n_HvETGhr3AerhMPQWA3Z_X_pZduM18nC6jICZEY3ZAJynYZSnga4b3rMWiNgtj6II4of3kcEe.vgLL9',
  clientSecret: '28DD8FEB6824FBFFA664936E73A0359EACE498F595BC7DCCF0D7B352677F6974',
  redirectUri: 'https://lwcopplist.herokuapp.com/oauth/_callback',
  apiVersion: 'v47.0',  // optional, defaults to current salesforce API version
  environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
  mode: 'multi' // optional, 'single' or 'multi' user mode, multi default
});
var routesHome = require('./routes/home');

express()
  .use(function(req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization,X-Authorization');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
      res.setHeader('Access-Control-Max-Age', '1000');
      next();
  })
  .use('/home', routesHome);
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', cors(), (req, res) => res.redirect(org.getAuthUri())
  .get('/oauth/_callback', function(req, res) {
  org.authenticate({code: req.query.code}, function(err, resp){
    if(!err) {
      console.log('Access Token: ' + resp.access_token);
      app.locals.oauthtoken = resp.access_token;
      app.locals.lightningEndPointURI = "https://hmereddydemocomporg-dev-ed.lightning.force.com";
      res.redirect('/home');
    } else {
      console.log('Error: ' + err.message);
    }
  });
})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
