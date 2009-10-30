gold.lang.require('gold.framework.Assert');

gold.TestRunner.add('WaveMock Test', function () {
    function createWaveClientA(mock) {
        return mock.newWaveClient(new WaveViewer("test1@test.com", "Test User 1", ""));
    }

    function createWaveClientB(mock) {
        return mock.newWaveClient(new WaveViewer("test2@test.com", "Test User 2", ""));
    }
    
    return {
        testNewStateShouldBePropagatedToAllClients: function () {
            var waveMock = new WaveMock();
            var wave1 = createWaveClientA(waveMock);
            var wave2 = createWaveClientB(waveMock);

            var wave1StateChanged = false;
            var wave2StateChanged = false;
            var newState = "newState";

            wave1.setStateCallback(function() {
                wave1StateChanged = true;
            });

            wave2.setStateCallback(function() {
                wave2StateChanged = true;
            });

            wave1.getState().submitDelta({
                "someState": newState
            });

            gold.assert(wave1.getState().get("someState")).equals(newState);
            gold.assert(wave2.getState().get("someState")).equals(newState);
            gold.assert(wave1StateChanged).isTrue();
            gold.assert(wave2StateChanged).isTrue();
        },

        testAddingNewParticipantsShouldNotifyAllClients: function () {
            var waveMock = new WaveMock();
            var wave1 = createWaveClientA(waveMock);

            var wave1ParticipantsChanged = false;

            wave1.setParticipantCallback(function() {
                wave1ParticipantsChanged = true;
            });

            createWaveClientB(waveMock);

            gold.assert(wave1ParticipantsChanged).isTrue();
        },

        testRetrievingParticipantByIdShouldReturnTheCorrectViewer: function () {
            var waveMock = new WaveMock();
            var wave1 = createWaveClientA(waveMock);
            var wave2 = createWaveClientB(waveMock);

            gold.assert(wave1.getParticipantById(wave1.getViewer().getId())).equals(wave1.getViewer());
        },

        testGetParticipantsShouldReturnTheCorrectNumberOfParticipants: function () {
            var waveMock = new WaveMock();
            var wave1 = createWaveClientA(waveMock);
            var wave2 = createWaveClientB(waveMock);

            gold.assert(wave1.getParticipants().length).equals(2);
        },

        testGetHostShouldReturnTheViewerOfTheFirstClient: function () {
            var waveMock = new WaveMock();
            var wave1 = createWaveClientA(waveMock);
            var wave2 = createWaveClientB(waveMock);

            gold.assert(wave2.getHost()).equals(wave1.getViewer());
        },

        testGetTimeShouldReturnTheTimeSetOnTheMockObject: function () {
            var waveMock = new WaveMock();
            var wave1 = createWaveClientA(waveMock);

            var date = new Date();
            waveMock.setTime(date);

            gold.assert(wave1.getTime()).equals(date.getTime());
        },

        testChangingTheModeOfTheMockShouldChangeTheModeOfTheClients: function () {
            var waveMock = new WaveMock();
            var wave1 = createWaveClientA(waveMock);
            var waveMode = null;
            var mockMode = waveMock.Mode.PLAYBACK;

            wave1.setModeCallback(function (newMode) {
                waveMode = newMode;
            });

            waveMock.setMode(mockMode);

            gold.assert(waveMode).equals(mockMode);
        },

        testSubmittingASingleValueShouldUpdateTheStateCorrectly: function () {
            var waveMock = new WaveMock();
            var wave1 = createWaveClientA(waveMock);
            wave1.getState().submitValue("someKey", "someValue");
            gold.assert(wave1.getState().get("someKey")).equals("someValue");
        }
        
    };
});