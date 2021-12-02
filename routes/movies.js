import express from "express"; 
const router = express.Router();

import { 
    getMovies, createMovies, getMovieById, deleteMovieById, updateMovieById,
} from "../helper.js";

router
.route("/").get(async (request, response) => {

    //request-> query params
    console.log(request.query);
    const filter = request.query;
    console.log(filter);

    if (filter.rating) {
        filter.rating = +(filter.rating);
    }
    const filterMovies = await getMovies(filter);
    //console.log(filterMovies);
    response.send(filterMovies);
})
.post(async (request, response) => {
    const data = request.body;
    //console.log(data);
    //create movies -db.movies.insertMany(data)
    const result = await createMovies(data);

    response.send(result);
})
router.route("/id")
.get(async (request, response) => {
    console.log(request.params);
    const { id } = request.params;
    //db.movies.findOne({id:"102"})
    const movie = await getMovieById(id);
    //const movie=movies.find((mv)=>mv.id===id);
    console.log(movie);
    //No matching movie found
    movie ? response.send(movie) : response.status(404).send({ message: "No matching movie found" });

})
.delete(async (request, response) => {
    console.log(request.params);
    const { id } = request.params;
    //db.movies.findOne({id:"102"})
    const result = await deleteMovieById(id);

    result.deletedCount > 0
        ? response.send(result)
        : response.status(404).send({ message: "No matching movie found" });

})
.put(async (request, response) => {
    console.log(request.params);
    const { id } = request.params;
    const data = request.body;
    //db.movies.updateOne({id:102},{$set:data})
    const result = await updateMovieById(id, data);
    const movie = await getMovieById(id);
    response.send(movie);

});

export const moviesRouter = router;