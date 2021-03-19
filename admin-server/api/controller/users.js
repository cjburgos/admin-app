const db = require("../../models");
const User = db.User;

exports.User = User;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
    try{
        console.log('on create')
        if(!req.body){
            res.status(400).send({
                message: "Content can not be empty!"
            });
        }
        
        let username = await User.find({ username: req.body.email }) 
        console.log(username)
        if(username.length >= 1){
            res.status(400).send("Email already registered")
        } else {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                role: req.body.role,
                orgId: req.body.orgId,
                password: req.body.password,
                username: req.body.email
            })
        
            await user.save(user);
            res.status(201).send({
                message: 'User created'
            })
        }
    } catch(e){
        res.status(500).send({
            message: e
        })
    }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    try{
      const users = await User.find()
      res.status(200).send(users)
    } catch(e){
        res.status(500).send({
            message: e
        })
    }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
    try{

        if(!req.body.username){
            res.status(400).send({
                messsage: "Username field is required"
            })
        }
        else{
            const users = await User.find({
                username: req.body.username
            })
    
            res.status(200).send(users)
        }
      } catch(e){
          res.status(500).send({
              message: e
          })
      }  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};