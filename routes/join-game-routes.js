const express = require("express");

const router = express.Router();

router.get("/:gameid", (req, res, next) => {
    const gameid = req.params.gameid
    res.json({gameid})
});


module.exports = router;