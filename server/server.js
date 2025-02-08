require("dotenv").config();
const express  = require("express");
const app = express();
const connectDb = require("./utils/db")


const PORT = 5002;

connectDb().then(()=> {
    app.listen(PORT,()=>{
        console.log(`server is running at port: ${PORT}`);
    })
})