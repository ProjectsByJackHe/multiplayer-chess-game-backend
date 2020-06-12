const express = require("express");

const router = express.Router();

router.get("/:gameid", (req, res, next) => {
    const gameid = req.params.gameid
    console.log(gameid)
    res.json({gameid})
});


module.exports = router;