gold.lang.require('gold.framework.Assert');

gold.TestRunner.add('Tic Tac Toe Client Test', function () {
    function emptyBoard() {
        return ["","","","","","","","",""];
    }

    function newClient() {
        var client = new TicTacToeClient();
        client.setPlayerSymbol("X");
        return client;
    }
    
    function arrayCompare(a1, a2) {
        if (a1.length != a2.length) {
            return false;
        }

        for (var i=0; i < a1.length; i++) {
            if (a1[i] != a2[i]) {
                return false;
            }
        }

        return true;
    }

	return {
        testANewGameShouldHaveAnEmptyBoard: function () {
            var client = newClient();
            gold.assert(arrayCompare(client.getGameBoard(), emptyBoard())).isTrue();
        },

        testMakingAMoveShouldChangeTheBoard: function () {
            var client = newClient();
            var board = emptyBoard();
            board[1] = "X";
            client.makeMove(1);
            gold.assert(arrayCompare(client.getGameBoard(), board)).isTrue();
        },

        testMakingAMoveOnAnOccupiedSquareShouldFail: function () {
            var client = newClient();
            var board = emptyBoard();
            board[1] = "O";
            client.setGameBoard(board);
            client.makeMove(1);
            gold.assert(arrayCompare(client.getGameBoard(), board)).isTrue();
        }
    };
});