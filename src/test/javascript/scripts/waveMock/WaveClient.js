var WaveClient = function (mock, viewer) {
    var stateCallback;
    var stateCallbackContext;
    var participantCallback;
    var participantCallbackContext;
    var modeCallback;
    var modeCallbackContext;

    this.Mode = mock.Mode;

    this.getState = function () {
        return mock.getState();
    };

    this.isInWaveContainer = function () {
        return mock.isInWaveContainer();
    };

    this.setStateCallback = function (newStateCallback, context) {
        stateCallback = newStateCallback;
        stateCallbackContext = context;
    };

    this.setParticipantCallback = function (newParticipantCallback, context) {
        participantCallback = newParticipantCallback;
        participantCallbackContext = context;
    };

    this.setModeCallback = function (newModeCallback, context) {
        modeCallback = newModeCallback;
        modeCallbackContext = context;
    };

    this.getParticipants = function () {
        return mock.getParticipants();
    };

    this.getViewer = function () {
        return viewer;
    };

    this.getHost = function () {
        return mock.getHost();
    };

    this.getParticipantById = function (id) {
        return mock.getParticipantById(id);
    };

    this.getTime = function () {
        return mock.getTime();
    };

    this.log = function (message) {
        if(typeof console != "undefined") {
            console.log(message);
        }
    };

    this.util = {
        printJson: function(obj, opt_pretty, opt_tabs) {
            mock.JSON.stringify(obj);
        }
    };

    // ---- Private methods used by the mock framework ----
    this.__stateChanged = function () {
        if (stateCallback) {
            stateCallback.call(stateCallbackContext);
        }
    };

    this.__participantsChanged = function () {
        if (participantCallback) {
            participantCallback.call(participantCallbackContext);
        }
    };

    this.__modeChanged = function (mode) {
        if (modeCallback) {
            modeCallback.call(modeCallbackContext, mode);
        }
    };
};