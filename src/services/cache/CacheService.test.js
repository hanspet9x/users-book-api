const {default: CacheService} = require('./CacheService');

describe('Cache Service', () => {
  beforeAll(()=> {
    CacheService.init(100);
  });

  test('getting item not cached returns null', () => {
    expect(CacheService.get('BOOK_URL')).toBeNull();
  });

  test('getting cached book Item not returns cached value', () => {
    const bookURL = 'https://book.com';
    CacheService.set('BOOK_URL', bookURL);
    expect(CacheService.get('BOOK_URL')).toBe(bookURL);
  });
});
