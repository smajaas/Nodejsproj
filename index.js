
//const express =require('express'); //"type" :commonjs

import express from "express";   // Type="module" (latest)
import {MongoClient} from 'mongodb';
import dotenv from "dotenv";

dotenv.config();  //all keys it will put it in process.env
console.log(process.env)
const app=express();

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

const client = await createConnection();

app.get("/",(request,response) => {
response.send("Hello,❤👌👌👌😍😍💕");
});

app.get("/movies",async (request,response) => {

    //request-> query params
    console.log(request.query);
    const filter = request.query;
    console.log(filter);

    if(filter.rating){
        filter.rating = +(filter.rating);
    }
        const filterMovies= await getMovies(filter);
    //console.log(filterMovies);

        response.send(filterMovies);
  });

app.post("/movies", async (request,response)=> {
    const data = request.body;
    //console.log(data);
    //create movies -db.movies.insertMany(data)

    const result = await createMovies(data);

    response.send(result);
})

 app.get("/movies/:id",async (request,response) => {
    console.log(request.params);
    const {id} =request.params;
    //db.movies.findOne({id:"102"})

    const movie = await getMovieById(id);


    //const movie=movies.find((mv)=>mv.id===id);
    console.log(movie);

    //No matching movie found

   movie ? response.send(movie) : response.status(404).send({message:"No matching movie found"});
     
 });

 app.delete("/movies/:id",async (request,response) => {
    console.log(request.params);
    const { id } = request.params;
    //db.movies.findOne({id:"102"})

    const result = await deleteMovieById(id);

result.deletedCount > 0
? response.send(result)
:response.status(404).send({message:"No matching movie found"});
         
 });

app.put("/movies/:id",async (request,response) => {
console.log(request.params);
const { id } = request.params;
const data = request.body;
//db.movies.updateOne({id:102},{$set:data})
const result = await updateMovieById(id, data);
const movie = await getMovieById(id);
response.send(movie);
       
});

 app.listen(PORT, () =>
        console.log("App is started in:", PORT));


    async function updateMovieById(id,data) {
    return await client.db("b28wd").collection("movies").updateOne({id:id}, {$set: data});
        }

    async function createMovies(data) {
    return await client.db("b28wd").collection("movies").insertMany(data);
        }

    async function getMovies(filter) {
    return await client.db("b28wd").collection("movies").find(filter).toArray();
        }

    async function deleteMovieById(id) {
        return await client.db("b28wd").collection("movies").deleteOne({ id: id });
    }

    async function getMovieById(id) {
        return await client.db("b28wd").collection("movies").findOne({ id: id });
    }

    

    

    


