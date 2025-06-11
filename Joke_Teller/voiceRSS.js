// VoiceRSS JavaScript SDK
const VoiceRSS = {
    speech: function (e) {
        this._validate(e);
        this._request(e);
    },

    _validate: function (e) {
        if (!e) throw "The settings are undefined";
        if (!e.key) throw "The API key is undefined";
        if (!e.src) throw "The text is undefined";
        if (!e.hl) throw "The language is undefined";

        if (e.c && e.c.toLowerCase() !== "auto") {
            let isSupported = false;
            const codec = e.c.toLowerCase();
            const audio = new Audio();

            switch (codec) {
                case "mp3":
                    isSupported = audio.canPlayType("audio/mpeg").replace("no", "");
                    break;
                case "wav":
                    isSupported = audio.canPlayType("audio/wav").replace("no", "");
                    break;
                case "aac":
                    isSupported = audio.canPlayType("audio/aac").replace("no", "");
                    break;
                case "ogg":
                    isSupported = audio.canPlayType("audio/ogg").replace("no", "");
                    break;
                case "caf":
                    isSupported = audio.canPlayType("audio/x-caf").replace("no", "");
                    break;
            }

            if (!isSupported) throw "The browser does not support the audio codec " + e.c;
        }
    },

    _request: function (e) {
        const requestData = this._buildRequest(e);
        const xhr = this._getXHR();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.responseText.startsWith("ERROR")) throw xhr.responseText;

                audioElement.src = xhr.responseText;
                audioElement.play();
            }
        };

        xhr.open("POST", "https://api.voicerss.org/", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.send(requestData);
    },

    _buildRequest: function (e) {
        const codec = e.c && e.c.toLowerCase() !== "auto" ? e.c : this._detectCodec();

        return (
            "key=" + (e.key || "") +
            "&src=" + (e.src || "") +
            "&hl=" + (e.hl || "") +
            "&r=" + (e.r || "") +
            "&c=" + (codec || "") +
            "&f=" + (e.f || "") +
            "&ssml=" + (e.ssml || "") +
            "&b64=true"
        );
    },

    _detectCodec: function () {
        const audio = new Audio();

        if (audio.canPlayType("audio/mpeg").replace("no", "")) return "mp3";
        if (audio.canPlayType("audio/wav").replace("no", "")) return "wav";
        if (audio.canPlayType("audio/aac").replace("no", "")) return "aac";
        if (audio.canPlayType("audio/ogg").replace("no", "")) return "ogg";
        if (audio.canPlayType("audio/x-caf").replace("no", "")) return "caf";

        return "";
    },

    _getXHR: function () {
        try { return new XMLHttpRequest(); } catch (e) {}
        try { return new ActiveXObject("Msxml3.XMLHTTP"); } catch (e) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (e) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (e) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
        try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}

        throw "The browser does not support HTTP request";
    }
};
