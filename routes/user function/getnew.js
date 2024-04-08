const router = require("express").Router();
const connection = require("../../db/dbconnection.js");
const { body , validationResult } = require('express-validator');
const util = require("util"); // helper 
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const authorized = require("../../middleware/authorized");


//======= function increment the rate of post when get the post =====//
router.get("/:id",async(req,res)=>{
    const query = util.promisify(connection.query).bind(connection); // transform query to promise to can use await/ async
    const newspost=  await query ("select * from news where id = ?",req.params.id);
    await query ("UPDATE news SET seen = seen + 1 WHERE id = ?",req.params.id);
    res.status(202).json(newspost);
    
})


module.exports = router;