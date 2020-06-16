class MasterGameSession {
    constructor() { 
        this.currentGamesInSession = {} // (Dictionary) <gameId> : <gameObject>
        this.numberOfGamesInSession = 0
    }

    addGame(game) {
        this.currentGamesInSession[game.gameId] = game
    }
}

module.exports = MasterGameSession