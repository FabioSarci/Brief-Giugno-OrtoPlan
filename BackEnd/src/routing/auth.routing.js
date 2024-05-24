import prisma from "../../db/prisma.js";
import jwt from 'jsonwebtoken';

//login
export default function authRouting(app){
    app.post('/login',async (req,res) => {
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        });
        if(!user){
            res.status(422);
            res.json({message: 'Email o Password errati'});
            return
        }
        const token = jwt.sign(
            user,
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.json({
            user,
            token
        });
    });
};