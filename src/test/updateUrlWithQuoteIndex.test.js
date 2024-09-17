import { updateUrlWithQuoteIndex } from '../script.js';

global.navigator.share = jest.fn();

describe('URL Update with Quote Index', () => {

  it('should update the URL with the quote index when updateUrlWithQuoteIndex is called', () => {
    const mockIndex = 5;
    
    updateUrlWithQuoteIndex(mockIndex);

    const url = new URL(window.location.href).searchParams;

    expect(url.get('quote')).toBe(String(mockIndex));
  });

  it('should set the share data with the updated URL including the quote index', () => {
    const mockIndex = 10;

    updateUrlWithQuoteIndex(mockIndex);

    const shareData = {
      title: 'Daily Motivation',
      text: 'Sample quote text\n— Sample Author',
      url: window.location.href
    };

    navigator.share(shareData);

    expect(navigator.share).toHaveBeenCalledWith({
      title: 'Daily Motivation',
      text: 'Sample quote text\n— Sample Author',
      url: `http://localhost/?quote=${mockIndex}`
    });
  });
});
