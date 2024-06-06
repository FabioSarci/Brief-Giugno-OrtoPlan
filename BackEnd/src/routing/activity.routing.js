import prisma from "../../db/prisma.js";
import jwt from 'jsonwebtoken';
import isLoggedIn from '../middleware/isLoggedIn.js';
import moment from "moment";

export default function activityRouting(app){
    //creazione attivita
    app.post('/attivita',isLoggedIn, async (req,res) =>{
        const newActivity = await prisma.attivita.create({
            data:{
            nome : req.body.nome,
            tipologia: req.body.tipologia,
            ripetizione: req.body.ripetizione,
            data: moment(req.body.data).format(),
            idpiantagione: parseInt(req.body.idpiantagione),
            },
        });
        res.status(201);
        res.json(newActivity);
    })

    app.get('/attivita/:piantagioneId',isLoggedIn, async (req,res) =>{
        const piantagioneId = +req.params.piantagioneId; 
        const activityList = await prisma.attivita.findMany({
            where:{
                idpiantagione: piantagioneId
            },
        });
        res.json(activityList);
    })

    app.get('/attivita-utente/:utenteid',isLoggedIn, async (req,res) =>{
        const utenteid = req.params.utenteid;

        const activityList = await prisma.attivita.findMany({
            where: {
                piantagione: {
                  idutente: +utenteid,
                },
            },
            orderBy:{
                data : "asc"
            },
            include: {
                piantagione: {
                    include: {
                        utente: {
                            select:{
                                id: true
                            }
                        }
                    }
                }
            }
        });
        res.json(activityList);
    })
}