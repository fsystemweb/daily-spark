import quotes from './quotes.json';

document.addEventListener('DOMContentLoaded', () => {
  const phraseContainer = document.getElementById('phraseContainer');
  const phraseText = document.getElementById('phraseText');
  const phraseAuthor = document.getElementById('phraseAuthor');
  const generateButton = document.getElementById('generateButton');
  const shareButton = document.getElementById('shareButton');
  const title = document.getElementById('title');

  phraseContainer.classList.remove('show');

  function getDayOfYear() {
    const date = new Date();
    return Math.floor(date.getTime() / 86400000);
  }

  const getPhraseIndexForToday = () => {
    let dayOfYear = getDayOfYear() - 1;
    dayOfYear = Math.max(1, Math.min(366, dayOfYear));
    const index = (dayOfYear - 1) % quotes.length + 1;
    return index;
  };

  const displayPhrase = () => {
    generateButton.hidden = true;
    title.hidden = true;
    const index = getPhraseIndexForToday();
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
    } else {
      console.error('Phrase is undefined');
    }
  };

  generateButton.addEventListener('click', displayPhrase);

  shareButton.addEventListener('click', () => {
    const shareData = {
      title: 'Daily Motivation',
      text: `${phraseText.textContent}\n— ${phraseAuthor.textContent}`,
      url: window.location.href
    };
    navigator.share ? navigator.share(shareData) : alert('Sharing not supported');
  });
});
