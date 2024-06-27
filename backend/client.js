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
            return res.json({events:data,message:"Events available"});
        }
        else
        {
            return res.json({
                message:"No events available"
             })
        }
    })
});

router.get('/getBids/:event_id',(req,res)=>{
    console.log(req.params.event_id);
    const event_id=req.params.event_id;
    const sql='SELECT * FROM bids WHERE event_id=?';

    db.query(sql,[event_id],(err,data)=>{
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
                message:"No bids available"
             })
        }
    })
});

router.put('/closeDeal/:vendor_id/:event_id', (req, res) => {
    const { vendor_id, event_id } = req.params;

    const sqlAward = `
        UPDATE bids
        SET status = 'awarded'
        WHERE vendor_id = ? AND event_id = ?;
    `;

    const sqlNotAward = `
        UPDATE bids
        SET status = 'not awarded'
        WHERE event_id = ? AND vendor_id != ?;
    `;

    const sqlVendorProj=`INSERT INTO projects (vendor_id,event_id) VALUES (?,?)`;

    // Start a transaction
    db.beginTransaction(err => {
        if (err) {
            return res.status(500).json({
                message: 'Transaction start failed',
                error: err.message
            });
        }

        // First update to set 'awarded' status
        db.query(sqlAward, [vendor_id, event_id], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    return res.status(500).json({
                        message: 'Error updating to awarded status',
                        error: err.message
                    });
                });
            }

            // Second update to set 'not awarded' status
            db.query(sqlNotAward, [event_id, vendor_id], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        return res.status(500).json({
                            message: 'Error updating to not awarded status',
                            error: err.message
                        });
                    });
                }

            db.query(sqlVendorProj,[vendor_id,event_id], (err,result)=>{
                if(err)
                    {
                        return db.rollback(() => {
                            return res.status(500).json({
                                message: 'Error registering vendor project',
                                error: err.message
                            })
                    });
            }});
                
                // Commit the transaction
                db.commit(err => {
                    if (err) {
                        return db.rollback(() => {
                            return res.status(500).json({
                                message: 'Transaction commit failed',
                                error: err.message
                            });
                        });
                    }

                    return res.json({
                        message: 'status changed'
                    });
                });
            });
        });
    });
});


export default router;