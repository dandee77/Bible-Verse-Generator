const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function test() {
    VoiceRSS.speech({
        key: 'api_key',
        src: 'Hello, this is a test of the VoiceRSS API.',
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
    console.log("Test completed successfully.");
}

test();