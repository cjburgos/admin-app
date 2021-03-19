const express = require('express');
const controller = require('../controller');

const users = new express.Router();

/**
 * @typedef Users
 * @property {string} firstName.required
 * @property {string} lastName.required
 * @property {string} email.required
 * @property {string} role.required
 * @property {string} orgId.required
 */

/**
 * @typedef PostNewUsers
 * @property {Array.<Users>} users.required
 */

 /**
 * Get All Users
 * @group Users
 * @route Get /users
 * @produces application/json
 * @operationId createNewUsers
 * @returns {string} 200 - Success
 * @returns {Error} 500 - Internal server error
 */
users.get('/', ( req, res, next) => {
    console.log('HTTP GET /users')
    controller.users.findAll(req,res,next)
})

/**
 * Create New Users
 * @group Users
 * @route POST /users
 * @produces application/json
 * @operationId createNewUsers
 * @param {PostNewUsers.model} body.body.required - request body
 * @returns {string} 201 - Created
 * @returns {Error} 500 - Internal server error
 */
users.post('/', ( req, res, next) => {
    console.log('HTTP POST /users')
    console.log('Request received:',req.body)
    controller.users.create(req,res,next)
})

module.exports = users