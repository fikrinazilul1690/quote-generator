const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
	loader.hidden = true;
	quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
	loading();
	// Pick a random quote from apiQuotes array
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	const authorContent = quote.author !== null ? quote.author : 'Unknown';
	const quoteStyle = quote.text.length > 50 ? 'long-quote' : '';
	console.log(quoteStyle);
	quoteText.className = quoteStyle;
	authorText.textContent = authorContent;
	// Set Quote, Hide Loader
	quoteText.textContent = quote.text;
	complete();
}

// Ger Quotes From API
async function getQuotes() {
	loading();
	const apiUrl = 'https://type.fit/api/quotes';
	try {
		const request = new Request(apiUrl);
		const response = await fetch(request);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
		// Catch Error Here
	}
}

// Tweet Quote
function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

// On Load
getQuotes();
