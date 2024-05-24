import fs from 'fs';
import { createUserValidation } from '../validations/users.validations.js';
import prisma from '../../db/prisma.js';
import moment from 'moment';
import isLoggedIn from '../middleware/isLoggedIn.js';

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
    })


    //ESEMPI IMPORTATI DA ALTRO PROGETTO
    app.delete('/reset-database',async (req,res) =>{
        const users = await prisma.user.deleteMany();

        res.json(users);
    });

    app.put('/users/:id',async (req,res) =>{

        const userID = +req.params.id;

        const user = await prisma.user.findUnique({where: {id : userID}});

        if (user) {

            //in altrernativa usare l'update, piu completo

            user.firstName = req.body.firstName
            user.lastName = req.body.lastName
            user.email = req.body.email
            user.password = req.body.password
            user.datanascita = req.body.datanascita

            res.json(user)
        }else{
            res.status(404).json({message : 'User not found'})
        }

    });

    app.delete('/users/:id',async (req,res) => {
        const id = +req.params.id;

        const user = await prisma.user.findUnique({where: {id : id}})

        if(user){
            //delete
            const users = await prisma.user.delete({where: {id : id}})
            res.json(user);
        }else {
            //404
            res.status(404).json({message:'User Not Found'})
        }
    });



}