import express from "express";
import 'dotenv/config';
import userRouting from "./routing/user.routing.js";
import authRouting from "./routing/auth.routing.js";
import cors from 'cors';

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: ['http://localhost:3000','http://127.0.0.1:3000']
    
}));





app.listen(process.env.PORT, () => {
    console.log('Application listening at 8000');
})