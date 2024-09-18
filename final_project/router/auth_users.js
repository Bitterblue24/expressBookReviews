const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
const user = req.body.username
if (user.length > 0) {
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username, password)=>{ //returns boolean
    // Filter the users array for any user with the same username and password
    let validUsers = users.filter(user => {
    return user.username === username && user.password === password;
    });
        // Return true if any valid user is found, otherwise false
        return validUsers.length > 0;
};
    
        


//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
