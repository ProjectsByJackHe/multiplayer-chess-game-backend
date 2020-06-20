const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const gameLogic = require('./game-logic')
const bodyParser = require('body-parser')
const HttpError = require('./model/http-error')
const app = express()
const gameRoutes = express.Router();

// directing user to a valid game session or creating a new game session. 
gameRoutes.post("/", (req, res, next) => {
    const gameId = req.body.gameid 
    const userName = req.body.userName
    console.log(userName)
    res.json({gameId})
});
gameRoutes.get("/game/:gameid", (req, res, next) => {
    const gameid = req.params.gameid
    // console.log(gameid)
    res.json({gameid})
});

// deal with CORS policy:
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*') // allow any domain to send requests
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next()
})
app.use('/', gameRoutes)

// error handling:
app.use((req, res, next) => {
    const error = new HttpError('resource not found on server', 404)
    throw error
})
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || "an unknown error occured."})
})

/**
 * Backend flow:
 * - check to see if the game ID encoded in the URL belongs to a valid game session in progress. 
 * - if yes, join the client to that game. 
 * - else, create a new game instance. 
 * - '/' path should lead to a new game instance. 
 * - '/game/:gameid' path should first search for a game instance, then join it. Otherwise, throw 404 error.  
 */


const server = http.createServer(app)
const io = socketio(server)

// get the gameID encoded in the URL. 
// check to see if that gameID matches with all the games currently in session. 
// join the existing game session. 
// create a new session.  
// run when client connects

io.on('connection', client => {
    gameLogic.initializeGame(io, client)
})

// usually this is where we try to connect to our DB.
server.listen(8000)