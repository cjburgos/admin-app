const express = require('express');
const controller = require('../controller');

const authorization = new express.Router();

 /**
 * Authorize Users
 * @group Authorization
 * @route POST /authorization
 * @produces application/json
 * @operationId authUser
 * @returns {string} 200 - Success
 * @returns {Error} 500 - Internal server error
 */
authorization.post('/', ( req, res, next) => {
    console.log('HTTP POST /authorization')
    controller.auth.authorize(req,res,next)
})

module.exports = authorization
