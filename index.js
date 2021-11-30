
//const express =require('express'); //"type" :commonjs

import express from "express";   // Type="module" (latest)
import {MongoClient} from 'mongodb';

const app=express();

const PORT = 9000;

//middleware

app.use(express.json());  //every request in the app body is parsed as json

//express.json() - inbuit middleware

//const movies = 
   


const MONGO_URL = "mongodb://localhost";

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
        filter.rating = parseInt(filter.rating);
    }

   

    //const {language,rating} = request.query;

    // console.log(language,rating);

    // let filterMovies=movies;
    // if(language) {

    //     filterMovies=filterMovies.filter((mv)=>mv.language===language);   

    // } 
    // if(rating) {

    //     filterMovies=filterMovies.filter((mv)=>mv.rating===+rating);   

    // } 

    const filterMovies= await client.db("b28wd").collection("movies").find(filter).toArray();
    console.log(filterMovies);

        response.send(filterMovies);
  });

app.post("/movies", async (request,response)=> {
    const data = request.body;
    //console.log(data);
    //create movies -db.movies.insertMany(data)

    const result = await client.db("b28wd").collection("movies").insertMany(data);

    response.send(result);
})

 app.get("/movies/:id",async (request,response) => {
    console.log(request.params);
    const {id} =request.params;
    //db.movies.findOne({id:"102"})

    const movie = await client.db("b28wd").collection("movies").findOne({id:id});


    //const movie=movies.find((mv)=>mv.id===id);
    console.log(movie);

    //No matching movie found

   movie ? response.send(movie)   : response.status(404).send({message:"No matching movie found"});
     
 });
      

  app.listen(PORT, () =>
        console.log("App is started in:", PORT)
  );

