const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// function test() {
//     VoiceRSS.speech({
//         key: 'api',
//         src: 'Hello, this is a test of the VoiceRSS API.',
//         hl: 'en-us',
//         r: 0,
//         c: 'mp3',
//         f: '44khz_16bit_stereo',
//         ssml: false
//     });
//     console.log("Test completed successfully.");
// }

// test();

async function fetchJoke() {
    const apiUrl = 'https://v2.jokeapi.dev/joke/Dark?type=twopart';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup && data.delivery) {
            const joke = `${data.setup} ... ${data.delivery}`;
            console.log(joke);
            VoiceRSS.speech({
                key: 'api',
                src: joke,
                hl: 'en-us',
                r: 0,
                c: 'mp3',
                f: '44khz_16bit_stereo',
                ssml: false
            });
        } else {
            console.error('Joke format is not as expected:', data);
        }
    } catch (error) {
        console.error('Error fetching joke:', error);
    }
}

fetchJoke();