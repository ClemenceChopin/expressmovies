const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();


app.use('/public', express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

let FrenchMovie = []; 

app.get('/movies', (req,res) =>{
    FrenchMovie = [
        {title:"le fabuleux destin d'amelie lapin", year:2001 },
        {title:"buffet froid", year:1979 },
        {title:"Ready player one", year:2018 },
        {title:"le diner de cons", year:1998 },
        {title:"de rouile et d'os", year:2012 }, 

    ]
    const title = "Films francais des 30 dernieres annees"
    res.render('movies', { TabMovies:FrenchMovie, title:title }); 
});

let urlEncodedParser = bodyParser.urlencoded({extended:false});

// post avec bodyparser
// app.post('/movies',urlEncodedParser, (req,res) =>{
//     console.log("le titre : " + req.body.movietitle);
//     console.log("l'annee : " + req.body.movieyear);

//     const newMovie = {title:req.body.movietitle, year:req.body.movieyear}
//     //FrenchMovie.push(newMovie);
//     FrenchMovie = [...FrenchMovie,newMovie];
//     console.log(FrenchMovie);
//     res.sendStatus(201);
// });

// post avec multer 
app.post('/movies', upload.fields([]), (req,res) =>{
    if(!req.body) {
        return res.sendStatus(404);
    } else {
        const formData = req.body;
        console.log('formData :', formData);
        const newMovie = {title:req.body.movietitle, year:req.body.movieyear}
        FrenchMovie = [...FrenchMovie,newMovie];
        return res.sendStatus(201);
    }
})

app.get('/movies/add', (req,res) =>{
    res.send('formulaire de creation');
});

/*app.get('/movies/:id/:title', (req,res) =>{
    const {id} = req.params;
    const {title} = req.params;
    res.render('movie-details',{movieid:id, movietitle:title}); 
});*/

app.get('/movies/:id/', (req,res) =>{
    const {id} = req.params;
    res.render('movie-details',{movieid:id}); 
});

app.get('/',(req,res) => {
    res.render('index')
});

app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`)
});