var TicTacToeWaveAdapter = function (wave, client) {

    /**
     * Retrieve the state of the game board from the wave
     */
    function getGameBoard() {
        return (wave.getState().get("gameBoard") || ",,,,,,,,").split(",");
    }

    /**
     * Stores the game state in the wave
     */
    function setGameState(newGameBoard, playerSymbol) {
        var viewerId = wave.getViewer().getId();
        var delta = {};

        // remove the playerSymbol from the list of available symbols
        var availablePlayerSymbols = getAvailablePlayerSymbols();
        if (availablePlayerSymbols.indexOf(playerSymbol) > -1) {
            availablePlayerSymbols.splice(availablePlayerSymbols.indexOf(playerSymbol), 1);
        }
        
        delta['playerSymbol-' + viewerId] = playerSymbol;
        delta.gameBoard = newGameBoard.join(",");
        delta.availablePlayerSymbols = availablePlayerSymbols.join(',');

        wave.getState().submitDelta(delta);
    }

    /**
     * Retrieves the symbol assigned to the current player
     */
    function getPlayerSymbol() {
        if (wave.getViewer()) {
            var viewerId = wave.getViewer().getId();
            var state = wave.getState();

            if (state) {
                var viewersSymbol = state.get('playerSymbol-' + viewerId);
                if (viewersSymbol) {
                    return viewersSymbol;
                }
            }            
        }

        return getAvailablePlayerSymbols()[0];
    }

    function getAvailablePlayerSymbols() {
        var state = wave.getState();
        if (state && state.get('availablePlayerSymbols') !== null) {
            return state.get('availablePlayerSymbols').split(',');
        }

        return ['X', 'O'];
    }

    wave.setStateCallback(function () {
        client.setGameBoard(getGameBoard());
        client.setPlayerSymbol(getPlayerSymbol());
    }, this);

    client.setStateChangeHandler(function () {
        setGameState(client.getGameBoard(), client.getPlayerSymbol());
    }, this);

    client.setPlayerSymbol(getPlayerSymbol());
};