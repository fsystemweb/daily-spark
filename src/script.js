import quotes from './quotes.json'; // Import the JSON file

document.addEventListener('DOMContentLoaded', () => {
    const phraseContainer = document.getElementById('phraseContainer');
    const phraseText = document.getElementById('phraseText');
    const phraseAuthor = document.getElementById('phraseAuthor');
    const generateButton = document.getElementById('generateButton');
    const shareButton = document.getElementById('shareButton');

    // Hide the phrase container initially
    phraseContainer.classList.remove('show');
    shareButton.classList.add('hidden');

    const getPhraseIndexForToday = () => {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        const dateNumber = parseInt(today.replace(/-/g, ''), 10); // Convert date to integer
        return dateNumber % quotes.length; // Generate index based on date
    };

    const displayPhrase = () => {
        generateButton.hidden = true;
        const index = getPhraseIndexForToday();
        const phrase = quotes[index];

        if (phrase) {
            const { text, author } = phrase;
            phraseText.textContent = text;
            phraseAuthor.textContent = `— ${author}`;

            phraseContainer.classList.add('show');
            shareButton.classList.remove('hidden');
        } else {
            console.error('Phrase is undefined');
        }
    };

    generateButton.addEventListener('click', () => {
        displayPhrase();
    });

    shareButton.addEventListener('click', () => {
        const shareData = {
            title: 'Daily Motivation',
            text: `${phraseText.textContent}\n— ${phraseAuthor.textContent}`,
            url: window.location.href
        };

        navigator.share ? navigator.share(shareData) : alert('Sharing not supported');
    });
});
