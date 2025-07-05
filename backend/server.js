import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js"

dotenv.config();

// initializing an express app
const app = express();
const PORT = process.env.PORT || 5001;

async function initDB() {
    try {
        // await sql`CREATE TABLE`
        console.log("Database initialized succesfully");
    } catch(error) {
        console.log(error)
        process.exit(1);
    }
}

// defining route for root URL
app.get("/", (req, res) => {
   res.send("It's working"); 
});

// listening for incoming req on a specific port
initDB().then(() => {
    // port listen only after initializing database
    app.listen(PORT, () =>  {
        console.log("Server is up and running");
    });
});
