gold.lang.require('gold.framework.Assert');

gold.TestRunner.add('Tic Tac Toe Wave Adapter Test', function () {

    function arrayCompare(a1, a2) {
        if (a1.length != a2.length) {
            return false;
        }

        for(var i=0; i < a1.length; i++) {
            if (a1[i] != a2[i]) {
                return false;
            }
        }

        return true;
    }

    var waveMock;

    var viewer1;
    var viewer2;
    var viewer3;

    var wave1;
    var wave2;
    var wave3;

    var client1;
    var client2;
    var client3;

    var adapter1;
    var adapter2;
    var adapter3;

	return {
        before: function () {
            waveMock = new WaveMock();

            viewer1 = new WaveViewer("test1@test.com", "Viewer 1", "");
            viewer2 = new WaveViewer("test2@test.com", "Viewer 2", "");
            viewer3 = new WaveViewer("test3@test.com", "Viewer 3", "");

            wave1 = waveMock.newWaveClient(viewer1);
            wave2 = waveMock.newWaveClient(viewer2);
            wave3 = waveMock.newWaveClient(viewer3);

            client1 = new TicTacToeClient();
            client2 = new TicTacToeClient();
            client3 = new TicTacToeClient();

            adapter1 = new TicTacToeWaveAdapter(wave1, client1);
            adapter2 = new TicTacToeWaveAdapter(wave2, client2);
            adapter3 = new TicTacToeWaveAdapter(wave3, client3);
        },
        
        testUpdatingOneClientShouldUpdateTheOther: function () {
            var newState = ["","","","X","","","","",""];

            client1.makeMove(3);

            gold.assert(arrayCompare(client1.getGameBoard(), newState)).isTrue();
            gold.assert(arrayCompare(client1.getGameBoard(), client2.getGameBoard())).isTrue();
        },

        testTheFirstClientShouldBeAssignedXTheSecondClientShouldBeAssignedOTheThirdClientShouldBeIgnored: function () {
            var newState = ["X","O","","","","","","",""];
            var state = wave1.getState();
            client1.makeMove(0);
            client2.makeMove(1);
            client3.makeMove(2); // should do nothing, as client1 and client2 has claimed the player symbols
            gold.assert(arrayCompare(client1.getGameBoard(), newState)).isTrue();
        },

        testTheClientShouldGetItsAssignedPlayerSymbolWhenResuming: function () {
            var newState = ["O","X","","","","","","",""];
            wave1.getState().submitValue('playerSymbol-' + viewer1.getId(), 'O');

            gold.assert(client1.getPlayerSymbol()).equals("O");

            client1.makeMove(0);
            client2.makeMove(1);
            gold.assert(arrayCompare(client1.getGameBoard(), newState)).isTrue();
        }
    };
});