const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const users = require('./users');

const { BadRequest } = require('../utils/errors')

const SALT_ROUNDS = config.SALT_ROUNDS;
const SECRET = config.JWT_SECRET;
const SERVER_PUBLIC_KEY = config.PUBLIC_KEY;

// Hashes a password as promised
function hashPassword(pass){
  return bcrypt.hash(pass, SALT_ROUNDS);
}

//Create a token based on Payload
function createToken(payload){
    return new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, (err, token) => {
            if (err) reject(err)
            else resolve(token)
        })
    })
}
  
// Verifies a token is valid as promised.
// Sends back the decoded payload, or throws an error if invalid.
function verifyToken(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET, (err, payload) => {
            if (err) reject(err)
            else resolve(payload)
        })
    })
}

// Checks an object with username and password keys.
// Returns an auth token and the user's private key if it passes.
async function authorize(req, res, next){
    console.log('Request Body:',req.body);
    let creds = req.body;
    console.log(`Username: ${creds.username}`)
    console.log(`Password: ${creds.password}`)
    try{
            
        if (!creds.username || !creds.password) {
            const message = 'Authorization requires username and password'
            return res.status(400).send({
                message: new BadRequest(message)
            })
        }

        let user = await users.User.find({ username: creds.username })

        if (creds.password === user.password) throw new Error('Invalid username or password')
        
        let token = await createToken(SERVER_PUBLIC_KEY);

        res.status(200).send({
            id_token: user[0]._id,
            access_token: token,
            role: user[0].role,
            orgId: user[0].orgId
        })
    } catch(e){ 
        console.error('[Admin Server]: Error ocurred: ', e)
        next(e)
    }
}

module.exports = {
hashPassword,
authorize,
verifyToken,
createToken
}