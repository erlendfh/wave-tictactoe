/**
 * WaveMock is a mock implementation of the Google Wave API to
 * enable test driven development of Wave gdgets.
 *
 * Usage:
 *
 *   waveMock = new WaveMock();
 *   viewer = new WaveViewer("test1@test.com", "Viewer 1", "http://avatar.url/");
 *   wave = waveMock.newWaveClient(viewer);
 *
 * The 'wave' object can now be used just like the standard wave global object.
 *
 */
var WaveMock = function () {
    var clients = [];
    var state = new WaveState(function () {
        for(var i=0; i < clients.length; i++) {
            clients[i].__stateChanged();
        }
    });
    var isInWaveContainer = true;
    var currentTime = null;

    this.Mode = {
        UNKNOWN: 0,
        VIEW: 1,
        EDIT: 2,
        DIFF_ON_OPEN: 3,
        PLAYBACK: 4
    };

    var mode = this.Mode.UNKNOWN;

    this.newWaveClient = function (viewer) {
        var client = new WaveClient(this, viewer);
        clients.push(client);

        for(var i=0; i < clients.length; i++) {
            clients[i].__participantsChanged();
        }
        return client;
    };

    this.getState = function () {
        return state;
    };

    this.getParticipants = function () {
        var participants = [];
        for (var i=0; i < clients.length; i++) {
            participants.push(clients[i].getViewer());
        }
        
        return participants;
    };

    this.getHost = function () {
        return clients[0].getViewer();
    };

    this.getParticipantById = function (id) {
        for(var i=0; i < clients.length; i++) {
            if(clients[i].getViewer().getId() == id) {
                return clients[i].getViewer();
            }
        }
    };

    this.isInWaveContainer = function () {
        return isInWaveContainer;
    };

    this.setIsInWaveContainer = function (status) {
        isInWaveContainer  = status;
    };

    this.getTime = function() {
        return currentTime ? currentTime.getTime() : new Date().getTime();
    };

    this.setTime = function (newTime) {
        currentTime = newTime;
    };

    this.setMode = function (newMode) {
        mode = newMode;

        for (var i=0; i < clients.length; i++) {
            clients[i].__modeChanged(newMode);
        }
    };

    if(!this.JSON) {
        this.JSON = (function(){var JSON = {}; function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};} return JSON;}());
    }
};