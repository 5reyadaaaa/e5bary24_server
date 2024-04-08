const router = require("express").Router();
const connection = require("../../db/dbconnection.js");
const { body, validationResult } = require('express-validator');
const util = require("util"); // helper 
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const admin = require("../../middleware/admin");
// function create newss

router.post("/", admin, async (req, res) => {
    // get input
    const { name, description , ads_img} = req.body;
    try {
        const query = util.promisify(connection.query).bind(connection);
        // prepare the object to insert it in data base 
        const adsobj = {
            name : name ,
            description : description ,
            ads_img : ads_img
        };
        // insert it in date base 
        await query ("insert into ads set ? ",adsobj);
        res.status(200).json(req.body);

    }
    catch (err) {
        res.status(404).json(err)
    }
})


module.exports = router;