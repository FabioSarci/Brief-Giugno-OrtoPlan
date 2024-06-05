import fs from 'fs';
import { createUserValidation } from '../validations/users.validations.js';
import prisma from '../../db/prisma.js';
import moment from 'moment';
import isLoggedIn from '../middleware/isLoggedIn.js';
import { log } from 'console';

export default function userRouting(app){
    //Check User By ID
    app.get('/check/:id',async (req,res) =>{
        const userid = +req.params.id;
        const user = await prisma.user.findUnique({where: {id : userid}})


        res.json(user);
    })

    //Register Routing
    app.post('/register',createUserValidation, async(req,res) =>{
        const  newUser = await prisma.user.create({
            data: {
                firstName: req.body.firstName,
                lastName : req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                datanascita: moment(req.body.datanascita, 'YYYY-MM-DD').toISOString(),
            }
        });

        res.status(201);
        res.json(newUser);
    });

    //Create Piantagioni
    app.post('/piantagioni', async(req,res) =>{
        
        const newPiantagione = await prisma.piantagione.create({
            data:{
                nome: req.body.nome,
                descrizione: req.body.descrizione,
                datacreazione: req.body.datacreazione,
                cap: req.body.cap,
                idutente: req.body.idutente,
                idpianta: req.body.idpianta,
            }
        });

        const piantagione = await prisma.piantagione.findMany({
            where: {id : newPiantagione.id},
            include:{
                comuni: true,
                pianta: true
            },
        })

        res.json(piantagione);
    });

    //Get Piantagioni list
    app.get('/piantagioni/:id',isLoggedIn, async(req,res) =>{
        const userid = +req.params.id;
        const piantagioni = await prisma.piantagione.findMany({
            where: {idutente : userid},
            include:{
                comuni: true,
                pianta: true
            },
        })

        res.json(piantagioni);
    })

    //Get Piantagione by id
    app.get('/piantagione/:id',isLoggedIn, async(req,res) =>{
        const piantagioneID = req.params.id;
        const piantagione = await prisma.piantagione.findFirst({
            where:{id : parseInt(piantagioneID)},
            include:{
                comuni: true,
                pianta: true
            },
        })
        res.json(piantagione);
    })

    //Modifca Piantagione
    app.put('/piantagioni/:id',async (req,res) =>{

        const piantagioneID = +req.params.id;

        const piantagione = await prisma.piantagione.findUnique({where: {id : piantagioneID}});

        if (piantagione) {

            //in altrernativa usare l'update, piu completo

            const newPiantagione = await prisma.piantagione.update({
                where: {id: piantagioneID},
                data:{
                    nome : req.body.nome,
                    descrizione : req.body.descrizione,
                    datacreazione : req.body.datacreazione,
                    cap : req.body.cap,
                    idpianta : req.body.idpianta,
                }
            })

            res.json(newPiantagione);
        }else{
            res.status(404).json({message : 'Piantagione not found'});
        }

    });

    //Cancella Piantagione
    app.delete('/piantagione/:id',async (req,res) => {
        const piantagioneid = +req.params.id;

        const piantagione = await prisma.piantagione.findUnique({where: {id : piantagioneid}})

        if(piantagione){
            //delete
            const ripPiantagione = await prisma.piantagione.delete({where: {id : piantagioneid}})
            res.json(piantagione);
        }else {
            //404
            res.status(404).json({message:'Piantagione Not Found'})
        }
    });

}