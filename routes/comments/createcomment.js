const router = require("express").Router();
const connection = require("../../db/dbconnection.js");
const { body, validationResult } = require('express-validator');
const util = require("util"); // helper 
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const admin = require("../../middleware/admin");
// function create newss

router.post("/", async (req, res) => {
    // get input
    const { name,email , desc, postID } = req.body;
    try {
        const query = util.promisify(connection.query).bind(connection);
        // check user exist 
        // get the current time 
        function getCurrentDateInCairo() {
            const options = {
                timeZone: 'Africa/Cairo',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            };

            return new Date().toLocaleString('en-US', options);
        }
        const time2 = getCurrentDateInCairo();
        // declaration
        const emailobj = await query ("select * from comment where email = ?",email);
        // validate of post 
        const postobj = await query ("select * from news where id = ?",postID);
        if(!postobj[0])
        {
            res.status(404).json("the post not found ....")
        }
        // validation of ((user cant write comment more than one time))
        else if(emailobj[0])
        {
            res.status(400).json("sorry the email is already write comment ....")
        }
        else
        {
            // prepare th eobject 
            const commentobj = {
                email: email,
                name:name,
                desc: desc,
                postID: postID,
                time: time2
            }
            // insert it in data base 
            await query("insert into comment set ?",commentobj);
            res.status(200).json(commentobj);
        }
    }

    catch (err) {
        res.status(404).json(err)
    }
})


module.exports = router;