# LRU Cache TS
This library is inspired from [node-lru-cache](https://github.com/isaacs/node-lru-cache) and is completely written in Typescript with test coverage.

## Installation:
npm:
```
npm install lru-cache-ts
```
OR

yarn:
```
yarn add lru-cache-ts
```

## Usage:
```typescript
import { LRUCache } from 'lru-cache-ts'

type CacheType = any // set this to a fixed type for type-checking
const cache = LRUCache<CacheType>({ max: 100 })

// key needs to be string, value to be same as cache type defined while creating the object
cache.set('key', 'value')
expect(cache.get('key')).toBe('value')
```

## Options:
* `max`: The maximum size of the cache. Setting it to a non-whole number will throw a TypeError. (Default: `Infinity`)

## API:
* `set(key: string, value: CacheType)`

* `get(key: string) => CacheType`

  Both of these will update the "recently used"-ness of the key. If the key is not found, `get()` will return `undefined`. `key` has to be of type `string`.

* `peek(key: string) => CacheType`

  Returns the key value (or `undefined` if not found) without updating the "recently used"-ness of the key.  

* `del(key: string)`

  Deletes a key out of the cache.

* `reset()`

  Clear the cache entirely, throwing away all values.

* `has(key: string) => boolean`

  Check if a key is in the cache, without updating the recent-ness

* `forEach(function (value: CacheType, key: string))`

  Iterates over all the keys in the cache, in order of recent-ness. (i.e., more recently used items are iterated over first.)

* `rforEach(function (value: CacheType, key: string))`

  The same as `cache.forEach(...)` but items are iterated over in reverse order. (i.e., less recently used items are iterated over first.)

* `length`

  Return total length of objects in cache.

* `dump() => Array<LRUDumpObject>`

  Return an array of the cache entries ready for serialization and usage with `destinationCache.load(arr)`.

* `load(cacheEntriesArray: Array<LRUDumpObject>)`

  Loads another cache entries array, obtained with `sourceCache.dump()`, into the cache. The destination cache is reset before loading new entries