import express from "express";
import { sql } from "../config/db.js";

const router = express.Router();

// Check the sales
router.get("/", async(req,res) => {
    // To do
    try {
        const overview = await sql`SELECT * FROM sales`;
        console.log(overview);
    } catch(error) {
        console.log("Some error")
    }
});

/* */
router.post("/", async(req,res) => {
    // get the fields that user wants to send
    try {
        // id here is for sale.identification
        const { product_id, type, customer_id } = req.body;

        if(!product_id || !type || !customer_id) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const sale = await sql`
            INSERT INTO sales(product_id, type, customer_id)
            VALUES (${product_id}, ${type}, ${customer_id})
            RETURNING *
        `;
        console.log(sale);
        res.status(201).json(sale[0]);
    } catch(error) {
        // error posting a sale
        // server side error
        console.log("Error creating the transaction", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;