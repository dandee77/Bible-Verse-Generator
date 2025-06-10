const verseContainer = document.getElementById('verse-container');
const verseText = document.getElementById('verse');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newVerseButton = document.getElementById('new-verse');
const loader = document.getElementById('loader');

let apiData = {verse: "", author: ""};

function loading() {
    loader.hidden = false; 
    verseContainer.hidden = true;
}

function complete() {
    loader.hidden = true; 
    verseContainer.hidden = false;
}

function populateVerse() {
    loading();
    authorText.textContent = apiData.author;
    verseText.textContent = apiData.verse;
    verseContainer.classList.remove('fade-in');
    void verseText.offsetWidth;
    verseContainer.classList.add('fade-in');
    complete();
}

// fetch data from the Labs.Bible.org
async function getData() {
    loading();
    const apiUrl = 'https://labs.bible.org/api/?passage=random&type=json';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const v = data[0].text;
        const a = `${data[0].bookname} ${data[0].chapter}:${data[0].verse}`;
        apiData = {author: a, verse: v};
        populateVerse();  
    } catch (error) {
        console.error("Failed to fetch Bible verse:", error);
        authorText.textContent = "Admin";
        verseText.textContent = "Oops! Couldn't load a verse.";
        complete();
    }
}

// tweet verse
function tweetVerse() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${apiData.verse} - ${apiData.author}`;
    window.open(twitterUrl, '_blank');
}

// event listeners
newVerseButton.addEventListener('click', getData);
twitterButton.addEventListener('click', tweetVerse);

// this starts on load
getData();
