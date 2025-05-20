import express from 'express';
import { signup } from '../controllers/auth_controller.js';

const app=express.Router();

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post('/signup',signup);

export default app;