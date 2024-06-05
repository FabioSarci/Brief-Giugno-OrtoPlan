import exp from "constants";
import express from "express";
import fs from 'fs';

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/OrtoPlan', (req, res) =>{
    res.render('pages/landing');
});

app.get('/Ortoplan/giardino/:id', (req,res) =>{
    res.render('pages/giardino-home',{userId: +req.params.id})
})

app.get('/Ortoplan/giardino/coltivazioni/:id',(req,res) =>{
    res.render('pages/giardino-coltivazioni',{userId: +req.params.id})
})

app.get('/Ortoplan/giardino/previsioni/:id',(req,res) =>{
    res.render('pages/giardino-previsioni',{userId: +req.params.id})
})

app.get('/OrtoPlan/giardino/coltivazioni/piantagione/:userid/:piantagioneid',(req,res) =>{
    res.render('pages/piantagione',{
        userId: +req.params.userid,
        piantagioneId: +req.params.piantagioneid
    })
})


app.listen(3000);