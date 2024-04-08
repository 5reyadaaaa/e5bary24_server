const router = require("express").Router();
const connection = require("../../db/dbconnection.js");
const { body , validationResult } = require('express-validator');
const util = require("util"); // helper 
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const authorized = require("../../middleware/authorized");


//======= function increment the rate of post when get the post =====//
router.get("/",async(req,res)=>{
    const catName = req.query.catname; // Access query parameter
    const query = util.promisify(connection.query).bind(connection); // transform query to promise to can use await/ async
    const newspost = await query("SELECT * FROM news WHERE category = ? ORDER BY time DESC LIMIT 3", [catName]);
    res.status(202).json(newspost);
    
})


module.exports = router;