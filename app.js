const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const gameLogic = require('./game-logic')
const bodyParser = require('body-parser')
const app = express()

/**
 * Backend flow:
 * - check to see if the game ID encoded in the URL belongs to a valid game session in progress. 
 * - if yes, join the client to that game. 
 * - else, create a new game instance. 
 * - '/' path should lead to a new game instance. 
 * - '/game/:gameid' path should first search for a game instance, then join it. Otherwise, throw 404 error.  
 */

// registering middlewares:
app.use(bodyParser.json())
// configuring middlewares:
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*') // allow any domain to send requests
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next()
})


app.use('/', (req, res, next) => {
    const gameId = req.body.gameid 
    console.log(gameId)
    res.json(gameId)
})


app.use('/game/:gameid', (req, res, next) => {
    const gameIdToJoin = req.params.gameid
    console.log(gameIdToJoin)
    res.json(gameIdToJoin)
})


app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || "an unknown error occured."})
})

const server = http.createServer(app)
const io = socketio(server)

// get the gameID encoded in the URL. 
// check to see if that gameID matches with all the games currently in session. 
// join the existing game session. 
// create a new session.  
// run when client connects
io.on('connection', socket => {
    // listens when client connects
    console.log('new web socket connection')
    gameLogic.createGame(io, socket)
})

// usually here is where we try to connect to our DB.
server.listen(4000)