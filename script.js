const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

 

let apiQuotes = [];

//loader

function loading()
{
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading

function complete()
{
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//show new quote

function newQuote()
{
    loading();
    //pick a random quotes from apiquotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author)
    {
        authorText.textContent = 'Unknown';
    }
    else{
        authorText.textContent = quote.author;
    }
    //check the quote length to determine the styling
    if(quote.text.length >100)
    {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}

// get quotes from API
async function getQuotes()
{
    loading();

    const apiURL = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
       //catch error here 
    }
}


//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
} 

// Event Listeners
newQuoteBtn.addEventListener('click' , newQuote);
twitterBtn.addEventListener('click' , tweetQuote);


// on load

getQuotes();

