const router = require("express").Router();
const connection = require("../../db/dbconnection.js");
const { body, validationResult } = require('express-validator');
const util = require("util"); // helper 
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const authorized = require("../../middleware/authorized");

//======= function increment the rate of post when get the post =====//
router.get("/:id", async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection); // transform query to promise to can use await/ async
        const newspost = await query("SELECT * FROM news WHERE id = ?", req.params.id);
        
        if (newspost.length === 0) {
            // Post with the given ID not found
            return res.status(404).json({ error: 'Post not found' });
        }
        
        await query("UPDATE news SET seen = seen + 1 WHERE id = ?", req.params.id);
        
        res.status(200).json(newspost);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
