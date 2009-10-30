var TicTacToeView = function (target, client, gadgets) {
    var el = document.getElementById(target);
    var cells = [];

    function render() {
        for (var i=0; i < 9; i++) {
            var cell = createCell(i);
            cells.push(cell);
            el.appendChild(cell);
        }
    }

    function update() {
        var gameBoard = client.getGameBoard();
        for (var i=0; i < cells.length; i++) {
            cells[i].innerHTML = gameBoard[i];
        }
        if (gadgets) {
            gadgets.window.adjustHeight();
        }
    }

    function createCell(index) {
		var cell =  document.createElement('div');
        cell.className = "cell";
        cell.onclick = function () {
			client.makeMove(index);
		};
		return cell;
	}


    client.setStateUpdateHandler(update);
    render();
    update();    
};