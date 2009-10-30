package no.bekk.wave.tictactoe;

import com.tandberg.gold.ScriptContext;
import org.junit.Test;

/**
 *
 */
public class TicTacToeTest {

    @Test
    public void runTicTacToeJavascriptTests() throws Exception {
        ScriptContext.evalScript("scripts/waveMock/WaveMock.js");
        ScriptContext.evalScript("scripts/waveMock/WaveClient.js");
        ScriptContext.evalScript("scripts/waveMock/WaveState.js");
        ScriptContext.evalScript("scripts/waveMock/WaveViewer.js");

        ScriptContext.evalScript("scripts/tictactoe/TicTacToeClient.js");
        ScriptContext.evalScript("scripts/tictactoe/TicTacToeView.js");
        ScriptContext.evalScript("scripts/tictactoe/TicTacToeWaveAdapter.js");

        ScriptContext.evalScript("scripts/gold/gold.js");
        ScriptContext.evalScript("scripts/test/tictactoe.js");
    }
}
