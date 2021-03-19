const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const config = require('../config');
const { auth } = require('./controller');

const { authorization, users } = require('./routes');

const router = express.Router() 

/*
 * Custom Middleware
 */

// Logs basic request information to the console
const logRequest = (req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url} from ${req.ip}`)
    next()
}

// Adds an object to the request for storing internally generated parameters
const initInternalParams = (req, res, next) => {
    req.internal = {}
    next()
}
  
// Middleware for parsing the wait query parameter
const waitParser = (req, res, next) => {
    const DEFAULT_WAIT = Math.floor(config.DEFAULT_SUBMIT_WAIT / 1000)
    const parsed = req.query.wait === '' ? DEFAULT_WAIT : Number(req.query.wait)
    req.query.wait = _.isNaN(parsed) ? null : parsed
    next()
}
  
// Check the Authorization header if present.
// Saves the encoded public key to the request object.
const authHandler = (req, res, next) => {
    req.internal.authedKey = null
    const token = req.headers.authorization
    if (!token) return next()

    auth.verifyToken(token)
        .then(publicKey => {
        req.internal.authedKey = publicKey
        next()
        })
        .catch(() => next())
}

// Send back a simple JSON error with an HTTP status code
const errorHandler = (err, req, res, next) => {
    if (err) {
        res.status(err.status || 500).json({ error: err.message })
    } else {
        next()
    }
}

/*
* Route and Middleware Setup
*/

router.use(bodyParser.json({ type: 'application/json' }))
router.use(bodyParser.raw({ type: 'application/octet-stream' }))

router.use(logRequest)
router.use(initInternalParams)
router.use(waitParser)
router.use(authHandler)
router.use(errorHandler)

/*
* Routes
*/

router.use("/health",(req,res,next)=>{
    console.log('Health Check...')
    try{
        res.status(200).send({
        "status":"OK",
        "metadata":{
            "application": "Admin Server",
            "platform": "nodejs-express-app"
        }
        })
    }catch(e){
        console.error('[Admin Server]: Error occured: ', e);
        next(e)
    }
});

router.use('/users', users);
router.use('/authorization', authorization);

module.exports = router