const router = require("express").Router();
const connection = require("../../db/dbconnection.js");
const util = require("util"); // helper 

// function to get all news by category 
router.get("/", async (req, res) => {
    const query = util.promisify(connection.query).bind(connection); // transform query to promise to use await/async
    try {
        const catName = req.query.catName; // Access query parameter
        const newsobj = await query("SELECT * FROM news WHERE category = ?", [catName]);
        if (newsobj.length > 0) {
            res.status(200).json(newsobj);
        } else {
            res.status(404).json("THE CATEGORY DOESN'T HAVE ANY NEWS...");
        }
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
});

module.exports = router;
