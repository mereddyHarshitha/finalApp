var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	    res.render('pages/index', {
	        oauthtoken: req.app.locals.oauthtoken,
	        ouathLightningURL: req.app.locals.lightningEndPointURI
    });
});

module.exports = router;
