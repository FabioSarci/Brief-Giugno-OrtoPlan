import exp from "constants";
import express from "express";
import fs from 'fs';

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.render('pages/landing');
});


app.listen(3000);