import express from "express"
import dotenv from "dotenv"
import mongoConnect from "./db/db.js"
import app from "./app.js"

dotenv.config({
    path:'./.env'
})

const port = process.env.PORT || 3000
mongoConnect()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server started at port ${port} `);
    })
})