import fs from 'fs';
import { createUserValidation } from '../validations/users.validations.js';
import prisma from '../../db/prisma.js';
import moment from 'moment';
import isLoggedIn from '../middleware/isLoggedIn.js';

export default function userRouting(app){


    //Login Routing
    app.get('/login/:email', async(req,res) =>{
        const userEmail = req.params.email;
        const user = await prisma.user.findUnique({where: {email : userEmail}});

        res.json(user);
    })

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

}