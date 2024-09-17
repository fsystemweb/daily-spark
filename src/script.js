import quotes from './quotes.json';

const getDayOfYear = (date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / (1000 * 60 * 60 * 24));
}

const getPhraseIndexForToday = (date) => {
  let dayOfYear = getDayOfYear(date) - 1;
  dayOfYear = Math.max(0, Math.min(365, dayOfYear));

  const maxNumber = quotes.length;


  if(dayOfYear <= quotes.length){
    return dayOfYear;
  }

  const index = dayOfYear % quotes.length;
  return index - 1;
};

document.addEventListener('DOMContentLoaded', () => {
  const phraseContainer = document.getElementById('phraseContainer');
  const phraseText = document.getElementById('phraseText');
  const phraseAuthor = document.getElementById('phraseAuthor');
  const generateButton = document.getElementById('generateButton');
  const shareButton = document.getElementById('shareButton');
  const title = document.getElementById('title');

  phraseContainer.classList.remove('show');

  const displayPhrase = () => {
    generateButton.hidden = true;
    title.hidden = true;
    const index = getPhraseIndexForToday(new Date());
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

export {getDayOfYear, getPhraseIndexForToday}
