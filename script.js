const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

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
async function newQuote() {
	loading();
	// Pick a random quote from apiQuotes array
	const apiQuotes = await getApiQuotes();
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	const authorContent = quote.author !== null ? quote.author : 'Unknown';
	const quoteStyle = quote.text.length > 50 ? 'long-quote' : '';
	quoteText.className = quoteStyle;
	authorText.textContent = authorContent;
	// Set Quote, Hide Loader
	quoteText.textContent = quote.text;
	complete();
}

// Get Quotes From API
function getQuotes() {
	loading();
	const apiUrl = 'https://type.fit/api/quotes';
	const request = new Request(apiUrl);
	const response = fetch(request);
	// return (apiQuotes = response.json());
	return response.then((response) => response.json());
}

// Get Data
async function getApiQuotes() {
	try {
		const data = await getQuotes();
		return data;
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
newQuote();
