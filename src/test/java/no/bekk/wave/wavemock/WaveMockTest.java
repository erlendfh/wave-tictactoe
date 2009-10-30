package no.bekk.wave.wavemock;

import com.tandberg.gold.ScriptContext;
import org.junit.Test;

/**
 *
 */
public class WaveMockTest {

    @Test
    public void runWaveMockJavascriptTests() throws Exception {
        ScriptContext.evalScript("scripts/waveMock/WaveMock.js");
        ScriptContext.evalScript("scripts/waveMock/WaveClient.js");
        ScriptContext.evalScript("scripts/waveMock/WaveState.js");
        ScriptContext.evalScript("scripts/waveMock/WaveViewer.js");

        ScriptContext.evalScript("scripts/gold/gold.js");
        ScriptContext.evalScript("scripts/test/waveMock.js");
    }
}
