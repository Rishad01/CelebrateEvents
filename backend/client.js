import express from 'express';
import db from "./db.js";
const router = express.Router();

function generateEventId() {
    // Get the current date
    const now = new Date();
    const day = ('0' + now.getDate()).slice(-2); // Get day with leading zero
    const month = ('0' + (now.getMonth() + 1)).slice(-2); // Get month with leading zero
    const year = now.getFullYear();
    const hours = ('0' + now.getHours()).slice(-2); // Get hours with leading zero
    const minutes = ('0' + now.getMinutes()).slice(-2); // Get minutes with leading zero
    const seconds = ('0' + now.getSeconds()).slice(-2); // Get seconds with leading zero
 
    return `event${day}${month}${year}${hours}${minutes}${seconds}`;
 }


router.post('/addEvent',(req,res)=>{
    const {user_id,event,location,date,time,guestNum,descr,images,budget}=req.body;
    const sql="INSERT INTO eventlist (event_id,user_id,event,location,date,time,guestNum,descr,images,budget) VALUES (?,?,?,?,?,?,?,?,?,?)";
    const id = generateEventId();
    db.query(sql,[id,user_id,event,location,date,time,guestNum,descr,images,budget],(err,data)=>{
        if(err){
            console.error('Error inserting data:', err);
            return res.json({ message: 'Event not added' });
         }
         else
         {
            return res.json({message:'Event added!'});
         }
    });
});

router.get('/getPostedEvents/:user_id',(req,res)=>{
    console.log(req.params.user_id);
    const user_id=req.params.user_id;
    const sql='SELECT * FROM eventlist WHERE user_id=?';

    db.query(sql,[user_id],(err,data)=>{
        if(err){
            return res.json({
                message:"serever side error"
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

export default router;