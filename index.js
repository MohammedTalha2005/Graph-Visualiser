import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import dontenv from 'dotenv'

const app=express();
dontenv.config({
    path:'./.env'
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(path.join('public')));
app.use(cookieParser());

// importing routers
import homeRouter from './routers/home_route.js'
import loginRouter from './routers/login_route.js'
import signupRouter from './routers/signup_route.js'
import logutRouter from './routers/logout_route.js'

app.use(homeRouter);
app.use(loginRouter);
app.use(signupRouter);
app.use(logutRouter)

app.listen(3000,()=>{
    console.log("Running successfully at port 3000");
})
