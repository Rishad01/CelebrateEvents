import express from 'express';
import db from './db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {jwtAuthMiddleware,generateToken} from "./jwt.js";

const vendor = express.Router();

vendor.post('/login',(req,res)=>{
    console.log("hello");
    const sql="SELECT * FROM vendors WHERE email = ?";
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
               //console.log('jwt');
                const id={id:data[0].vendor_id};
                const token = generateToken(id);
                return res.json({
                   status:"success",
                   token: token
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
 
 vendor.get('/authenticate',jwtAuthMiddleware,(req,res)=>{
   const userid=req.userid;
   //console.log(userid);
   if(userid.id){
    return res.json({
       status:"Authenticated",
       id:userid.id
    });
   }
   else
   {
      return res.status(401).json({ error: 'unauthorized'});
   }
 });

 vendor.get('/logout',(req,res)=>{
    console.log("logout");
    res.clearCookie('token');
    return res.json({Status:"Success"});
 });
 
 function generateVendorId() {
    // Get the current date
    const now = new Date();
    const day = ('0' + now.getDate()).slice(-2); // Get day with leading zero
    const month = ('0' + (now.getMonth() + 1)).slice(-2); // Get month with leading zero
    const year = now.getFullYear();
    const hours = ('0' + now.getHours()).slice(-2); // Get hours with leading zero
    const minutes = ('0' + now.getMinutes()).slice(-2); // Get minutes with leading zero
    const seconds = ('0' + now.getSeconds()).slice(-2); // Get seconds with leading zero
 
    return `vendor${day}${month}${year}${hours}${minutes}${seconds}`;
 }
 
  // vendor sign-up route
  vendor.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    // Generate a vendor ID for the new vendor
    const id = generateVendorId();
 
    // Hash password before storing it in the database
    bcrypt.hash(password, 10, (err, hash) => {
       if (err) {
          console.error('Error hashing password:', err);
          return res.status(500).json({ error: 'Internal server error' });
       }
 
       // Insert vendor data into the database
       const sql = "INSERT INTO vendors (vendor_id, name, email, password) VALUES (?, ?, ?, ?)";
       db.query(sql, [id, name, email, hash], (err, data) => {
          if (err) {
             console.error('Error inserting data:', err);
             return res.json({ message: 'You are already registered!' });
          }
          else
          {
            try{
                const token=generateToken({id:id});
                console.log(token);
                return res.json({
                   status:"success",
                   message:"Successfully registered and logged In",
                   token: token
                });
               }catch (signError) {
                  console.error('Error signing token:', signError);
                  return res.status(500).json({ message: "Token creation error" });
              }
          }
          });
       });
    });

    vendor.get('/postedEvents',(req,res)=>{
      const sql='SELECT * FROM eventlist';
      db.query(sql,(err,data)=>{
         if(err){
             return res.json({
                 message:"server side error"
              });
         }
         if(data.length > 0)
         {
            return res.json(data);
         }
         else
         {
             return res.json({
                 message:"No events available"
              })
         }
     })
    });

    function generateBidId() {
      // Get the current date
      const now = new Date();
      const day = ('0' + now.getDate()).slice(-2); // Get day with leading zero
      const month = ('0' + (now.getMonth() + 1)).slice(-2); // Get month with leading zero
      const year = now.getFullYear();
      const hours = ('0' + now.getHours()).slice(-2); // Get hours with leading zero
      const minutes = ('0' + now.getMinutes()).slice(-2); // Get minutes with leading zero
      const seconds = ('0' + now.getSeconds()).slice(-2); // Get seconds with leading zero
   
      return `bid${day}${month}${year}${hours}${minutes}${seconds}`;
   }

    vendor.post('/storeBid',jwtAuthMiddleware,(req,res)=>{
      const{event_id,bidAmt,proposal}=req.body;
      const userid=req.userid.id;
      console.log(userid);
      console.log(req.body);
      const bidId=generateBidId();
      const insertBidSql=`INSERT INTO bids (bid_id, vendor_id, event_id, bidAmt, proposal) VALUES (? ,?, ?, ?, ?)`;

      
            db.query(insertBidSql, [bidId, userid, event_id, bidAmt, proposal], (err, data) => {
               if (err) {
                 return db.rollback(() => {
                  console.error(err);
                   res.status(500).json({ message: "Server side error" });
                 });
               }
         
               // Calculate highest, lowest, and average bids
               const calcBidSql = `
                 SELECT 
                   COUNT(*) AS bidCount,
                   MAX(bidAmt) as highestBid, 
                   MIN(bidAmt) as lowestBid, 
                   AVG(bidAmt) as avgBid 
                 FROM 
                   bids 
                 WHERE 
                   event_id = ?`;
         
               db.query(calcBidSql, [event_id], (err, results) => {
                 if (err) {
                   return db.rollback(() => {
                     res.status(500).json({ message: "Server side error" });
                   });
                 }
         
                 const { bidCount, highestBid, lowestBid, avgBid } = results[0];
         
                 // Update the bid with the calculated values
                 const updateBidSql = `
                   UPDATE 
                     bids 
                   SET 
                     bidNum = ?,
                     highBid = ?, 
                     lowBid = ?, 
                     avgBid = ? 
                   WHERE 
                     event_id = ?`;
         
                 db.query(updateBidSql, [bidCount, highestBid, lowestBid, avgBid, event_id], (err, results) => {
                   if (err) {
                     return db.rollback(() => {
                       res.status(500).json({ message: "Server side error" });
                     });
                   }
         
                   db.commit(err => {
                     if (err) {
                       return db.rollback(() => {
                         res.status(500).json({ message: "Server side error" });
                       });
                     }
         
                     res.json({ status: 'success' });
                   });
                 });
               });
      });
    });
 
    vendor.get('/checkBidStatus/:event_id',jwtAuthMiddleware,(req,res)=>{
      const event_id=req.params.event_id;
      const vendor_id=req.userid.id;
      const sql='SELECT COUNT(*) AS bidCount FROM bids WHERE vendor_id=? AND event_id=?';

      db.query(sql,[vendor_id,event_id],(err,data)=>{
         if(err)
            {
               //console.error('SQL query error:', err);
               return res.json({
                  message:"server side error"
               });
            }
            //console.log(data);
            const bidCount = data[0].bidCount;
            //console.log(bidCount);
            if (bidCount > 0)
            {
               try{
                  return res.json({
                     status:"set"
                  });
                 }catch (jsonError) {
                    console.error('Error sending JSON response:', jsonError);
                    return res.status(500).json({ message: "Error sending JSON response" });
                  }
            }
            else
            {

            }
            
      })
    });

    vendor.get('/proposedEvents',jwtAuthMiddleware,(req,res)=>{
      const vendor_id=req.userid.id;
      const sql='SELECT * FROM bids WHERE vendor_id=?';
      db.query(sql,[vendor_id],(err,data)=>{
         if(err){
             return res.json({
                 message:"server side error"
              });
         }
         //console.log(data);
         if(data.length > 0)
         {
            return res.json(data);
         }
         else
         {
             return res.json({
                 message:"No events available"
              })
         }
     })
    });

    vendor.get('/getEvent/:event_id',(req,res)=>{
      const event_id=req.params.event_id;

      const sql='SELECT * FROM eventlist WHERE event_id=?';

      db.query(sql,[event_id],(err,data)=>{
         if(err)
            {
               //console.error('SQL query error:', err);
               return res.json({
                  message:"server side error"
               });
            }

            if(data.length > 0)
               {
                  return res.json(data);
               }
               else
               {
                   return res.json({
                       message:"Event is finalized by someone else"
                    })
               }
      })
    });

    vendor.post('/reviseOffer',(req,res)=>{
      const{bid_id,revisedOffer}=req.body;
      console.log(req.body);
      const sql='UPDATE bids SET bidAmt=? WHERE bid_id=?';
      db.query(sql,[revisedOffer,bid_id],(err,data)=>{
         if(err){
            return res.json({
                message:"server side error"
             });
        }
        if(data)
         {
            console.log(data);
            return res.json({ status: 'success' });
         }
         else
         {
             return res.json({
                 message:"not updated"
              })
         }
      })
    });
 export default vendor;