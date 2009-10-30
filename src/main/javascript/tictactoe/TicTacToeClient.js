var TicTacToeClient = function () {
    var gameBoard = ["","","","","","","","",""];
    var playerSymbol = null;

    var stateChangeHandler;
    var stateChangeHandlerContext;

    var stateUpdateHandler;
    var stateUpdateHandlerContext;

    /**
     * The state change handler is called when the game state is changed
     * by the user
     *
     * @param handler
     * @param context
     */
    this.setStateChangeHandler = function (handler, context) {
        stateChangeHandler = handler;
        stateChangeHandlerContext = context;
    };

    /**
     * The state update handler is called when the game state is updated
     * by the wave
     *
     * @param handler
     * @param context
     */
    this.setStateUpdateHandler = function (handler, context) {
        stateUpdateHandler = handler;
        stateUpdateHandlerContext = context;
    };

    this.setGameBoard = function (newGameBoard) {
        gameBoard = newGameBoard;
        if (stateUpdateHandler) {
            stateUpdateHandler.call(stateUpdateHandlerContext);
        }
    };
    
    this.getGameBoard = function () {
        return gameBoard;
    };

    this.setPlayerSymbol = function (newPlayerSymbol) {
        playerSymbol = newPlayerSymbol;
    };

    this.getPlayerSymbol = function () {
        return playerSymbol;
    };

    this.makeMove = function (index) {
        if (gameBoard[index] === "" && playerSymbol) {
            gameBoard[index] = playerSymbol;
        }
        if (stateChangeHandler) {
            stateChangeHandler.call(stateChangeHandlerContext);
        }
    };
};