import express from 'express';
import { login } from '../controllers/auth_controller.js';

const app=express.Router();

app.get("/login", (req, res) => {
  res.render("login");
});

app.post('/login',login);

export default app;