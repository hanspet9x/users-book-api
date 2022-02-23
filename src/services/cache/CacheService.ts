import {CacheKeys} from './cacheKeys.enum';
import Cache from 'node-cache';

export default class CacheService {
  private static cache: Cache;
  static init(stdTTL: number) {
    if (!CacheService.cache) {
      return CacheService.cache = new Cache({
        stdTTL,
      });
    }
    return CacheService.cache;
  }

  static get<T>(key: CacheKeys, defaultValue = null) {
    return (CacheService.cache.get(key) || defaultValue) as T;
  }

  static set<T>(key: CacheKeys, value: T) {
    CacheService.cache.set(key, value);
  }

  static getCache() {
    return CacheService.cache;
  }
  // get genre, select genre, see all books, pick a book
  // return the cart url
}

