import prisma from "../../db/prisma.js";
import jwt from 'jsonwebtoken';
import isLoggedIn from '../middleware/isLoggedIn.js';

export default function plantRouting(app){
    app.get('/plant',async (req,res) =>{
        const plants = await prisma.pianta.findMany({orderBy:{nome: 'asc'}});
        if(!plants){
                res.status(422);
                res.json({message: 'Non ci sono Piante!'});
                return
        }
        return res.json(plants);
    })
}