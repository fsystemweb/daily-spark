import quotes from './quotes.json';

const getDayOfYear = (date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / (1000 * 60 * 60 * 24));
};

const getPhraseIndexForToday = (date) => {
  let dayOfYear = getDayOfYear(date) - 1;
  dayOfYear = Math.max(0, Math.min(365, dayOfYear));

  const maxNumber = quotes.length;

  if (dayOfYear <= maxNumber) {
    return dayOfYear;
  }

  const index = dayOfYear % maxNumber;
  return index - 1;
};

// Parse the quote index from the query parameter
const getQuoteFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const quoteIndex = parseInt(params.get('quote'), 10);

  if (!isNaN(quoteIndex) && quoteIndex >= 0 && quoteIndex < quotes.length) {
    return quoteIndex;
  }

  return null; // Return null if no valid index is found
};

// Update the URL with the given quote index
const updateUrlWithQuoteIndex = (index) => {
  const url = new URL(window.location);
  url.searchParams.set('quote', index);
  history.replaceState(null, '', url);
};

document.addEventListener('DOMContentLoaded', () => {
  const phraseContainer = document.getElementById('phraseContainer');
  const phraseText = document.getElementById('phraseText');
  const phraseAuthor = document.getElementById('phraseAuthor');
  const generateButton = document.getElementById('generateButton');
  const shareButton = document.getElementById('shareButton');
  const title = document.getElementById('title');

  phraseContainer.classList.remove('show');

  const displayPhrase = (index = null) => {
    generateButton.hidden = true;
    title.hidden = true;

    // Use the provided index if available, otherwise use today's index
    index = index !== null ? index : getPhraseIndexForToday(new Date());

    const phrase = quotes[index];

    if (phrase) {
      const { text, author } = phrase;
      phraseText.textContent = text;
      phraseAuthor.textContent = `— ${author}`;
      phraseContainer.classList.add('show');
      setTimeout(() => {
        phraseContainer.classList.add('delayed');
        shareButton.classList.add('delayed');
        shareButton.classList.remove('hidden');
      }, 500);

      // Update the URL with the current quote index
      updateUrlWithQuoteIndex(index);
    } else {
      console.error('Phrase is undefined');
    }
  };

  // Check if the URL contains a valid quote index
  const urlQuoteIndex = getQuoteFromUrl();
  if (urlQuoteIndex !== null) {
    displayPhrase(urlQuoteIndex);
  }

  generateButton.addEventListener('click', () => displayPhrase());

  shareButton.addEventListener('click', () => {
    const shareData = {
      title: 'Daily Motivation',
      text: `${phraseText.textContent}\n— ${phraseAuthor.textContent}`,
      url: window.location.href
    };
    navigator.share ? navigator.share(shareData) : alert('Sharing not supported');
  });
});

export { getDayOfYear, getPhraseIndexForToday, updateUrlWithQuoteIndex };
