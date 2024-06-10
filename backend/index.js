import express from "express";
import cors from "cors";
import http from 'http';
import { Server } from 'socket.io';
import router from "./client.js";
import vendor from "./vendor.js"
import cookieParser from "cookie-parser";
import bcrypt from 'bcrypt';
import db from "./db.js";
import jwt from "jsonwebtoken";
 const app=express(); 
 const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
 app.use(express.json()); // Parse JSON bodies
 app.use(cookieParser());
 app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
 app.use(cors(
   {
      origin:["http://localhost:3000"],
      methods:["POST", "GET"],
      credentials:true,
      allowedHeaders: 'Authorization,Content-Type'
   }
 ));
app.use('/client',router);
app.use('/vendor',vendor);
app.post('/login',(req,res)=>{
   //console.log("hello");
   const sql="SELECT * FROM users WHERE email = ?";
   db.query(sql,[req.body.email],(err,data)=>{
      if(err)
      {
         return res.json({
            message:"server side error"
         });
      }
      if(data.length>0)
      {
         bcrypt.compare(req.body.password, data[0].password, (err, result) => {
            if (err) {
                return res.json({
                  message:"compare password error"
               });
            }
            
            if (result) {
               const id=data[0].user_id;
               const token=jwt.sign({id},'our-jsonwebtoken-secret-key',{expiresIn:'1d'});
               res.cookie('token',token);
               return res.json({
                  status:"success"
               });
            } 
            else 
            {
                // Passwords don't match
                return res.json({
                  message:"Passwords don't match"
               });
            }
         
         });
      }
      else 
      {
         return res.json({
            message:"register yourself!"
         });
      }
   })
});



const verifyUser=(req,res,next)=>{
   const token=req.cookies.token;
   if(!token){
      return res.json({
         message:"Provide Token"
      });
   }
   else
   {
      jwt.verify(token,"our-jsonwebtoken-secret-key",(err,decode)=>{
         if(err){
            return res.json({message:"Authentication error"});
         }
         else
         {
            req.id=decode.id
            next();
         }
      });
   }
}

app.get('/user',verifyUser,(req,res)=>{
   return res.json({
      status:"Authenticated",
      id:req.id
   });
});

app.get('/logout',(req,res)=>{
   console.log("logout");
   res.clearCookie('token');
   return res.json({Status:"Success"});
});

function generateUserId() {
   // Get the current date
   const now = new Date();
   const day = ('0' + now.getDate()).slice(-2); // Get day with leading zero
   const month = ('0' + (now.getMonth() + 1)).slice(-2); // Get month with leading zero
   const year = now.getFullYear();
   const hours = ('0' + now.getHours()).slice(-2); // Get hours with leading zero
   const minutes = ('0' + now.getMinutes()).slice(-2); // Get minutes with leading zero
   const seconds = ('0' + now.getSeconds()).slice(-2); // Get seconds with leading zero

   return `USER${day}${month}${year}${hours}${minutes}${seconds}`;
}

 // User sign-up route
 app.post('/signup', (req, res) => {
   const { name, email, password } = req.body;

   // Generate a user ID for the new user
   const id = generateUserId();

   // Hash password before storing it in the database
   bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
         console.error('Error hashing password:', err);
         return res.status(500).json({ error: 'Internal server error' });
      }

      // Insert user data into the database
      const sql = "INSERT INTO users (user_id, name, email, password) VALUES (?, ?, ?, ?)";
      db.query(sql, [id, name, email, hash], (err, data) => {
         if (err) {
            console.error('Error inserting data:', err);
            return res.json({ message: 'You are already registered!' });
         }
         else
         {
            const token=jwt.sign({id},'our-jsonwebtoken-secret-key',{expiresIn:'1d'});
               res.cookie('token',token);
               return res.json({
                  status:"success",
                  message:"Successfully registered and logged In"
               });
         }
         });
      });
   });

 app.listen(5000,()=>{
   console.log('listening...');
 });
