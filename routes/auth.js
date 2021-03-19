const myRouter = require("express").Router();
const User = require("../models/User");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');

dotenv.config();

const validateSchema = Joi.object({
  username: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});


const validateLoginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

myRouter.post('/login',async(req,res)=>{
   const {error}=validateLoginSchema.validate(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   const userİnfo=await User.findOne({email:req.body.email});
   if(!userİnfo) return res.status(400).send('Email ya da Password bilgisini yanlış girdiniz.');

   const passControl=await bcrypt.compare(req.body.password,userİnfo.password);

   if(!passControl) return res.status(400).send('Email ya da Password bilgisini yanlış girdiniz.');
  
   
   const token=jwt.sign({_id:userİnfo._id},process.env.TOKEN_SECRET);
   res.header('auth-token',token).send(token);


   res.send('Giriş başarılı!!',)
    
  })
  

myRouter.post("/register", async (req, res) => {
  //res.send(validateSchema.validate(req.body));

  const { error } = validateSchema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const emailControl = await User.findOne({ email: req.body.email });

  if (emailControl)
    return res.status(400).send("Email addres already using!!!");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = myRouter;
