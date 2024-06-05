import prisma from "../../db/prisma.js";
import jwt from 'jsonwebtoken';
import isLoggedIn from '../middleware/isLoggedIn.js';

export default function cityRouting(app){
    app.post('/city',async (req,res) => {
        const city = await prisma.comune.findFirst({
            where:{
                denominazione: req.body.nomecitta
            }
        });
        if(!city){
            res.status(422);
            res.json({message: 'Citta errata'});
            return
        }
        return res.json(city);
    } );

    app.get('/city',async (req,res) => {
        const cities = await prisma.comune.findMany();
        if(!cities){
            res.status(422);
            res.json({message: 'Non ci sono Citta'});
            return
        }
        return res.json(cities);
    } );
}