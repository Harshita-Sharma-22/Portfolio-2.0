const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")
const bodyParser = require("body-parser")

require("dotenv").config();


const app = express()
const PORT = process.env.PORT || 5000

const path = require("path")
app.use(express.static(path.join(__dirname, "../frontend")))
app.get("/", (req, res)=> {
    res.sendFile(path.join(__dirname, "../frontend/index.html"))
})

app.use(cors())
app.use(bodyParser.json())

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT
// });

const db = mysql.createConnection(process.env.DATABASE_URL);


db.connect(err => {
    if(err) throw err;
    console.log("MySQL Connected...")
});

app.post("/contact", (req, res)=>{
    const { name, email, message } = req.body
    if(!name || !email || !message){
        return res.status(400).json({ message: "All fields are required"})
    }

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result)=>{
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" })
        }        
        res.json({ message: "Message recieved successfully!"})
    })
})

app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`)
})