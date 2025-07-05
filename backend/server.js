import express from "express";
import dotenv from "dotenv";
import route from "./routes/route.js";
import { sql } from "./config/db.js"

dotenv.config();

// initializing an express app
// Middleware - function that runs in the middle between req and res

// middleware can act as rate limiter as well
const app = express();

// this is a built-in middleware
app.use(express.json());

// app.use prefix to creating custom middleware [?]

const PORT = process.env.PORT || 5001;

// PostgreSQL offers a powerful feature known as the SERIAL pseudo-type which simplifies generating auto-incrementing sequences for columns.
async function initDB() {
    try {
        await sql `CREATE TABLE IF NOT EXISTS sales(
            id SERIAL PRIMARY KEY,
            product_id VARCHAR(255) NOT NULL,
            type VARCHAR(255) NOT NULL,
            customer_id VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
        // add another non-existing table here
        console.log("Database initialized succesfully");
    } catch(error) {
        console.log(error)
        process.exit(1);
    }
}

// colon signifies dynamic
/*
    The req.params property is an object containing properties mapped to the named 
    route “parameters”. For example, if you have the route /student/:id, then the “id” 
    property is available as req.params.id. This object defaults to {}. 
*/

// add connection with the routes
app.use("/api/sales", route);

/*
// defining route for root URL
app.get("/", (req, res) => {
   res.send("It's working"); 
});
*/

// listening for incoming req on a specific port
initDB().then(() => {
    // port listen only after initializing database
    app.listen(PORT, () =>  {
        console.log("Server is up and running");
    });
});
