const router = require("express").Router();
const connection = require("../../db/dbconnection.js");
const { body , validationResult } = require('express-validator');
const util = require("util"); // helper 
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const admin = require("../../middleware/admin");

// function make admin create another admin
router.post("/",admin,async(req,res)=>{
   const { name , email , password , phone } = req.body;
   try
   {
         //==== check the email is exist or not ====//
         const query = util.promisify(connection.query).bind(connection); // transform query to promise to can use await/ async
         const emailexist = await query ("select * from user where email = ? ",email)
         if(emailexist.length > 0)
         {
            res.status(400).json({msg:"this email is already exist .."})
         }
         else
         {
            //==== prepare the object 
            const userobj ={
             name : name,
             email : email,
             password : await bcrypt.hash(password,10),
             phone : phone,
             token : crypto.randomBytes(16).toString("hex"),
             status : "admin"
            }
            // add the data in database 
            await query ("insert into user set ? ", userobj)
            res.status(500).json({
             msg : " the registration is success",
            })
         }

   }
   catch(err)
   {
    res.status(404).json(err)
   }
})

module.exports = router;