import express from 'express'
const app=express.Router();

app.get('/logout',(req,res)=>{
    res.clearCookie("token");
    res.redirect("/");
});

export default app;