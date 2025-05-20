import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { usermodel } from "../db/usermodel.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password || name.trim() === "" || email.trim() === "" || password.trim() === "")
    return res.redirect("/signup");
  const check = await usermodel.findOne({ email });
  if (check) return res.redirect("/login");
  await bcrypt.hash(password, 10, async (err, str) => {
    if (err) return res.status(404).send(err.message);
    await usermodel.create({ name, email, password: str });
  });
  const token = jwt.sign({ email }, jwtsecret);
  res.cookie("token", token);
  res.redirect("/");
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (email.trim() == "" || password.trim() == "")
    return res.redirect("/login");
  const user = await usermodel.findOne({ email });
  if (!user) return res.redirect("/signup");
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) return res.status(404).send(err.message);
    if (!result) return res.redirect("/login");
    const token = jwt.sign({ email }, process.env.jwtsecret);
    res.cookie("token", token);
    return res.redirect("/");
  });
};
