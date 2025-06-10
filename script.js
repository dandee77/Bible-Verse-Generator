let apiData = {verse: "", author: ""};

// fetch data from the Labs.Bible.org
async function getData() {
    const apiUrl = 'https://labs.bible.org/api/?passage=random&type=json';
    try {
       const response = await fetch(apiUrl);
       const data = await response.json();
       const v = data[0].text;
       const a = `${data[0].bookname} ${data[0].chapter}:${data[0].verse}`;
       apiData = {author: a, verse: v};
       console.log(apiData);     
    } catch (error) {
        alert(error);
    }
}


// this starts on load
getData();