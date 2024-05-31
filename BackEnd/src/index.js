import express from "express";
import 'dotenv/config';
import userRouting from "./routing/create.routing.js";
import authRouting from "./routing/auth.routing.js";
import cityRouting from "./routing/city.routing.js";
import cors from 'cors';
import moment from 'moment';

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: ['http://localhost:3000','http://127.0.0.1:3000']
    
}));


userRouting(app);
authRouting(app);
cityRouting(app);


app.listen(process.env.PORT, () => {
    console.log('Application listening at 8000');
})