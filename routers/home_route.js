import express from 'express';
import {isLoggedin} from '../middlewares/isLoggedin.js'
import {home} from '../controllers/home_controller.js'

const app=express.Router();

app.get('/',isLoggedin,(req,res)=>{
    res.render('home');
});

app.post("/", home);

export default app;