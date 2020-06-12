const express = require("express");

const router = express.Router();

router.post("/", (req, res, next) => {
    const gameId = req.body.gameid 
    const userName = req.body.userName
    console.log(gameId)
    console.log(userName)
    res.json({gameId})
});


module.exports = router;