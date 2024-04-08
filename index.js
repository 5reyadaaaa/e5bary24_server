//================= init express app ===============
const express = require("express");
const app = express();
//const job=require('./keepAwake');
//job.job.start();

//=================Global middleware==================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("upload"));
const cors = require("cors");

// CORS middleware allowing requests from any origin
app.use(cors());

//======== run the app ============//
// Run the app
const port = 4004;
app.listen(port || process.env.port, () => {
    console.log(`SERVER IS RUNNING....${port}`);
});

//======== require routes ========//

//======== auth function =========//
 app.use("/register",require("./routes/auth/register"));
 app.use("/login",require("./routes/auth/login"));
//======== admin function ========//
app.use("/createadmin",require("./routes/admin_fun/create_admin"));
app.use("/creatnews",require("./routes/news/createnews"));
app.use("/createads",require("./routes/ads/createads"));
//======== user function ========//
app.use("/getpost",require("./routes/news/getnew"));
app.use("/getallnews",require("./routes/news/getallnews"));
app.use("/getallads",require("./routes/ads/getallads"));
app.use("/createcomment",require("./routes/comments/createcomment"));
app.use("/getcomment",require("./routes/comments/getcomment"));~
//======== gets ============//
app.use("/catget",require("./routes/gets/getpostbycat"));
app.use("/mostpopular",require("./routes/gets/getpopularnews"));
app.use("/lastestnews",require("./routes/gets/getlastestnews"));
app.use("/lastbycat",require("./routes/gets/lastbycat"));
app.use("/last5",require("./routes/gets/last5"));
