var WaveState = function (onStateChange) {
    var stateValues = {};

    this.submitDelta = function (delta) {
        for(var key in delta) {
            if (delta.hasOwnProperty(key)) {
                stateValues[key] = delta[key].toString();
            }
        }
        onStateChange();
    };

    this.reset = function () {
        stateValues = {};
        onStateChange();
    };

    this.submitValue = function (key, value) {
        var delta = {};
        delta[key] = value;
        this.submitDelta(delta);
    };

    this.get = function (key) {
        return stateValues[key] !== undefined ? stateValues[key] : null;
    };

    this.toString = function () {
        return stateValues.toString();
    };
};