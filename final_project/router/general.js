const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

//untested #1

//public_users.post("/register", async (req, res) => {
    //const { username, password } = req.body; // Destructure username and password from request body

    // Input Validation (Enhanced)

    // Missing user or pass
    //if (!username || !password) {
        //return res.status(400).json({ message: "Missing required fields: username or password." });
    //}

    // Check for Existing User
    //try {
       // const existingUser = await doesExist(username); // Use async/await for asynchronous operations
       // if (existingUser) {
         //   return res.status(409).json({ message: "Username already exists. Please choose a different one." });
       // }
    //} catch (error) {
       // console.error("Error checking for existing user:", error);
       // return res.status(500).json({ message: "Internal server error. Please try again later." });
   // }

    // Register User
    //try {
       // await addUser({ username, password: hashedPassword }); // Assume `addUser` handles storage (e.g., database)
       // return res.status(201).json({ message: "User successfully registered. Please login." });
   // } catch (error) {
       // console.error("Error registering user:", error);
       // return res.status(500).json({ message: "Internal server error. Please try again later." });
   // }
//});


//untested #2

//public_users.post("/register", (req, res) => {
    //const { username, password } = req.body; 
    //if (username && password) {
        // Check if the user does not already exist
        //if (!doesExist(username)) {
            // Add the new user to the users array
            //users.push({"username": username, "password": password});
           // return res.status(200).json({message: "User successfully registered. Now you can login"});
        //} else {
            //users.push({ username, password}); 
                //return res.status(404).json({message: "User already exists!"});
        //}
    //}
    // Return error if username or password is missing
    //return res.status(404).json({message: "Unable to register user."});
//});


//trying to add registered user to users array :/
public_users.post("/register", (req, res) => {
    const { username, password } = req.body; 
    if (username && password) {
    public_users.push({"username": username, "password": password});
        return res.status(200).json({message: "User successfully registered. Now you can login"});
    }else{
        return res.status(400).json({message: "well fuck"});
    }
    });

// Get the book list available in the shop
public_users.get('/',function (req, res) {
        // Send JSON response with formatted friends data
        res.send(JSON.stringify(books,null,4));
    });

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
        // Retrieve the isbn parameter from the request URL and send the corresponding friend's details
        const isbn = req.params.isbn;
        res.send(JSON.stringify(books[isbn]),null,4);
    });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    for (const key in books) {
        if (books[key].author === author) {
          return res.send(JSON.stringify(books[key]), null, 4);
        }
      }
      res.status(404).send('Author not found');
    });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    for (const key in books) {
        if (books[key].title === title) {
            return res.send(JSON.stringify(books[key]), null, 4);
        }
      }
      res.status(404).send('Title not found');
    });

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn]; // Directly access the book using the ISBN as the key
    if (book) { // Check if the book exists
        const reviews = book.reviews;
        return res.send(JSON.stringify(reviews), null, 4);
    }

    res.status(404).send('Reviews not found');
});

module.exports.general = public_users;
