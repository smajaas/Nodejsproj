
//const express =require('express'); //"type" :commonjs

import express from "express";   // Type="module" (latest)
import {MongoClient} from 'mongodb';
import dotenv from "dotenv";
import { moviesRouter } from "./routes/movies.js";

dotenv.config();  //all keys it will put it in process.env
console.log(process.env)
export const app=express();

const PORT = 9000;

//middleware

app.use(express.json());  //every request in the app body is parsed as json

const MONGO_URL=process.env.MONGO_URL;

//express.json() - inbuit middleware
//const MONGO_URL = "mongodb://localhost";

async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();   //promise
    console.log("Mongodb Connected");
    return client;
}

export const client = await createConnection();

app.get("/",(request,response) => {
response.send("Hello,❤👌👌👌😍😍💕");
});

app.use("/movies",moviesRouter)

 app.listen(PORT, () =>
        console.log("App is started in:", PORT));


        
        



