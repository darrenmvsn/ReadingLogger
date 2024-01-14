const express = require("express")
const cors = require("cors")
const axios = require("axios")
const pg = require("pg")
const app = express()
const PORT = 3002 
let currEmail;
const db = new pg.Client({
    password:"dm020405",
    port:5432,
    user:"postgres",
    host:"localhost",
    database:"booknote"
})
db.connect();
app.use(cors())
app.use(express.json())
app.get("/", async (req,res)=>{

    try {
        const response = await axios.get("https://www.dbooks.org/api/recent");
        const data = await response.data
        res.json(data.books)
    } catch (error) {
        console.error(error);
    }

})



app.post("/list", async (req,res)=>{
    const {title} = req.body;
    if (title) {
        try {
            const response = await axios.get(`https://www.dbooks.org/api/search/${title}`)
            const data = await response.data;
            res.send(data.books)
        } catch(err) {
            console.log(err);
        }
    }
})
app.post("/login", async (req,res)=>{
    // console.log(req.body);
    if (req.body) {
        try {
            const {email, password} = req.body;
            currEmail = email;
            let data = [];
            const resp = await db.query("SELECT email, password FROM accounts");
            data = resp.rows;
            let findEmail = await data.find((acc) => acc.email === email)
            if (findEmail) {
                if (findEmail.password === password) {
                    res.json({success: true})
                }
            }
            res.json({success: false})
        } catch(err) {
            console.log(err);
        }
        
    }
    else {
        res.json({success: false})
    }
})
app.post("/signup", async (req,res) => {
    if (req.body) {
        const {email, password} = req.body;
        let emails = [];
        currEmail = email;
        const resp = await db.query("SELECT email FROM accounts");
        emails = resp.rows
        console.log(emails);
        if (emails.length === 0) {
            await db.query("INSERT INTO accounts(email, password) VALUES($1, $2)",[email, password])
        } else {
            if (emails.includes(email)) {
                res.json({success: false})
            }
            await db.query("INSERT INTO accounts(email, password) VALUES($1, $2)",[email, password])
        }
        res.json({success: true})
    }
    else {
        res.json({success: false})
    }
})
app.post("/add", async (req, res) => {
    const { book } = req.body; // Extract book from req.body
    console.log(book);
    console.log(currEmail);
    try {
        // Retrieve the existing booklist for the specified email using the global currEmail variable
        const bookAvail = await db.query("SELECT booklist FROM accounts WHERE email = $1", [currEmail]);
        // console.log(await bookAvail.rows);
        const checkBook = await bookAvail.rows
            
        if (checkBook.length < 1 || checkBook[0].booklist === null) {
            console.log("add new");
            await db.query("UPDATE accounts SET booklist = $1::jsonb WHERE email = $2", [JSON.stringify([book]), currEmail]);
        } else {
            console.log("append");
            const existingBookList = checkBook[0].booklist; // Assuming booklist is retrieved correctly
            existingBookList.push(book); // Append new book to existing list
            await db.query("UPDATE accounts SET booklist = $1::jsonb WHERE email = $2", [JSON.stringify(existingBookList), currEmail]);
        }
        
        console.log("Book added successfully!");
        res.status(200).send("Book added successfully!"); // Sending a success response
    } catch (err) {
        console.error("Error:", err.message); // Log the error message
        res.status(500).send("Internal Server Error"); // Sending an error response
    }
});

app.get("/getList", async (req, res) => {
    const resp = await db.query("SELECT booklist FROM accounts WHERE email = $1", [currEmail])
    const books = await resp.rows;
    res.json(books);
})

// app.post("/add", async (req, res) => {
//     const {book} = req.body; // Assuming currEmail is part of req.body
//     try {
//         // Retrieve the booklist for the specified email
//         const bookAvail = await db.query("SELECT booklist FROM accounts WHERE email = $1", [currEmail]);
//         console.log(bookAvail.rows);
//         if (bookAvail.rows.length > 0) { // Check if the user exists and has a booklist
//             console.log("append")
//             const existingBooklist = bookAvail.rows;
//             // Append the new book to the existing booklist
//             await db.query("UPDATE accounts SET booklist = $1 WHERE email = $2", [[...existingBooklist, book], currEmail] );
//         } else { 
//             console.log("add new")
//             // If the user does not have a booklist, create a new one with the book
//             await db.query("UPDATE accounts SET booklist = $1 WHERE email = $2", [[book], currEmail]);
//         }
        
//         console.log("Book added successfully!");
//         res.status(200).send("Book added successfully!"); // Sending a success response
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Internal Server Error"); // Sending an error response
//     }
// });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
module.exports = app