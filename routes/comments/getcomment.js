const router = require("express").Router();
const connection = require("../../db/dbconnection.js");
const { body, validationResult } = require('express-validator');
const util = require("util"); // helper 
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const admin = require("../../middleware/admin");

// function get all comments by postid 

router.get("/",async(req,res)=>{
    try
    {
        const query = util.promisify(connection.query).bind(connection); // transform query to promise to can use await/ async
        const comentList = await query ("select * from comment where postID = ?",req.query.postid);
        const postobj = await query ("select * from news where id = ? ",req.query.postid);
        if(!comentList[0])
        {
            res.status(404).json("sorry the post dont have any comment ...");             
        }
        else if (postobj[0]=null)
        {
            res.status(404).json("SORRY THE POST NOT FOUND ....");
        }
        else
        {
            res.status(200).json(comentList)
        }

    }
    catch(err)
    {
        res.status(404).json(err)
    }
})




module.exports = router ;