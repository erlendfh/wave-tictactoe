var WaveViewer = function (id, displayName, thumbnailUrl) {

    this.getId = function () {
        return id;
    };

    this.getDisplayName = function () {
        return displayName;
    };

    this.getThumbnailUrl = function () {
        return thumbnailUrl;
    };
};