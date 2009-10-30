<?
header("Content-type: text/xml");
echo '<?xml version="1.0" encoding="UTF-8" ?>';
?>
<Module>
<ModulePrefs title="Tic Tac Toe">
  <Require feature="wave" />
  <Require feature="dynamic-height" />
</ModulePrefs>
<Content type="html">
<![CDATA[
 <style type="text/css" media="screen">
     #board {
         width: 300px;
         height: 300px;
         margin: 40px;
     }

     .cell {
         float: left;
         width: 98px;
         height: 98px;
         font-size: 90px;
         text-align: center;
         border: 1px solid black;
     }
 </style>

  <script type="text/javascript">
    <? include("scripts/tictactoe/TicTacToeClient.js") ?>
    <? include("scripts/tictactoe/TicTacToeView.js") ?>
    <? include("scripts/tictactoe/TicTacToeWaveAdapter.js") ?>

    function init() {
        if(!wave || !wave.getViewer()) {
            setTimeout(init, 100);
            return;
        }
        
        var client  = new TicTacToeClient();
        var adapter = new TicTacToeWaveAdapter(wave, client);
        var view    = new TicTacToeView("board", client, gadgets);
    }

    gadgets.util.registerOnLoadHandler(init);
  </script>

  <div id="board"></div>
  ]]>
  </Content>
</Module>