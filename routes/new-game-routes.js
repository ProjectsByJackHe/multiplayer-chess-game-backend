const express = require("express");
const Game = require('../model/game')
const MasterGameCollection = require('../model/masterGameCollection')
const router = express.Router();

router.post("/", (req, res, next) => {
    const gameId = req.body.gameid 
    const userName = req.body.userName
    const newGame = new Game(gameId, userName)
    MasterGameCollection.addGame(newGame)
    console.log(MasterGameCollection)
    res.json({gameId})
});


module.exports = router;